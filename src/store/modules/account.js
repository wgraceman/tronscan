import { tronClient } from "../../api/tronClient";
import {privateKeyToAddress} from "@tronprotocol/wallet-api/src/utils/crypto";
import axios from "axios";

// initial state
const state = {
  loginStatus: (() => {
    const priKey = localStorage.getItem('account') || sessionStorage.getItem('account');
    if (priKey) {
      return true;
    } else {
      return false;
    }
  })(),
  accountList: [],
  tokenBalances: [],
  frozenBalances: [],
  priKey: localStorage.getItem('account') || sessionStorage.getItem('account'),
  addr: (() => {
    const priKey = localStorage.getItem('account') || sessionStorage.getItem('account');
    if(priKey){
      return privateKeyToAddress(priKey);
    }else{
      return null;
    }
  })(),
  votes: 0
}

// getters
const getters = {
  tokenBalances: state => state.tokenBalances,
  frozenBalances: state => state.frozenBalances,
  loginStatus: state => state.loginStatus,
  accountList: state => state.accountList,
  addr: state => state.addr,
  priKey: state => state.priKey,
  votes: state => state.votes
}

// actions
const actions = {
  async accountList({ commit }) {
    let balances = await tronClient.getAccountList();
    commit('accountList', balances)
  },
  setAccount({commit}, account){
    commit('setPriKey', account.password)
    commit('setAddr', account.address)
    commit('setLoginStatus', true)
  },
  loginAccount({dispatch}, param){
    localStorage.removeItem('account')
    sessionStorage.removeItem('account')
    const account = {
      password: param.pass,
      address: privateKeyToAddress(param.pass)
    }
    if(param.remember){
      localStorage.setItem('account', account.password)
    }else{
      sessionStorage.setItem('account', account.password)
    }
    dispatch('setAccount', account)
    dispatch('refreshTokenBalances')
  },
  logoutAccount({commit}){
    localStorage.removeItem('account')
    sessionStorage.removeItem('account')
    commit('setPriKey', "")
    commit('setAddr', "")
    commit('setLoginStatus', false)
  },
  async refreshTokenBalances({commit, state}){
    commit('setTokenBalances', [])
    commit('setFrozenBalances', [])
    // const res = await tronClient.getAccountBalances(state.addr);
    const res = await axios.get (`https://api.tronscan.org/api/account/${state.addr}`);

    let balances = res.data.balances
    let frozenBalances = res.data.frozen.balances
    let votes = balances.find(e => e.name === 'TRX').balance
    commit('setVotes', votes)
    commit('setTokenBalances', balances)
    commit('setFrozenBalances', frozenBalances)
  },
  async requestTestToken({commit, state, dispatch}){
    await axios.post("https://tronscan.org/request-coins", {
      address: state.addr
    });
    await dispatch('refreshTokenBalances')
    return Promise.resolve()
    // let balances = res.balances
    // let votes = balances.find(e => e.name === 'TRX').balance
    // commit('setVotes', votes)
    // commit('setTokenBalances', balances)
  },
}

// mutations
const mutations = {
  accountList(state, accountList) {
    state.accountList = accountList
  },
  setPriKey(state, priKey){
    state.priKey = priKey
  },
  setAddr(state, addr){
    state.addr = addr
  },
  setLoginStatus(state, status){
    state.loginStatus = status
  },
  setTokenBalances(state, balances){
    state.tokenBalances = balances
  },
  setFrozenBalances(state, balances){
    state.frozenBalances = balances
  },
  setVotes(state, votes){
    state.votes = Number(votes)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

import {tronClient} from "../../api/tronClient";
import axios from 'axios'
export const SET_BLOCK_INFORMATION = 'SET_BLOCK_INFORMATION';


const state = {
  transactions: {
    total: 0
  },
  numberOfTransactions: 0,
  lastBlock: {},
  blocks: {
    total: 0
  },
  currentBlock: {},
  blockTrans: [],
  blockTransf: [],
  accounts: {
    total: 0
  },

  currentTrans: {},

  currentAddr: {
    base: {
      balances: [],
    },
    stats: {},
    transfer: {},
    transaction: {}
  },
}

const getters = {
  allTransactions: state => state.transactions,
  numberOfTransactions: state => state.numberOfTransactions,
  allBlocks: state => state.blocks,
  currentBlock: state => state.currentBlock,
  lastBlock: state => state.lastBlock,
  blockInformation: state => state.blockInformation,
  blockTrans: state => state.blockTrans,
  blockTransf: state => state.blockTransf,
  allAccounts: state => state.accounts,
  currentTrans: state => state.currentTrans,
  currentAddr: state => state.currentAddr,
}

const actions = {
  async getAllTransactions({ commit, state }, query) {    
    commit('setTransactions', {total: state.transactions.total})
    let params = jQuery.param(query);
    let res = await axios.get(`https://api.tronscan.org/api/transaction?${params}`)
    let trans = res.data
    commit('setTransactions', trans)
    // commit('setNumberOfTransactions', trans.total)
  },
  async getLastBlock({commit}){
    let res = await axios.get(`https://api.tronscan.org/api/block?sort=-number&limit=1`)
    let lastBlock = res.data.data[0]
    commit("setLastBlock",lastBlock)
  },
  async getBlocks ({commit, state}, query) {
    commit ('setBlocks', {total: state.blocks.total})
    let blocks = await tronClient.getBlocks (query);
    commit ('setBlocks', blocks)
  },
  async getTotalNumberOfTransactions ({commit}) {
    let numberOfTransactions = await tronClient.getTotalNumberOfTransactions ();

    commit ('setNumberOfTransactions', numberOfTransactions)
  },
  async getBlockByNumber ({commit, state}, param) {
    commit ('setCurrentBlock', {total: state.blocks.total})
    commit ('setCurrentBlockTrans', [])
    commit ('setCurrentBlockTransf', [])
    let res = await axios.get(`https://api.tronscan.org/api/block?sort=-number&limit=1&number=${param}`)
    let block = res.data.data[0]
    let transRes = await axios.get(`https://api.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=25&start=0&block=${param}`)
    let trans = transRes.data.data
    let transfRes = await axios.get(`https://api.tronscan.org/api/transfer?sort=-timestamp&count=true&limit=25&start=0&block=${param}`)
    let transf = transfRes.data.data
    commit ('setCurrentBlock', block)
    commit ('setCurrentBlockTrans', trans)
    commit ('setCurrentBlockTransf', transf)
  },
  async getTransactionByHash ({commit, state}, param) {
    commit ('setCurrentTrans', {})
    let res = await axios.get(`https://api.tronscan.org/api/transaction/${param}`)
    commit ('setCurrentTrans', res.data)
  },
  async getAddressByHash ({commit, state}, param) {
    commit ('setCurrentAddr', {
      // base: {
      //   balances: [],
      //   address: "",
      // },
      // stats: {},
      // transfer: {},
      // transaction: {}
    })
    let res1 = await axios.get(`https://api.tronscan.org/api/account/${param}`)
    let res2 = await axios.get(`https://api.tronscan.org/api/account/${param}/stats`)
    let res3 = await axios.get(`https://api.tronscan.org/api/transfer?sort=-timestamp&count=true&limit=25&start=0&address=${param}`)
    let res4 = await axios.get(`https://api.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=25&start=0&address=${param}`)
    let currentAddr = {
      base: res1.data,
      stats: res2.data,
      transfer: res3.data,
      transaction: res4.data
    }
    commit ('setCurrentAddr', currentAddr)
  },
  /*
  * get block If
  * @type {Object}
  * */
  blockInformation ({commit}, blockInformation) {
    commit (SET_BLOCK_INFORMATION, blockInformation)
  },
  async getAllAccounts({commit, state}, query){
    commit('setAccounts', {total: state.accounts.total})
    let params = jQuery.param(query);
    let res = await axios.get(`https://api.tronscan.org/api/account?${params}`)
    let accounts = res.data
    commit ('setAccounts', accounts)
  }
};

const mutations = {
  setBlocks (state, blocks) {
    state.blocks = blocks
  },
  setTransactions (state, txs) {
    state.transactions = txs
  },
  setNumberOfTransactions (state, numberOfTransactions) {
    state.numberOfTransactions = numberOfTransactions
  },
  setCurrentBlock (state, block) {
    state.currentBlock = block
  },
  setCurrentBlockTrans(stats, trans) {
    state.blockTrans = trans
  },
  setCurrentBlockTransf(stats, transf) {
    state.blockTransf = transf
  },
  setLastBlock(state, block) {
    state.lastBlock = block
  },
  setCurrentTrans(state, trans) {
    state.currentTrans = trans
  },
  setCurrentAddr(state, addr) {
    state.currentAddr = addr
  },
  /*
  * get block If
  * @param {Object}
  * */
  [SET_BLOCK_INFORMATION] (state, blockInformation) {
    state.blockInformation = blockInformation    
  },
  setAccounts (state, accounts){
    state.accounts = accounts
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

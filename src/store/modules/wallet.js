import {tronClient} from "../../api/tronClient";
import {generateAccount} from "@tronprotocol/wallet-api/src/utils/account";
import {buildFreezeBalance, buildUnfreezeBalance} from "@tronprotocol/wallet-api/src/utils/transaction";
import axios from 'axios'

const state = {
  userData: {},
  canFreeze: null,
  canunFreeze: {},
  userDataBalance: {}
}
const ONE_TRX = 1000000;

const actions = {
  async freeze ({commit}, param) {

    let transaction = buildFreezeBalance (param.addr, parseInt (param.amount) * parseInt (ONE_TRX), 3);
    let trxnumber = await tronClient.signTransaction (param.key, transaction);
    let userData = await axios.get (`https://api.tronscan.org/api/account/${param.addr}`);

    commit ('userData', userData);
    commit ('canFreeze', trxnumber);
  },
  async balance ({commit}, param) {
    let userDataBalance = await axios.get (`https://api.tronscan.org/api/account/${param.addr}`);

    commit ('userDataBalance', userDataBalance.data);
  },
  async unfreeze ({commit}, param) {
    commit ('canunFreeze', '');

    let transaction = buildUnfreezeBalance (param.addr);
    let success = await tronClient.signTransaction (param.key, transaction);

    commit ('canunFreeze', success);
  }
}

const mutations = {
  userData (state, userData) {
    state.userData = userData
  },
  canFreeze (state, canFreeze) {
    state.canFreeze = canFreeze
  },
  canunFreeze (state, canunFreeze) {
    state.canunFreeze = canunFreeze
  },
  userDataBalance (state, userDataBalance) {
    state.userDataBalance = userDataBalance
  },
}

const getters = {}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

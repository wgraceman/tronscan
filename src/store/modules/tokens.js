import {tronClient} from "../../api/tronClient";
import axios from "axios";
const state = {
  tokens: []
}

const getters = {
  allTokens: state => state.tokens
}

const actions = {
  async getAllTokens ({ commit }, query) {
    let params = jQuery.param(query);
    let res = await axios.get(`https://api.tronscan.org/api/token?${params}`)    
    commit('setTokens', res.data)
  }
}

const mutations = {
  setTokens (state, tokens) {
    state.tokens = tokens
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import {tronClient} from "../../api/tronClient";
import axios from "axios";

const state = {
  witnesses: [],
  nodes: []
}

const getters = {
  allWitnesses: state => state.witnesses,
  allNodes: state => state.nodes
}

const actions = {
  async getAllWitnesses ({ commit }) {
    commit('setWitnesses', [])
    let res = await axios.get('https://api.tronscan.org/api/witness')   
    let witnesses = res.data;

    commit('setWitnesses', witnesses)
  },
  async getAllNodes ({ commit }) {
    let res = await axios.get('https://api.tronscan.org/api/node')    
    commit('setNodes', res.data.nodes)
  }
}

const mutations = {
  setWitnesses (state, witnesses) {
    state.witnesses = witnesses
  },
  setNodes (state, nodes) {
    state.nodes = nodes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

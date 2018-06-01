import {tronClient} from "../../api/tronClient";
import {filter} from "lodash";
import axios from 'axios'

const state = {
  witnessesData: {},
}

const actions = {
  async voteForWitnesses  ({commit}, param) {
    let witnessVotes = Object.keys(param).map(address => ({
      address,
      amount: parseInt(param[address], 10),
    }));

    witnessVotes = filter(witnessVotes, vote => vote.amount > 0);

    let witnessesData = await tronClient.voteForWitnesses(param.key, witnessVotes);
    let votesNumber = await axios.get (`https://api.tronscan.org/api/account/${param.addr}/votes`);

    console.log(votesNumber)

    commit('witnessesData', witnessesData);
  }
}

const mutations = {
  witnessesData (state, witnessesData) {
    state.witnessesData = witnessesData
  }
}

const getters = {
  witnessesData: state => state.witnessesData
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import { tronClient } from "../../api/tronClient";
import axios from 'axios'

export const SET_PAGE_ROUTER = 'SET_PAGE_ROUTER';
export const SET_LOGIN = 'SET_LOGIN';

// initial state
const state = {
  login: true,
  language: 'en',
  accounts: [],
  password: '',
  price: 0,
  percentage: 0,
  pageRouter: '',
  availableLanguages: {
    // nl: "Nederlands",
    en: "English",
    zh: "简体中文",
    // fa:"فارسی",
    // ko:"한국어",
    // br: "Português Brasil",
    // fr: "Français",
    // es: "Español" ,
  },
}

// getters
const getters = {
  currentLanguange: state => state.language,
  allAccounts: state => state.accounts,
  password: state => state.password,
  price: state => state.price,
  percentage: state => state.percentage,
  pageRouter: state => state.pageRouter,
  login: state => state.login
}

// actions
const actions = {
  async loadAccounts ({ commit }) {
    let accounts = await Client.getAccountList();
    commit('setAccounts', accounts)
  },
  async loadPrice ({commit}) {
    let {data} = await axios.get(`https://api.coinmarketcap.com/v1/ticker/tronix/`);
    commit('setPrice', {
      price: data[0].price_usd,
      percentage: data[0].percent_change_24h
    })
  },
  pageRouter ({commit}, pageRouter) {
    commit (SET_PAGE_ROUTER, pageRouter)
  },
  login ({commit}, login) {
    commit (SET_LOGIN, login)
  }
}

// mutations
const mutations = {
  setAccounts (state, accounts) {
    state.accounts = accounts
  },
  setPrice (state, { price, percentage }) {
    state.price = parseFloat(price)
    state.percentage = parseFloat(percentage)
  },
  setLanguage(state, language){
    state.language = language
  },
  [SET_PAGE_ROUTER] (state, pageRouter) {
    state.pageRouter = pageRouter
  },
  [SET_LOGIN] (state, login) {
    state.login = login
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

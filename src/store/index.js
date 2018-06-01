import Vue from 'vue'
import Vuex from 'vuex'

import account from './modules/account'
import app from './modules/app'
import blockchain from './modules/blockchain'
import network from './modules/network'
import tokens from './modules/tokens'
import tronBrief from './modules/tronBrief'
import wallet from './modules/wallet'
import delegates from './modules/delegates'

import createLogger from '../plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    account,
    app,
    blockchain,
    network,
    tokens,
    tronBrief,
    wallet,
    delegates
  },
  strict: debug,
  plugins: []
})

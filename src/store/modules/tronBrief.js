import axios from "axios";

// initial state
const state = {
  "id": "",
  "name": "",
  "symbol": "",
  "rank": "",
  "price_usd": "",
  "price_btc": "",
  "24h_volume_usd": "",
  "market_cap_usd": "",
  "available_supply": "",
  "total_supply": "",
  "max_supply": null,
  "percent_change_1h": "",
  "percent_change_24h": "",
  "percent_change_7d": "",
  "last_updated": ""
}

// getters
const getters = {
  marketCapUsd: state => state.market_cap_usd,
  priceUsd: state => state.price_usd,
  priceBtc: state => state.price_btc,
  rank: state => state.rank,
  percentChange: state => state.percent_change_24h
}

// actions
const actions = {
  async getTronBrief({ commit }) {
    let res = await axios.get('https://api.coinmarketcap.com/v1/ticker/tron/')
    let brief = res.data[0]
    commit('setTronMarketCap', brief.market_cap_usd)
    commit('setRank', brief.rank)
    commit('setPriceUsd', brief.price_usd)
    commit('setPriceBtc', brief.price_btc)
    commit('setPercentChange', brief.percent_change_24h)
  }
}

// mutations
const mutations = {
  setTronMarketCap(state, market_cap_usd){
    let mcu = parseFloat(market_cap_usd, 10) 
    mcu = (mcu / 1000000000).toFixed(3) //Billion
    state.market_cap_usd = mcu
  },
  setRank(state, rank){
    state.rank = rank
  },
  setPriceUsd(state, price_usd){
    let pu = parseFloat(price_usd, 10)
    pu = pu.toFixed(5)
    state.price_usd = pu
  },
  setPriceBtc(state, price_btc){
    let pb = parseFloat(price_btc, 10)
    pb = pb.toFixed(9)
    state.price_btc = pb
  },
  setPercentChange(state, percent_change_24h){
    let pc24 = percent_change_24h;
    pc24 = pc24 < 0 ? percent_change_24h: "+" + percent_change_24h
    state.percent_change_24h = pc24
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
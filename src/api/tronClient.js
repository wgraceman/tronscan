import TronClientHttp from "./tronClienthttp";
import axios from 'axios'

export const tronClient = new TronClientHttp({
  url: `https://api.tronscan.org/api`
})


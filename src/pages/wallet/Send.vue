<template>
  <div class="col-md-9">

    <form id="form1" class="sky-form">

      <div class="margin-bottom-10 ">
        <div class="tab-v1">
          <ul class="nav nav-justified nav-tabs">
            <li class="active">
              <a>{{$t('wallet.send.title')}}</a>
            </li>
          </ul>
          <div id="profile" class="profile-edit ">
            <!-- <h2 class="heading-md">
              Manage your Account Settings</h2> -->
            <br>
            <dl class="dl-horizontal">
              <dt>{{$t('wallet.send.recvAddr')}}</dt>
              <dd>
                <section>
                  <label class="input">
                    <!-- <i class="icon-append fa fa-envelope"></i> -->
                    <input class="form-control" v-model="recevierAddr">
                  </label>
                </section>
              </dd>
              <dt>{{$t('wallet.send.type')}}</dt>
              <dd>
                <section>
                  <label class="select">
                    <!-- <i class="icon-append fa fa-lock"></i> -->
                    <select v-model="token">
                      <option disabled value="">{{$t('wallet.send.selectMsg')}}</option>

                      <option :value="b.name" v-for="(b,i) in tokenBalances" :key="i">
                        {{`${b.name} (${Number.parseFloat(b.balance).toFixed(2)}avaliable)`}}
                      </option>
                    </select>
                  </label>
                </section>
              </dd>
              <dt>{{$t('wallet.send.amount')}}</dt>
              <dd>
                <section>
                  <label class="input">
                    <!-- <i class="icon-append fa fa-lock"></i> -->
                    <input class="form-control" type="number" v-model="amount" minValue="0">
                  </label>
                </section>
              </dd>
            </dl>
            <br>
            <div class="row">
              <div class="col-md-8">
                <font color="red">
                  {{$t('wallet.send.checkMsg')}}
                </font>
              </div>
              <div class="col-md-4">
                <button class="btn-u pull-right" @click.prevent="send" :disabled="submitDisabled">
                  <i class="fa fa-spin fa-cog" v-if="loading"></i>
                  {{$t('base.submit')}}
                </button>
              </div>
            </div>
            <div class="row" v-if="resMsg !== ''">
              <div class="alert text-center" :class="msgClass">{{resMsg}}</div>
            </div>

          </div>
        </div>
      </div>

    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {isAddressValid} from "@tronprotocol/wallet-api/src/utils/crypto";

export default {
  data() {
    return {
      recevierAddr: "",
      token: "",
      amount: 0,
      loading: false,
      resMsg: ""
    };
  },
  mounted(){
    const rec = this.$route.query.to
    if(typeof rec !== "undefined"){
      this.recevierAddr = rec
    }
    this.refreshTokenBalances()
  },
  computed: {
    ...mapGetters([
      "priKey",
      "addr",
      "tokenBalances"
    ]),
    msgClass() {
      if (this.resMsg === "Thanks for applying!") {
        return {
          "alert-success": true,
          "alert-danger": false
        };
      } else {
        return {
          "alert-success": false,
          "alert-danger": true
        };
      }
    },
    submitDisabled() {
      const valid = isAddressValid(this.recevierAddr) 
                    && this.token !== "" 
                    && this.getSelectedTokenBalance() >= this.amount 
                    && this.amount > 0 
                    && this.recevierAddr !== this.addr;
      return !valid;
    },
  },
  methods: {
    async send() {
      this.loading = true
      await Client.send(this.priKey, this.token, this.recevierAddr, this.amount * 1000000);
      await this.refreshTokenBalances();
      this.loading = false
    },
    getSelectedTokenBalance() {
      if (this.token) {
        let b = this.tokenBalances.find((p) => p.name == this.token).balance
        return parseFloat(b, 10);
      }
    },
    ...mapActions([
      'refreshTokenBalances'
    ])
  }
};
</script>


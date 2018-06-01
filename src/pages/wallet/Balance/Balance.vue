<template>
  <div class="col-md-9">
    <div class="margin-bottom-10 ">
      <div class="tab-v1">
        <ul class="nav nav-justified nav-tabs">
          <li class="active">
            <a>{{$t('wallet.balance.title')}}</a>
          </li>
        </ul>
      </div>
      <div class="table-responsive profile-edit">
        <table class="table table-hover">
          <!--list-header-->
          <thead>
            <tr class="block-list-header">
              <th width="50%">{{$t('wallet.balance.name')}}</th>
              <th>{{$t('wallet.balance.balance')}}</th>
              <!-- <th>Parenthash</th> -->
            </tr>
          </thead>
          <!--list-content-->
          <tbody class="block-list-tbody">
            <!-- <tr v-if="tokenBalances.length === 0">
              <td colspan="2">
                <div class="loading">
                  <div align="center">
                    <img src="/static/loader.gif" alt="Showing">
                    <p>{{$t('base.loading')}}</p>
                  </div>
                </div>
              </td>
            </tr> -->
            <tr v-for="(p,i) in tokenBalances" :key="i">
              <td>{{p.name}}</td>
              <td>{{numberWithCommas(p.balance)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <freeze></freeze>
    <request-test></request-test>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { tronClient } from "@/api/tronClient";
import Freeze from "./Freeze.vue";
import RequestTest from "./RequestTest.vue";
import {numberWithCommas} from "@/utils/helpers";

export default {
  computed: {
    ...mapGetters(["priKey", "tokenBalances"])
  },
  components: {
    Freeze,
    RequestTest
  },
  data() {
    return {
      loading: false,
      freezeAmount: 0,
      alertVisible: false
    };
  },
  async mounted() {
    await this.refreshTokenBalances();
  },
  methods: {
    async handleRequest() {
      this.loading = true;
      await this.requestTestToken();
      this.loading = false;
    },
    numberWithCommas(val) {
      let str = `${numberWithCommas(val)}`
//      str = str.replace(/[?=\.0]/g, "")
      if (str) {
        return str
      }
      else {
        return 0
      }
    },
    ...mapActions(["refreshTokenBalances", "requestTestToken"])
  }
};
</script>


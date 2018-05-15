<template>
  <div class="margin-bottom-10 ">
    <div class="tab-v1">
      <ul class="nav nav-justified nav-tabs">
        <li class="active">
          <a>{{$t('wallet.balance.testnet.title')}}</a>
        </li>
      </ul>
    </div>
    <div class="table-responsive profile-edit">
      <div class="row">
        <p>{{$t('wallet.balance.testnet.msg')}}</p>
        <div class="pull-right">
          <button class="btn-u" :disabled="loading" @click.prevent="handleRequest">
            <i class="fa fa-spin fa-cog" v-if="loading"></i>
            {{$t('wallet.balance.testnet.btn')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async handleRequest() {
      this.loading = true;
      await this.requestTestToken();
      this.loading = false;
    },
    ...mapActions(["requestTestToken"])
  }
};
</script>


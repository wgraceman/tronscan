<template>
  <div class="col-md-9">

    <form class="sky-form">

      <div class="margin-bottom-10 ">
        <div class="tab-v1">
          <ul class="nav nav-justified nav-tabs">
            <li class="active">
              <a>{{$t('wallet.apply.title')}}</a>
            </li>
          </ul>
          <div class="profile-edit">
            <div class="profile-apply">
              <br>
              <p>{{$t('wallet.apply.msg1')}}
              </p>
              <p>
                {{$t('wallet.apply.msg2')}}
              </p>
              <p>
                {{$t('wallet.apply.msg3')}}
              </p>
              <p>
                {{$t('wallet.apply.msg4')}}</p>
              <hr>
              <h5 class="text-center">{{$t('wallet.apply.addrTitle')}}</h5>
              <div class="input margin-bottom-20">
                <input class="form-control" v-model="url">
              </div>
              <br>
              <div class="row">
                <label class="checkbox col-md-10">
                  {{$t('wallet.apply.confirmMsg')}}
                  <input type="checkbox" name="confirmed" class="checkbox" v-model="checked">
                  <i></i>
                </label>
                <button class="btn-u pull-right" :disabled="submitDisabled" @click.prevent="submit">
                  <i class="fa fa-spin fa-cog" v-if="loading"></i>
                  {{$t('base.submit')}}
                </button>
              </div>
              <div class="row" v-if="resMsg !== ''">
                <div class="alert text-center" :class="msgClass">{{resMsg}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { URL_REG } from "@/utils/regex";

import { tronClient } from "../../api/tronClient";

export default {
  data() {
    return {
      url: "https://",
      checked: false,
      loading: false,
      resMsg: ""
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      let key = this.priKey;
      let url = this.url;
      let isValid = await tronClient.applyForDelegate(key, url);
      if (isValid) {
        this.resMsg = "Thanks for applying!";
      } else {
        this.resMsg = "an unknown error occurred";
      }
      this.loading = false;
    }
  },
  computed: {
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
      return !(URL_REG.test(this.url) && this.checked && !this.loading);
    },
    ...mapGetters(["priKey"])
  }
};
</script>


<style>
.profile-apply {
  padding: 0 20px;
}
@media (max-width: 768px) {
  .profile-apply {
    padding: 0;
  }
}
</style>



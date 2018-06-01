<template>
  <div class="container content">
    <div class="row">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="servive-block-light">
          <form id="form1" class="reg-page">
            <div class="reg-header">
              <h2>
                <span aria-hidden="true" class="icon-users"></span> {{$t('register.title')}}</h2>
              <p>
                {{$t('register.loginMsg1')}}
                <router-link to="/login" class="color-green">{{$t('register.loginMsg2')}}</router-link> {{$t('register.loginMsg3')}}
              </p>
            </div>
            <div>
            </div>
            <div id="ContentPlaceHolder1_maindiv">
              <label>
                {{$t('register.addr')}} </label>
              <div class="input-group margin-bottom-20">
                <input readonly class="form-control normal" :value="account.address">
                <span class="input-group-addon pointer" v-clipboard:copy="account.address" @success="handleSuccess(0)" v-tooltip="{
                        content: 'Copy Success',
                        show: tooltip[0],
                        trigger: 'manual',
                        placement: 'bottom',
                      }">
                  <i class="fa fa-copy"></i>
                </span>
              </div>
              <!-- <label>Password </label>
              <div class="input-group margin-bottom-20">
                <input readonly class="form-control normal" :value="account.password">
                <span class="input-group-addon pointer" v-clipboard:copy="account.password" @success="handleSuccess(1)" v-tooltip="{
                        content: 'Copy Success',
                        show: tooltip[1],
                        trigger: 'manual',
                        placement: 'bottom',
                      }">
                  <i class="fa fa-copy"></i>
                </span>
              </div> -->
              <label>{{$t('register.prikey')}} </label>
              <div class="input-group margin-bottom-20">
                <input readonly class="form-control normal" :value="account.privateKey">
                <span class="input-group-addon pointer" v-clipboard:copy="account.privateKey" @success="handleSuccess(1)" v-tooltip="{
                        content: 'Copy Success',
                        show: tooltip[1],
                        trigger: 'manual',
                        placement: 'bottom',
                      }">
                  <i class="fa fa-copy"></i>
                </span>
              </div>
              <br>
              <div align="center">
                <button class="btn-u" @click.prevent="regenerate">{{$t('register.regenerate')}}</button>
              </div>
              <br>
              <div class="row">
                <div class="col-md-12">
                  <label>
                    <span class="AcceptedAgreement"><input type="checkbox" v-model="checked[0]"></span> {{$t('register.check1')}}
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label>
                    <span class="AcceptedAgreement"><input type="checkbox" v-model="checked[1]"></span> {{$t('register.check2')}}
                  </label>
                </div>
              </div>
              <div class="row">
                <!-- <div class="col-md-12">
                  <label>
                    <span class="AcceptedAgreement"><input type="checkbox" v-model="checked[2]"></span> I've written my password on paper
                  </label>
                </div> -->
                <div align="center">
                  <button class="btn-u" :disabled="!submitDisabled" @click.prevent="submit">{{$t('register.submit')}}</button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { generateAccount } from "@tronprotocol/wallet-api/src/utils/account";
import { mapActions } from "vuex";
import Vue from "vue";

export default {
  data() {
    return {
      account: {
        address: "",
        password: "",
        privateKey: ""
      },
      tooltip: [false, false],
      checked: [false, false]
    };
  },
  mounted() {
    this.account = generateAccount();
  },
  methods: {
    handleSuccess(n) {
      this.tooltip = [false, false];
      this.tooltip[n] = true;
      setTimeout(() => {
        Vue.set(this.tooltip, n, false);
      }, 3000);
    },
    regenerate() {
      this.account = generateAccount();
    },
    submit() {
      this.$router.push('/login')
      // this.setAccount(this.account).then(() => {

      // })
    },
    ...mapActions([
      "setAccount",
    ])
  },
  computed:{
    submitDisabled(){
      return this.checked[0] && this.checked[1]
    }
  }
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer !important;
}

.form-control {
  &.normal {
    cursor: default;
  }
}
</style>

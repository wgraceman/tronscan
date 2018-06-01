<template>
  <div>
    <div class="margin-bottom-10 ">
      <div class="tab-v1">
        <ul class="nav nav-justified nav-tabs">
          <li class="active">
            <a>{{$t ('wallet.balance.frozen.title')}}</a>
          </li>
        </ul>
      </div>
      <div class="table-responsive profile-edit">
        <table class="table table-hover">
          <!--list-header-->
          <thead>
          <tr class="block-list-header">
            <th width="50%">{{$t ('wallet.balance.frozen.amount')}}</th>
            <th>{{$t ('wallet.balance.frozen.exp')}}</th>
            <!-- <th>Parenthash</th> -->
          </tr>
          </thead>
          <!--list-content-->
          <tbody class="block-list-tbody">
          <tr v-for="(fb,i) in frozenBalances" :key="i">
            <td>{{numberWithCommas (fb.amount)}}</td>
            <td>{{parseDate (fb.expires)}}</td>
          </tr>
          </tbody>
        </table>
        <br>
        <div class="row">
          <p>{{$t ('wallet.balance.frozen.msg')}}</p>
          <div class="pull-right">
            <button class="btn-u btn-u-default" @click.prevent="showUnfreezeDialog = true">
              {{$t ('wallet.balance.frozen.btnunfreeze')}}
            </button>
            <button class="btn-u " @click.prevent="showDialog = true, freezeAmount = 0">
              <!-- <i class="fa fa-spin fa-cog" v-if="loading"></i> -->
              {{$t ('wallet.balance.frozen.btnfreeze')}}
            </button>
          </div>
          <!-- <div class="pull-right">
            <button class="btn-u " :disabled="loading" @click.prevent="handleRequest">
              <i class="fa fa-spin fa-cog" v-if="loading"></i>
              Freeze</button>
          </div> -->
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="container content dialog" v-if="showDialog">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 ">
            <form class="reg-page sky-form">
              <div class="reg-header">
                <h3 class="text-center">{{$t ('wallet.balance.frozen.freezedialog.title')}}</h3>
              </div>
              <div class="row text-center">
                <h5>{{$t ('wallet.balance.frozen.freezedialog.amount')}}</h5>
                <div class="input margin-bottom-20">
                  <input class="form-control" type="number" v-model="freezeAmount">
                </div>
                <div class="row">
                  <label class="checkbox col-md-10">
                    {{$t ('wallet.balance.frozen.freezedialog.msg1') + `${freezeAmount}` + $t ('wallet.balance.frozen.freezedialog.msg2')}}
                    <input type="checkbox" name="confirmed" class="checkbox" v-model="checked">
                    <i></i>
                  </label>
                </div>

                <br>
                <div class="row">
                  <button class="btn btn-default pull-left" @click.prevent="cancel">{{$t ('base.cancel')}}</button>

                  <button class="btn-u pull-right" :disabled="submitDisabled && !checked" @click.prevent="submit">
                    <i class="fa fa-spin fa-cog" v-if="freezeLoading"></i>
                    {{$t ('base.submit')}}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
    <div class="container content dialog" v-if="showUnfreezeDialog">
      <div class="row">
        <div class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 ">
          <form class="reg-page sky-form">
            <div class="reg-header">
              <h3 class="text-center">{{$t ('wallet.balance.frozen.unfreezedialog.title')}}</h3>
            </div>
            <div class="row text-center">
              <h5 v-show="!nounFreeze">{{$t ('wallet.balance.frozen.unfreezedialog.msg')}}</h5>
              <h5 v-show="nounFreeze">{{$t ('wallet.balance.frozen.unfreezedialog.err')}}</h5>
              <br>
              <div class="row">
                <button class="btn btn-default pull-left"
                        :style="nounFreeze ?`float: none !important`  : ''"
                        @click.prevent="exit">
                  {{$t ('base.cancel')}}
                </button>
                <button class="btn-u pull-right" @click.prevent="release" v-show="!nounFreeze">{{$t ('base.confirm')}}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from "vuex";
  import {numberWithCommas} from "@/utils/helpers";

  export default {
    name: "freeze",
    data () {
      return {
        showDialog: false,
        showUnfreezeDialog: false,
        freezeAmount: 0,
        loading: false,
        checked: false,
        submitDisabled: true,
        freezeLoading: false,
        unFreezeLoad: false,
        nounFreeze: false
      }
    },
    methods: {
      cancel () {
        this.showDialog = false
        this.freezeLoading = false;
      },
      submit () {
        if (this.submitDisabled && this.checked) {
          this.freezeAjax ({addr: this.addr, key: this.priKey, amount: this.freezeAmount});

          this.submitDisabled = false;
          this.freezeLoading = true;
        }
      },
      release () {
        if (!this.unFreezeLoad) {
          this.unfreeze ({addr: this.addr, key: this.priKey});

          this.unFreezeLoad = true;
        }
      },
      numberWithCommas (val) {
        return `${parseInt (numberWithCommas (val))} TRX`
      },
      parseDate (stamp) {
        let d = new Date (stamp)
        return `${d.getMonth ()}/${d.getDate ()}/${d.getFullYear ()} ${d.getHours ()}:${d.getMinutes ()}`
      },
      exit () {
        this.showUnfreezeDialog = false
        this.nounFreeze = false
      },
      ...mapActions ('wallet', {
        freezeAjax: 'freeze',
        unfreeze: 'unfreeze'
      }),
      ...mapActions ({
        refreshTokenBalances: 'refreshTokenBalances'
      })
    },
    computed: {
      ...mapGetters ([
        'frozenBalances',
        "addr",
        'priKey'
      ]),
      ...mapState ('wallet', {
        getUserData: 'userData',
        getCanFreeze: 'canFreeze',
        getCanunFreeze: 'canunFreeze'
      })
    },
    watch: {
      freezeAmount (value) {
        if (value > 0 && this.checked) {
          this.submitDisabled = false
        }
        else {
          this.submitDisabled = true
        }
      },
      getCanunFreeze (data) {
        this.unFreezeLoad = false;

        if (data === false) {
          this.nounFreeze = true
        }
        else {
          this.nounFreeze = false
        }
      },
      showDialog (newVale) {
        if (newVale) {
          $ ("body").css ({"overflow": "hidden"});
        } else {
          $ ("body").css ({"overflow": "auto"});
        }
      },
      showUnfreezeDialog (newVale) {
        if (newVale) {
          $ ("body").css ({"overflow": "hidden"});
        } else {
          $ ("body").css ({"overflow": "auto"});
        }
      },
      getUserData (data) {
        this.freezeLoading = false;
        this.submitDisabled = false;
        this.showDialog = false;

        this.refreshTokenBalances ();
      }
    }
  }
</script>

<style lang="scss">

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .dialog {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background: rgba(1, 1, 1, 0.1);
    overflow: auto;
  }
</style>



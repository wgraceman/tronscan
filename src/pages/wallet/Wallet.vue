<template>
  <div class="profile">
    <div class="container content">
      <div class="row">
        <div class="col-md-3">
          <ul class="list-group sidebar-nav-v1" id="sidebar-nav">
            <li class="list-group-item">
              <a>{{$t('wallet.nav.account')}}</a>
              <ul>
                <li>
                  <router-link to="/wallet/account" >
                    <i class="fa fa-user"></i>{{$t('wallet.nav.overview')}}</router-link>
                </li>
                <li>
                  <router-link to="/wallet/balance" >
                    <i class="fa fa-bank"></i>{{$t('wallet.nav.balance')}} </router-link>
                </li>
                <li>
                  <router-link to="/wallet/apply" >
                    <i class="fa fa-sitemap"></i>{{$t('wallet.nav.apply')}} </router-link>
                </li>
              </ul>
            </li>
            <li class="list-group-item">
              <a >{{$t('wallet.nav.trans')}}</a>
              <ul>
                <li>
                  <router-link to="/wallet/send" >
                    <i class="fa fa-long-arrow-right"></i>{{$t('wallet.nav.send')}}</router-link>
                </li>
                <li>
                  <router-link to="/wallet/receive" >
                    <i class="fa fa-long-arrow-left"></i>{{$t('wallet.nav.receive')}}</router-link>
                </li>
              </ul>
            </li>
          </ul>
          <br>
          <div class="posts">
            <div class="headline headline-md margin-bottom-20">
              <h4>
                {{$t('wallet.nav.alert')}}</h4>
            </div>
            <div id="owl-demo">
              <div class="item">
                <p>
                  {{$t('wallet.nav.alertContent')}}
                </p>
              </div>
            </div>
          </div>
        </div>

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {

  created() {
    if (!this.loginStatus) {
      this.$router.push("/error?msg=login");
    }
  },
  computed: {
    ...mapGetters(["loginStatus"])
  }
};
</script>


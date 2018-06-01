<template>
  <div>
    <div class="header">
      <div class="container">
        <router-link to="/" tag="a" class="logo">
          <img id="logo-header logo-img" src="/static/tron_logo.png" />
        </router-link>
        <div class="topbar hidden-xs hidden-sm ">
          <form action="/search" method="GET">
            <ul class="loginbar pull-right">
              <br>
              <li>
                <div class="search-input">
                  <span class="search-btn">
                    <button class="btn-u" @click.prevent="search">
                      <i class="fa fa-search" style="color: #fff"></i>
                    </button>
                  </span>
                  <input type="text" class="form-control-custom ui-autocomplete-input input" placeholder="Search by Block/Transactions/Address" maxlength="80" v-model="param" />
                  <!-- <span class="login-btn">
                    <button class="btn-u" @click.prevent="handleLogClick">
                      <i class="fa " :class="[loginStatus ? 'fa-sign-out' : 'fa-sign-in']" style="color: #fff"></i>
                      {{ loginStatus ? $t('nav.signOut') : $t('nav.login')}}
                    </button>
                  </span> -->
                </div>
              </li>
            </ul>
          </form>
        </div>
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="fa fa-bars"></span>
        </button>
      </div>
      <app-header-nav></app-header-nav>
    </div>
    <div class="container left hidden-lg hidden-md page-nav" id="divmobilesearch">
      <form action="/search" method="GET">
        <input id="txtSearchInputMobile" type="text" placeholder="Search for Account, Tx Hash or Data" class="form-control ui-autocomplete-input" style="text-align: center;" name="q" maxlength="100" title="Address, Contract, Txn Hash or Data" autocomplete="off">
      </form>
      <br><br>
    </div>
    <app-header-breadcrumbs></app-header-breadcrumbs>
  </div>
</template>

<script>
import AppHeaderNav from "./AppHeaderNav";
import AppHeaderBreadcrumbs from "./AppHeaderBreadcrumbs";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AppHeaderNav,
    AppHeaderBreadcrumbs
  },
  computed: {
    ...mapGetters({
      loginStatus: "loginStatus"
    })
  },
  data() {
    return {
      param: ""
    };
  },
  methods: {
    async search() {
      if(!this.param){
        return
      }
      if (this.param.length < 10) {
        window.location = "/blocks/" + this.param;
      }else if(this.param.length < 50){
        window.location = "/addresses/" + this.param;
      }else{
        window.location = "/transactions/" + this.param;
      }
      this.param = ""
    },
    handleLogClick() {
      if (this.loginStatus) {
        this.logoutAccount();
        window.location = "/";
      } else {
        this.$router.push("/login");
      }
    },
    ...mapActions(["logoutAccount"]),
    ...mapActions("blockchain", {
      /*
        * getBlockByNumber
        * type {Object}
        * */
      getBlockByNumber: "getBlockByNumber"
    })
  }
};
</script>

<style lang="scss" scoped>
.logo-img {
  margin-top: 16px;
  margin-bottom: 14px;
  margin-left: -6px;
  width: 210px;
}
/*搜索输入框*/
.search-input {
  display: inline;
  .input {
    width: 330px;
    height: 31px;
  }
}
/*搜索按钮*/
.search-btn,
.login-btn {
  display: inline;
  button {
    padding: 3px 6px 3px 6px;
    height: 31px;
    min-width: 41px;
    margin-right: -5px;
    margin-top: 3px;
    vertical-align: bottom;
  }
}
.login-btn .btn-u {
  // background: #ff9f00;
  // border-color: #ff9f00;
  margin-left: 5px;
}
.page-nav {
  margin-top: 20px;
  margin-bottom: -18px;
  padding-right: 20px;
  padding-left: 20px;
}
</style>



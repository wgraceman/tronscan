<template>
  <div class="navbar-collapse mega-menu navbar-responsive-collapse collapse" aria-expanded="false">
    <div class="container">
      <!--头部导航列表-->
      <ul class="nav navbar-nav">
        <router-link v-for="(nav,index) in navs" :key="index" class="nav-li" :class="{'dropdown': nav.children}" tag="li" :to="nav.path" :exact="(nav.id === 'home')" :id="'nav-'+nav.id">
          <!--导航名称-->
          <a v-html="nav.name" aria-expanded="false" :data-toggle="(nav.children ? 'dropdown':'')"></a>
          <!--子导航-->
          <ul class="dropdown-menu" v-if="nav.children">
            <template v-for="(children,index) in nav.children">

              <router-link tag="li" v-if="!(children.divider)" :key="index" :to="children.path">
                <a v-html="children.name" :title="children.title" class="sub-nav"></a>
              </router-link>
              <li v-else :key="index" class="divider"></li>
            </template>
          </ul>
        </router-link>
        <router-link class="nav-li hidden-lg hidden-md" tag="li" to="logout" v-if="this.loginStatus">
          <a v-html="'logout'">
          </a>
        </router-link>
        <li class="dropdown">
          <a style="cursor: pointer" aria-expanded="false" data-toggle="dropdown">
            <i class="fa fa-globe"></i>
            lang
          </a>
          <ul class="dropdown-menu">
            <li><a class="sub-nav" @click="changeLang('zh-CN')">中文</a></li>
            <li><a class="sub-nav" @click="changeLang('en')">Enghlish</a></li>
          </ul>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      loginStatus: "loginStatus"
    }),
    navs() {
      return [
        {
          name: this.$t('nav.home'),
          path: "/",
          id: 'home'
        },
        {
          name: this.$t('nav.blocks'),
          path: "/blocks",
          id: 'blocks',
        },
        {
          name: this.$t('nav.transactions'),
          path: "/transactions",
          id: 'transactions',
        },
        {
          name: this.$t('nav.addresses'),
          path: "/addresses",
          id: 'addresses',
        },
        {
          name: this.$t('nav.network'),
          path: "#",
          id: 'network',
          children: [
            { name: this.$t('nav.nodes'), path: "/nodes" },
            { name: this.$t('nav.delegates'), path: "/delegates" }
          ]
        },
        {
          name: this.$t('nav.token'),
          path: "/tokensview",
          id: 'token',
          // children: [{ name: this.$t('nav.view'), path: "/tokensview" }, { name: this.$t('nav.create'), path: "/tokenscreate" }]
        },
        
        // {
        //   name: this.$t('nav.blocks'),
        //   path: "/blocks",
        //   id: 'blocks',
        // },
        // {
        //   name: this.$t('nav.wallet'),
        //   path: "/wallet",
        //   id: 'wallet',
        // }
      ]
    }
  },
  methods: {
    pageRouter(children) {
      switch (children.name) {
        case "create":
          this.$router.replace(`/token`);
          break;
        case "Nodes":
          this.$router.replace(`/network`);
          break;
        case "Delegates":
          this.$router.replace(`/network/delegates`);
          break;
        default:
          this.$router.replace(`${children.path}`);
          break;
      }
      this.setPageRouter(children.name);
    },
    changeLang(lang){
      this.$i18n.locale = lang;
    },
    ...mapActions({
      setPageRouter: "pageRouter"
    })
  }
};
</script>

<style lang="scss" scoped>
.header-nav {
  height: 1px;
}

.nav-li {
  min-width: 127px;
  text-align: center;
}

.navbar-nav {
  text-align: center;
}

.dropdown-menu {
  cursor: pointer;
  min-width: 127px !important;
  background-color: #fff;
}

.header .dropdown-menu li a {
  text-align: center;
  color: #687074;
  border-bottom: none;
  padding: 9px 30px 9px 30px;
}

.header .dropdown-menu li > a:hover {
  background-color: #eee !important;
}

@media (min-width: 992px) {
  .header .dropdown-menu {
    border: 0;
    min-width: 115px;
    border-radius: 0;
    z-index: 9999 !important;
    // border-top: solid 2px;
    border-bottom: none;
    margin-top: 2px;
  }
}
</style>



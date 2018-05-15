// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import Meta from 'vue-meta'
import VueI18n from 'vue-i18n'
import locales from './i18n'

import VueClipboards from 'vue-clipboards';
import VTooltip from 'v-tooltip'

import './plugins/jquery.min.js';

import './plugins/jquery.combine.min.js';


import './plugins/bootstrap.min.js'
// styles
import './assets/scss/font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
const defaultLang = 'zh-CN';

Vue.use(Meta)
Vue.use(VueI18n)
var i18n = new VueI18n({
  locale: localStorage.getItem('lang') || defaultLang,
  messages: locales
})

Vue.use(VueClipboards);
Vue.use(VTooltip)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  i18n
})

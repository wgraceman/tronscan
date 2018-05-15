import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Accounts from '@/pages/Accounts'

import Nodes from '@/pages/network/Nodes'
import Delegates from '@/pages/network/Delegates'

// Blocks
import BlockDetails from '@/pages/BlockDetails.vue'


// tokens
import Create from '@/pages/tokens/Create'
import View from '@/pages/tokens/View'


import Wallet from '@/pages/wallet/Wallet'
import Account from '@/pages/wallet/Account'
import Balance from '@/pages/wallet/Balance/Balance'
import Receive from '@/pages/wallet/Receive'
import Send from '@/pages/wallet/Send'
import Apply from '@/pages/wallet/Apply'

import Error from '@/pages/Error'


Vue.use(Router)

let scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        head: "Home",
        breadcrumbs: []
      }
    },
    // block
    // {
    //   path: '/blocks',
    //   name: 'blocks',
    //   component: Block,
    //   meta: {
    //     head: "Blocks",
    //     breadcrumbs: [
    //       { path: '/', name: 'home' },
    //       { name: 'blocks' }
    //     ]
    //   }
    // },
    // blocks list
    {
      path: '/blocks/:id',
      name: 'blockDetails',
      component: BlockDetails,
      meta: {
        head: "Block Detail",
        breadcrumbs: [
          { path: '/', name: 'home' },
          // { path: '/blocks', name: 'blocks' },
          { name: 'blockDetail' }
        ]
      }
    },
    // tokens
    {
      path: '/tokensview',
      name: 'tokensview',
      component: View,
      meta: {
        head: "View",
        breadcrumbs: [
          { path: '/', name: 'home' },
          { name: 'view' }
        ]
      }
    },
    {
      path: '/tokenscreate',
      name: 'tokenscreate',
      component: Create,
      meta: {
        head: "Create",
        breadcrumbs: [
          { path: '/', name: 'home' },
          { name: 'create' }
        ]
      }
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts,
      meta: {
        head: "Accounts",
        breadcrumbs: [
          { path: '/', name: 'home' },
          { name: 'accounts' }
        ]
      }
    },
    {
      path: '/network',
      redirect: '/network/nodes',
    },
    {
      path: '/nodes',
      component: Nodes,
      meta: {
        head: "Nodes",
        breadcrumbs: [
          { path: '/', name: 'home' },
          { name: 'nodes' }
        ]
      },
    },
    {
      path: '/delegates',
      component: Delegates,
      meta: {
        head: "Delegates",
        breadcrumbs: [
          { path: '/', name: 'home' },
          { name: 'delegates' }
        ]
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        head: "Login",
        breadcrumbs: [
          { path: '/', name: 'home' },
          { name: 'login' }
        ]
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        head: "Registration",
        breadcrumbs: [
          { path: '/', name: 'home' },
          { name: 'registration' }
        ]
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet,
      redirect: '/wallet/account',
      children: [
        {
          path: 'account',
          component: Account,
          meta: {
            head: "Account",
            breadcrumbs: [
              { path: '/', name: 'home' },
              { name: 'wallet' }
            ]
          },
        },
        {
          path: 'balance',
          component: Balance,
          meta: {
            head: "Balance",
            breadcrumbs: [
              { path: '/', name: 'home' },
              { path: '/wallet', name: 'wallet' },
              { name: 'balance' }
            ]
          },
        },
        {
          path: 'receive',
          component: Receive,
          meta: {
            head: "Balance",
            breadcrumbs: [
              { path: '/', name: 'home' },
              { path: '/wallet', name: 'wallet' },
              { name: 'receive' }
            ]
          },
        },
        {
          path: 'send',
          component: Send,
          meta: {
            head: "Balance",
            breadcrumbs: [
              { path: '/', name: 'home' },
              { path: '/wallet', name: 'wallet' },
              { name: 'send' }
            ]
          },
        },
        {
          path: 'apply',
          component: Apply,
          meta: {
            head: "Balance",
            breadcrumbs: [
              { path: '/', name: 'home' },
              { path: '/wallet', name: 'wallet' },
              { name: 'apply' }
            ]
          },
        },
      ]
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      alias: "*",
      meta: {
        head: "",
        nofooter: true,
        breadcrumbs: [
          { path: '/', name: 'home' },
          { name: 'error' }
        ]
      }
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  scrollBehavior
})

router.beforeEach((to, from, next) => {
  if (to.hash === '#') {
    return
  } else {
    if (/wallet/.test(to.path)) {
      setTimeout(() => {
        $('#nav-wallet').addClass('active')
      }, 100);
      $('#nav-wallet').addClass('active')
      next();
    }
    if (/blocks/.test(to.path)) {
      setTimeout(() => {
        $('#nav-blocks').addClass('active')
      }, 100);
      $('#nav-blocks').addClass('active')
      next();
    }

    $('.navbar-collapse').removeClass('in')
    $('.nav-li').removeClass('active')
    setTimeout(() => {
      let dropdown = $('.dropdown-menu .active').parent()
      if (dropdown.hasClass('dropdown-menu')) {
        dropdown.parent().addClass('active')
      }
    }, 100)

    next()
  }
})

export default router

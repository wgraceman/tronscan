<template>
  <div class="profile container " style="margin-top: 5px">
    <br>
    <div class="row">
      <div class="col-md-6 hidden-xs loading" v-show="tokensListData.length === 0">
        <!--&lt;!&ndash;loading&ndash;&gt;-->
        <!--<span>-->
          <!--<i id="spinwheel" class="fa fa-spin fa-spinner fa-2x fa-pulse"></i>-->
        <!--</span>-->
        <!--<span>Showing Block ....</span>-->
        <loader></loader>
      </div>
    </div>
    <!--block list-->
    <div class="row block-list">
      <component :is="component" :tokensListData="tokensListData"></component>
    </div>
    <br><br>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapState,mapGetters} from 'vuex';
  //  TonkensList
  import TonkensList from 'compDom/TonkensList/TonkensList';
  // TonkensCreate
  import TonkensCreate from '@/compDom/TonkensCreate/TonkensCreate'
  //  Loader
  import Loader from 'compUI/Loader/Loader';

  export default {
    data () {
      return {
        /*
         * Tokens list data
         * @type {Array}
         * */
        tokensListData: [],
        /*
         * iscomponent
         * @type {String}
         * */
        component: 'TonkensList'
      }
    },
    created () {
      // ajax Tokens data
      this.getAllTokens();
    },
    mounted () {
      console.log(this.$route.hash);
      
      if (this.$route.hash === '#create') {
        this.component = 'TonkensCreate'
      }
      else {
        this.component = 'TonkensList'
      }
    },
    computed: {
      ...mapGetters({
        getPageRouter: 'pageRouter'
      }),
      ...mapState('tokens', {
        getTokens: 'tokens'
      })
    },
    methods: {
      ...mapActions('tokens', {
        getAllTokens: 'getAllTokens'
      })
    },
    watch: {
      getTokens (tokensList) {
        this.tokensListData = tokensList;
      },
      getPageRouter (router) {
        if (router === 'create') {
          this.component = 'TonkensCreate'
        }
        else {
          this.component = 'TonkensList'
        }
      }
    },
    components: {
      TonkensList,
      TonkensCreate,
      Loader
    }
  }
</script>

<style scoped lang="scss">

  .fa-pulse {
    display: inline-block;
  }

  .page-txt {
    padding: 2px 4px 4px 3px;
    border: 1px solid #D4D4D4;
    line-height: 30px;
    background-color: #EAEAEA;
    margin-top: 2px;
    height: 2px;
  }

  .fa-pulse {
    color: #192330;
  }

  .row {
    position: relative;
    margin: 0;
  }

  .block-list {
    box-shadow: 0 0 20px 0 #ececec;
    min-height: 523px;
    margin-bottom: 30px;
  }

  .loading {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    padding-top: 15%;
    width: 100%;
    min-height: 523px;
    text-align: center;
    z-index: 100;
  }

  .col-md-6 {
    width: 100%;
  }

  .container {
    min-height: 610px;
  }

  .pagination {
    display: flex;
    float: right;
    margin-top: 10px;
    margin-right: 20px;
  }

  @media (max-width: 1200px) {
    .pagination {
      margin: 10px auto 0;
      float: none;
      display: flex;
      padding-left: 0;
      list-style: none;
      border-radius: .25rem;
      display: flex;
      justify-content: center;
    }
  }

  .pagination .page-item:first-child {
    margin-right: 15px;
  }

  .pagination .page-item {
    position: relative;
    margin: 0 6px;
    min-width: 14px;
    display: flex;
    justify-content: center;
  }

  .pagination .page-item .page-link {

  }

  .page-item:first-child .page-link {
    margin-left: 0;
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
  }

  .pagination .page-item .page-link {
    position: relative;
    display: block;
    margin-left: -1px;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    color: #6f6f6f;
    padding: 0;
    border: none !important;
    background: none !important;
    cursor: pointer;
  }

  .no-click {
    cursor: default !important;
  }

  .pagination .page-item {
    position: relative;
    margin: 0 6px;
    min-width: 14px;
    &.active:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 2.5px;
      right: 0;
      height: 2px;
      background-image: linear-gradient(270deg, #22e6b8, #00c1ce);
    }
  }

  @media (min-width: 992px) {
    .container {
      min-height: 523px;
    }
  }

  @media (min-width: 1200px) {
    .container {
      min-height: 523px;
    }
  }

  @media (max-width: 767px) {
    .hidden-xs {
      display: inherit ;
    }
    .container {
      min-height: 523px;
    }
  }

  @media (min-width: 768px) {
    .container {
      min-height: 523px;
    }
  }
</style>

<template>
  <div class="profile container " style="margin-top: 5px">
    <!--block list-->
    <div class="row fix-tool">
      <ul class="pagination">
        <li v-if="currentPage > 1"><a href="javascript:void(0);" @click="goFirst">{{$t('base.pagination.first')}}</a></li>
        <li v-if="currentPage > 1"><a href="javascript:void(0);" @click="prevPage">{{$t('base.pagination.pre')}}</a></li>
        <li class="current-page">{{ currentPage }}/{{ totalPage }}</li>
        <li v-if="currentPage < totalPage"><a href="javascript:void(0);" @click="nextPage">{{$t('base.pagination.next')}}</a></li>
        <li v-if="currentPage < totalPage"><a href="javascript:void(0);" @click="goLast">{{$t('base.pagination.last')}}</a></li>
      </ul>
    </div>
    <div class="row block-list">
      <loader v-if="!tokens.data"></loader>
      <tokens-list :tokensListData="tokens.data" v-else></tokens-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapState,mapGetters} from 'vuex';
  //  TokensList
  import TokensList from 'compDom/TokensList/TokensList';
  //  Loader
  import Loader from 'compUI/Loader/Loader';

export default {
    data () {
      return {
        query: {
          sort: '-name',
          limit: 25,
          start: 0
        }
      }
    },
    async created() {
      this.getAllTokens(this.query);
    },
    computed: {
      ...mapGetters({
        tokens: "tokens/allTokens" 
      }),
      currentPage() {
        return (this.query.start / this.query.limit) + 1;
      },
      totalPage() {
        return this.tokens.total ? Math.ceil(this.tokens.total / this.query.limit) : 0;
      }
    },
    methods: {
      //
      goFirst() {
        this.query.start = 0;
        this.getAllTokens(this.query);
      },
      // nextPage
      nextPage () {
        this.query.start = ((this.query.start + this.query.limit) > this.tokens.total) ? this.query.start : (this.query.start + this.query.limit);
        this.getAllTokens(this.query);
      },
      // prevPage
      prevPage () {
        this.query.start = (this.query.start - this.query.limit) < 0 ? 0 : (this.query.start - this.query.limit);
        this.getAllTokens(this.query);
      },
      goLast() {
        this.query.start = (this.totalPage - 1) * this.query.limit;
        this.getAllTokens(this.query);
      },
      ...mapActions("tokens", [
        "getAllTokens"
      ])
    },
    components: {
      TokensList,
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
      background: #cd524c;
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
      display: inherit !important;
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

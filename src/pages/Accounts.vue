<template>
  <main role="main" class="container mt-3">
    <!--<div class="row">-->
      <!--<div class="col-md-12">-->
        <!--<input type="text" placeholder="Search for address" class="form-control" v-model="searchString">-->
      <!--</div>-->
    <!--</div>-->
    <div class="row">
      <div class="col-md-12">
        <div class="mt-1 bg-white break-word">
          <div class="loading" v-show="accountList.length === 0">
            <loader></loader>
          </div>

          <div class="table table-striped">
            <div class="thead-dark">
              <div class="thead-dark-index">＃</div>
              <div class="thead-dark-address">
                <span>{{$t('accounts.addr')}}</span>
              </div>
              <div class="text-right thead-dark-balance">
                <span>{{$t('accounts.balance')}}</span>
              </div>
            </div>
            <div   v-show="accountList.length > 0">
              <div v-for="(item,index) in accountList"
                   :key="item.address"
                   v-show="item.balanceNum >= 0"
                   class="item"
              >
                <div scope="row" class="item-index">
                  <span>#{{index + 1}}</span>
                </div>
                <div class="item-content">
                  <div class="address">{{item.address}}</div>
                  <div class="text-right">
                    <span>{{item.balanceNum}}</span> TRX
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapGetters} from 'vuex'
  import {filter} from "lodash";
  //  Loader
  import Loader from 'compUI/Loader/Loader';

  export default {
    data () {
      return {
        /*
         * accountList
         * @type {Array}
         * */
        accountList: [],
        /*
         * searchString
         * @type {String}
         * */
        searchString: ''
      }
    },
    mounted () {
      this.setAccountList()
    },
    computed: {
      ...mapGetters({
        getAccountList: 'accountList'
      })
    },
    methods: {
//      filteredAccounts(search) {
//        let accounts = this.getAccountList;
//        let searchString = search;
//
//        searchString = searchString.toUpperCase();
//
//        if (searchString.length > 0) {
//          accounts = filter(accounts, a => a.address.toUpperCase().indexOf(searchString) !== -1);
//        }
//        this.accountList = accounts
//      },
      ...mapActions({
        setAccountList: 'accountList'
      })
    },
    watch: {
      getAccountList (data) {
        this.accountList = data
      }
//      searchString (search) {
//        this.filteredAccounts(search)
//      }
    },
    components: {
      Loader
    }
  }
</script>

<style scoped lang="scss">
  .col-md-12 {
    margin: 25px 0;
  }

  .thead-dark {
    display: flex;
    padding: 20px;
    background: #cd524c;
    color: #fff;
  }

  .break-word {
    min-height: 610px;
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

  .thead-dark-index {
    flex: 0 0 100px;
  }

  .thead-dark-address {
    flex: 1;
  }

  .thead-dark-balance {
    flex: 1;
    text-align: right;
  }

  .item {
    display: flex;
    padding: 20px 10px;
    border-bottom: 1px solid #efefef;
    .item-index {
      flex: 0 0 100px;
      span{
        background-color: #cd524c;
        color: #fff;
        padding: 10px;
        border-radius: 5px !important;
        overflow: hidden;
      }
    }
    .address {
      flex: 1;
    }
    .text-right {
      flex: 1;
      text-align: right;
    }
  }

  .table th, .table td {
    padding: 1.4rem;
  }

  .break-word {
    box-shadow: 0 0 20px 0 #ececec;
  }

  tr {
    border-bottom: 1px solid #efefef;
    background: inherit !important;
  }

  .item-content {
    display: flex;
    width: 100%;
  }

  @media (max-width: 576px) {
    .thead-dark-index{
      flex: 0 0 50px;
    }

    .thead-dark{
      display: none;
    }

    .item{
      padding: 15px 10px;
    }
    .item .item-index{
      flex: 0 0 40px;
    }

    .item-content {
      display: inline-block;
      width: 100%;
      padding-left: 10px;
      overflow: hidden;
    }
    .item .text-right{
      text-align: left;
      color: #6c757d;
    }

    .address{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item .item-index span{
      position: relative;
      top: 10px;
    }
  }
</style>

<template>
  <div>
    <div class="block-list-wrapper">
      <div class="table-responsive">
        <table class="table table-hover" v-show="blockListData.length > 0">
          <!--list-header-->
          <thead>
          <tr class="block-list-header">
            <th>#</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
          </tr>
          </thead>
          <!--list-content-->
          <tbody class="block-list-tbody">
          <tr v-for="(item,index) in blockListData" :key="index">
            <td>
              {{index + 1}}
            </td>
            <td>
              <a >{{item.from}}</a>
            </td>
            <td>
              <a >{{item.to}}</a>
            </td>
            <td>{{item.amount}} Trxs</td>
            <!-- <td class="address-tag"><a>{{item.parentHash}}</a></td> -->
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from 'vuex';

  export default {
    props: {
      /*
       * block list data
       * @type {Array}
       * */
      blockListData: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        /*
         * now data
         * @type {String}
         * */
        nowData: null
      }
    },
    methods: {
      // initTimeData
//      timeDefference (startTime, endTime) {
//        let t1 = new Date(startTime);
//        let t2 = new Date(endTime);
//        let result;
//        let title;
//        let start = false;
//
//
//        if (!start) {
//          resultTitle(t1, t2)
//        }
//        setInterval(() => {
//          start = true;
//          resultTitle(t1, t2)
//        }, 60000);
//
//        function resultTitle (t1, t2) {
//          if (t1.getFullYear() - t2.getFullYear() > 0) {
//            result = t1.getFullYear() - t2.getFullYear();
//
//            title = `${result}year`;
//          }
//          if (t1.getMonth() - t2.getMonth() > 0) {
//            result = t1.getMonth() - t2.getMonth();
//
//            title = `${result}mounth`;
//          }
//          if (t1.getDate() - t2.getDate() > 0) {
//            result = t1.getDate() - t2.getDate();
//
//            title = `${result}date`;
//          }
//          if (t1.getHours() - t2.getHours() > 0) {
//            result = t1.getHours() - t2.getHours();
//
//            title = `${result}hour`;
//          }
//          if (t1.getMinutes() - t2.getMinutes() > 0) {
//            result = t1.getMinutes() - t2.getMinutes();
//
//            title = `${result}minutes`;
//          }
//
//          title = 'a moment ago';
//        }
//
//
//        return title;
//      },
      // time
      timestampToTime(timestamp) {
        let date = new Date(timestamp);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
      },
      // go blockIF
      goBlockIn (item) {
        this.$router.push ({
          path: `/blocks/${item.number}`
        })

        // get block If
        this.getBlockInformation(item)
      },
      ...mapActions ('blockchain', {
        /*
        * get block If
        * @type {Object}
        * */
        getBlockInformation: 'blockInformation'
      })
    }
  }
</script>

<style scoped lang="scss">

  .block-list-header {
    background: none;
    border-bottom: 1px solid #efefef;
  }

  .table-hover > tbody > tr:hover {
    background: none;
  }
  tr{
    border-bottom: 1px solid #efefef;
  }
  .profile .table a {
    color: #cd524c;
  }
  .table > tbody > tr > td{
    border-top: none;
  }
  td{
    color: #6f6f6f;
  }

  a:hover{
    text-decoration: none;
  }

  .page-go{
    cursor: pointer;
  }

  @media (max-width: 767px) {
    .table-responsive {
      border: none;
    }
  }

  .table-responsive{
    box-shadow: 0 10px 6px -6px #bbb;
  }
</style>

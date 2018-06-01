<template>
  <div class="vcontainer page page-wrapper">
    <transition name="fade">
      <div class="vcontainer page" v-if="typeof(currentBlock.number) !== 'undefined'">
        <!--header-->
        <div class="header d-block d-lg-flex">
          <div>
            <span class="block">{{$t('blockDetail.height')}}</span>
            <span class="height">{{currentBlock.number || '000000'}}</span>
          </div>
        </div>
        <!--content-->
        <div class="main">
          <div class="baseinfo">
            <div class="title font-info-title">{{$t('blockDetail.basic')}}</div>
            <div class="vshadow d-block d-lg-flex">
              <div class="left">
                <ul class="vsection">
                  <!--Height-->
                  <li class="item">
                    <span class="vcolor-192330 strong">{{$t('blockDetail.height')}}</span>
                    <div>
                      <span class="vcolor-192330">{{currentBlock.number || null}}</span>
                      <span class="vcolor-f6a623">{{$t('blockDetail.main')}}</span>
                    </div>
                  </li>
                  <!--time-->
                  <li class="item">
                    <span class="vcolor-192330 strong">{{$t('blockDetail.age')}}</span>
                    <span id="block-time" class="vcolor-192330">{{timestampToTime (currentBlock.timestamp) || null}}</span>
                  </li>
                  <!--Tamaño-->
                  <li class="item">
                    <span class="vcolor-192330 strong">{{$t('blockDetail.size')}}</span>
                    <span class="vcolor-192330">{{currentBlock.size}} Bytes</span>
                  </li>
                  <!--Witness-->
                  <li class="item">
                    <span class="vcolor-192330 strong">{{$t('blockDetail.witness')}}</span>
                    <span class="vcolor-192330">
                      <a class="page-go" @click="$router.push('/addresses/'+currentBlock.witnessAddress)">{{currentBlock.witnessAddress}}</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="right">
                <!--nextpage-->
                <ul class="vsection">
                  <!--Height-->
                  <li class="item">
                    <span class="vcolor-192330 strong">{{$t('blockDetail.status')}}</span>
                    <div>
                      <span class="vcolor-192330">{{currentBlock.confirmed ? $t('blockDetail.confirm') : $t('blockDetail.unconfirm')}}</span>
                    </div>
                  </li>
                  <!--time-->
                  <li class="item">
                    <span class="vcolor-192330 strong">{{$t('blockDetail.nrOfTrx')}}</span>
                    <span id="block-time" class="vcolor-192330">{{currentBlock.nrOfTrx}} {{$t('blockDetail.nrOfTrxUnit')}}</span>
                  </li>
                  <!--Tamaño-->
                  <li class="item">
                    <span class="vcolor-192330 strong">{{$t('blockDetail.hash')}}</span>
                    <span class="vcolor-192330" style="width: 80%;overflow: auto;">{{currentBlock.hash}}</span>
                  </li>
                  <!--Witness-->
                  <li class="item">
                    <span class="vcolor-192330 strong">{{$t('blockDetail.parentHash')}}</span>
                    <span class="vcolor-192330" style="width: 80%;overflow: auto;">{{currentBlock.parentHash}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--list-->
        <div id="block-trade-detail" class="tradedetail">
          <div class="top">
            <div class="title">{{$t('blockDetail.transactions')}}</div>
          </div>
          <transaction-list :transListData="blockTrans" v-if="blockTrans.length > 0"></transaction-list>
          <div v-else class="vshadow no-record">{{$t('base.noRecord')}}</div>
        </div>
        <div id="block-trade-detail" class="tradedetail">
          <div class="top">
            <div class="title">{{$t('blockDetail.transfer')}}</div>
          </div>
          <transfer-list :transListData="blockTransf" v-if="blockTrans.length > 0"></transfer-list>
          <div v-else class="vshadow no-record">{{$t('base.noRecord')}}</div>
        </div>
      </div>
      <div class="vcontainer page pt-20" v-else>
        <loader></loader>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from "vuex";
import Loader from "compUI/Loader/Loader";
import TransactionList from "./TransactionList";
import TransferList from "./TransferList";

export default {
  data() {
    return {
      /*
         * ajax block data ok
         * @type {Boolean}
         * */
      ajaxBlockListOK: true
    };
  },
  mounted() {
    // if (!this.currentBlock.number) {
    this.getBlockByNumber(this.$route.params.id).catch(err => {
      this.$router.push("/error?msg=" + err);
    });
    // }
  }, 
  computed: {
    ...mapGetters("blockchain", [
      "currentBlock",
      "blockTrans",
      "blockTransf"
    ])
  },
  methods: {
    // init time data
    timestampToTime(timestamp) {
      let date = new Date(timestamp);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      let h = date.getHours() + ":";
      let m = date.getMinutes() + ":";
      let s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // nextPage
    nextPage(number) {
      // if ajax ok
      if (!this.ajaxBlockListOK) {
        return;
      }
      this.ajaxBlockListOK = false;

      this.getBlockByNumber(number).catch(err => {
        this.$router.push("/error?msg=" + err);
      });
    },
    // prevPage
    prevPage(number) {
      // if ajax ok
      if (!this.ajaxBlockListOK) {
        return;
      }
      this.ajaxBlockListOK = false;

      this.getBlockByNumber(number).catch(err => {
        console.log(err);

        // this.$router.push("/error?msg=" + err);
      });
    },
    ...mapActions("blockchain", {
      /*
        * getBlockByNumber
        * type {Object}
        * */
      getBlockByNumber: "getBlockByNumber"
    })
  },
  watch: {
    currentBlock(data) {
      //  set ajax block list data ok
      // console.log('aaa',typeof(data.number));

      this.ajaxBlockListOK = true;
    }
  },
  components: {
    TransactionList,
    TransferList,
    Loader
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.page-wrapper {
  min-height: 100vh;
}

.vcontainer {
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  padding-left: 15px;
  padding-right: 15px;
}

.page {
  padding-top: 0;
  padding-bottom: 35px;
}
.pt-20 {
  padding-top: 200px;
}

.header {
  display: flex;
  margin-top: 36px;
  height: 90px;
  padding: 0 30px;
  background: #cd534c;
  box-shadow: 0 0 20px 0 #ececec, 0 0 20px 0 #ececec;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: none;
  .block {
    font-size: 24px;
    color: #fff;
  }
  .height {
    margin-left: 15px;
    font-size: 24px;
    color: #fff;
  }
  .desc {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    word-break: break-all;
    display: inline-block;
  }
  .fork {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 12px;
    margin-right: 38px;
  }
}

.baseinfo {
  margin-top: 35px;
  .title {
    margin-bottom: 10px;
  }
  .left {
    padding-left: 20px;
    padding-right: 40px;
  }
  .right {
    padding-left: 40px;
    padding-right: 20px;
  }
  .left,
  .right {
    width: 50%;
  }
}

.vsection {
  padding: 0;
  font-size: 12px;
  width: 100%;
  margin-bottom: 0;
  .item {
    padding: 0;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #efefef;
  }

  .strong {
    font-weight: 500;
  }
}

.vshadow {
  background-color: #fff;
  box-shadow: 0 0 20px 0 #ececec;
}

.vcolor-cd534c {
  color: #cd534c !important;
}

.vcolor-f6a623 {
  color: #f6a623 !important;
}

.font-info-title {
  font-size: 18px;
  color: #192330;
}

.trace {
  margin-top: 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  .item {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    margin: 0 30px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
  }
  .icon-arrow-block {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDE3IDEwIj48cGF0aCBkPSJNMCA1aC41MDVNMi40MSA1aDEuMzYybTEuODYzIDBoOS45TTEyIDkuMjQzTDE2LjI0MyA1IDEyIC43NTciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzUyQ0JDQSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+);
    width: 17px;
    height: 10px;
    font-size: 0;
    vertical-align: middle;
    display: inline-block;
    text-indent: -9999px;
  }
  .block-current {
    font-size: 14px;
    text-align: center;
    color: #ffbc32;
    margin-top: 10px;
    margin-bottom: 0;
  }
  .i-block-current {
    background: url("../../assets/img/nextImg.png");
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .i-block-near {
    background: url("../../assets/img/nowImg.png");
    background-size: cover;
    width: 30px;
    height: 30px;
  }
  .vicon {
    font-size: 0;
    vertical-align: middle;
    display: inline-block;
    text-indent: -9999px;
  }
}

.block-near {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #cd534c;
  margin-top: 5px;
  margin-bottom: 0;
}

.tradedetail {
  margin-top: 39px;
  .middle {
    margin-top: 10px;
    margin-bottom: 0;
    padding-left: 0;
  }
}

.top {
  .title {
    font-size: 18px;
    color: #192330;
    margin-bottom: 10px;
  }
  .txcount {
    font-size: 14px;
    color: #192330;
    margin-left: 20px;
  }
  .confirm {
    margin-left: 20px;
    display: inline-block;
    padding: 0 20px 0 8px;
    font-size: 14px;
    color: #192330;
    text-align: center;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAUCAMAAABMHminAAAAP1BMVEVMaXH/uwT/zjv/0UT/32z/4Gz/4XD/42z/32j/4Wz/yzL/wRX/vg3/1Ez/yCr/22H/wx3/11T/xiP/2Vr/3mj1nHbOAAAACnRSTlMA////9bR/Hd1H1QaRAwAAAVhJREFUOMudlQuWxBAQRYX5NUJE9r/WHpRQn0x6+m3gnutVKbVAfIuDbDV7TaixLRpitKlZW1JLLok1RzwgX2qRKNsMaYgT0jHA6JSCyQgyGIog/KUJVjFnmEiOeaZ8KkVN3I3JKQKcFb8XNykMgPiu4rlI7yTMlF4JMBKC5NFJZajb4sNcvLa4kl8TM0x4J40hFw+QHT1XQNNFTECFmPx8Iwi8l5Oma0cmFo0w6iT35sGkM+TiHSs+EBPayTResT/XySAmoLI5WvyYLmSyouaxyWDQ4tF0SSZkuOZdJCP8UAyy8GXcNz7B9FuBThLvJDITLw2XtPHaip1IfxfvRBzhTfhV5E6S+HfR6fLNxV1tvCUmtJNEN/4oe/LxeM9E4yHGf9dcSV15oIjDJXVC9gTfk4uN75Q/TPb/3JN0cU8qhSy8v5mucU/0i/dkPlo33wq/J+a1e1IoT6Y2VPS0nKCxAAAAAElFTkSuQmCC);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}

.tx-detail {
  margin-bottom: 14px;
  .hash-section {
    min-height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #efefef;
    padding-left: 16px;
    padding-right: 20px;
    .output {
      width: 270px;
      float: right;
      text-align: right;
    }
    .fee {
      float: right;
      font-size: 14px;
      color: #6f6f6f;
    }
    .icon-hash {
      background-image: url("../../assets/img/iconHash.png");
      width: 28px;
      height: 28px;
      font-size: 0;
      vertical-align: middle;
      display: inline-block;
      text-indent: -9999px;
    }
    .hash {
      margin-left: 10px;
    }
  }
  .address-section {
    display: flex;
    padding: 34px 50px 49px 27px;
    .address {
      width: 360px;
    }
    .coin {
      position: relative;
      font-size: 14px;
      color: #6f6f6f;
    }
    .address-box.input {
      position: relative;
      padding-right: 25px;
    }
    .address-box.output {
      padding-left: 25px;
    }
    .address-box {
      display: flex;
      word-break: break-all;
      align-items: center;
      width: 50%;
      .coinbase {
        margin-left: 22px;
      }
      .address-box-inner {
        flex: 1;
      }
      .address-row {
        position: relative;
        padding-left: 5px;
        margin-top: 6px;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
      }
    }
  }
}

.font-coin-title {
  font-size: 16px;
  font-weight: 500;
  color: #192330;
}

.font-hash-content {
  font-size: 14px;
}

.font-hash-title {
  font-size: 16px;
}

.font-hash-content,
.font-hash-title {
  font-weight: 500;
  color: #3d3d3d;
}

a:hover {
  text-decoration: none;
}

.page-go {
  cursor: pointer;
}

.tx-detail .address-section .address-box.input:after {
  content: "";
  display: inline-block;
  position: absolute;
  right: 45px;
  top: 50%;
  width: 72px;
  height: 72px;
  transform: translateY(-50%);
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNzQiIGhlaWdodD0iNzQiIHZpZXdCb3g9IjAgMCA3NCA3NCI+PGRlZnM+PGNpcmNsZSBpZD0iYiIgY3g9IjE4IiBjeT0iMTgiIHI9IjE4Ii8+PGZpbHRlciBpZD0iYSIgd2lkdGg9IjI2Ni43JSIgaGVpZ2h0PSIyNjYuNyUiIHg9Ii04My4zJSIgeT0iLTgzLjMlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPjxmZU9mZnNldCBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSIgc3RkRGV2aWF0aW9uPSIxMCIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiB2YWx1ZXM9IjAgMCAwIDAgMC45MjQzNzI4NzQgMCAwIDAgMCAwLjkyNDM3Mjg3NCAwIDAgMCAwIDAuOTI0MzcyODc0IDAgMCAwIDEgMCIvPjwvZmlsdGVyPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5IDE5KSI+PHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjYSkiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSIjRkZGIiB4bGluazpocmVmPSIjYiIvPjwvZz48cGF0aCBmaWxsPSIjRkZCQzMyIiBkPSJNMzAuNyAyNy4xbDMuNiAxMC4yODUtMy42IDkuODEgMTUuNDY1LTEwLjA0OHoiLz48L2c+PC9zdmc+);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.no-record {
  padding: 30px;
  text-align: center;
}

@media (min-width: 992px) {
  .d-lg-flex {
    display: flex !important;
  }
  .d-lg-inline-block {
    display: inline-block !important;
  }
}

@media (max-width: 1200px) {
  .page .header {
    margin: 0;
    padding: 10px;
    height: auto;
    box-shadow: none;
    display: -webkit-box;
  }

  .vcontainer {
    width: 100%;
    padding: 0;
  }

  .page {
    padding-top: 0;
    padding-bottom: 50px;
  }

  .page .panel-header {
    padding: 0 10px;
    margin: 36px auto 10px;
  }

  .mobile-padding {
    padding: 0 10px;
  }

  .page .baseinfo {
    margin-top: 15px;
  }

  .page .baseinfo .left,
  .page .baseinfo .right {
    width: 100%;
    display: block;
    padding: 0;
  }

  .page .baseinfo .vsection li.item {
    padding: 0 10px;
  }

  .page .baseinfo .vsection li.item:last-child {
    border-bottom: 1px solid #efefef;
  }

  .page .baseinfo .trace {
    margin-top: 10px;
  }

  .page .tradedetail .top {
    padding-right: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .page .tradedetail .top .title {
    margin-top: -3px;
    padding-right: 0;
  }

  .page .tradedetail .top .txcount {
    margin-left: 5px;
  }

  .page .tradedetail .top .confirm {
    margin-left: 5px;
    padding: 0 16px 0 4px;
  }

  .page .tradedetail .bottom {
    margin-top: 10px;
  }

  .page .tradedetail .pagination {
    margin-top: 1rem;
  }

  .page .title {
    padding: 0 10px;
  }

  .tx-detail .address-section .address-box.input:after {
    left: 80%;
  }
}

@media (max-width: 760px) {
  .tx-detail .address-section .address-box.input:after {
    top: 100%;
    left: 50%;
    width: 48px;
    height: 48px;
    transform: translate3d(-50%, -30%, 0) rotate(90deg);
  }

  .tx-detail
    .address-section
    .address-box
    .address-box-inner
    .address-row
    .address
    .hash {
    line-height: 1.2;
  }
  .tx-detail
    .address-section
    .address-box
    .address-box-inner
    .address-row
    .address {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: auto;
    font-size: 14px;
  }
  .tx-detail .address-section .address-box .address-box-inner .address-row {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
    margin-left: -4px;
    padding-left: 0;
  }

  .tx-detail .address-section .address-box .address-box-inner {
    text-align: center;
    width: 100%;
  }

  .tx-detail .address-section .address-box.input {
    margin-bottom: 24px;
  }
  .tx-detail .address-section .address-box {
    width: 100%;
    padding-right: 0 !important;
  }

  .tx-detail .address-section {
    display: block;
    padding: 0 10px 0 5px;
  }

  .tx-detail .hash-section {
    overflow: hidden;
    line-height: 1.4;
    padding: 10px;
    min-height: 40px;
    display: flex;
    align-items: center;
  }

  .tx-detail .hash-section .icon-hash {
    display: none;
  }

  .tx-detail .hash-section .hash {
    padding-left: 10px;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 0;
  }
  .font-hash-title {
    font-size: 16px;
  }
}
</style>

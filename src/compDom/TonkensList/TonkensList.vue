<template>
  <main class="container pt-3">
    <div class="row">
      <div class="col-sm-12">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>
                <span style="max-width:300px">{{$t('tokens.name')}}</span>
              </th>
              <th>
                <span>{{$t('tokens.addr')}}</span>
              </th>
              <th class="text-right">
                <span>{{$t('tokens.supply')}}</span>
              </th>
              <th>
                <span>{{$t('tokens.time')}}</span>
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <!--data-item-->
          <tbody v-for="(item, index) in tokensListData" :key="index">
            <tr class="item-wrapper">
              <td class="td">
                <div class="item-name">
                  {{item.name}}
                </div>

              </td>
              <div class="item" style="color: #cd524c;">
                <span :title="item.ownerAddress">{{item.ownerAddress}}</span>
              </div>
              <td class="text-right td">
                <span>{{toMoney (item.totalSupply)}}</span>
              </td>
              <td class="td">
                {{timestampToTime (item.startTime)}} - {{timestampToTime (item.endTime)}}
              </td>
              <td class="text-right td">
                <button type="button" class="btn btn-block btn-primary btn-sm" :class="{'btn-primary-active': index === showParticipar}" @click="show(index)">
                  <span>{{index === showParticipar ? $t('base.close') : $t('tokens.parti')}}</span>
                </button>
              </td>
            </tr>
            <transition name="fade">
              <tr class="participar-tr" v-show="index === showParticipar">
                <td colspan="5" class="bg-white">
                  <div class="form-group row no-gutters participar-wrapper">
                    <label class="col-2 font-weight-bold text-right description">
                      <span>{{$t('tokens.collapse.desc')}}</span>
                    </label>
                    <div class="col-sm-9 participar-name">
                      <div class="pl-2">{{item.name}}</div>
                    </div>
                  </div>
                  <div class="form-group row no-gutters participar-wrapper">
                    <label class="col-2 font-weight-bold text-right description">
                      <span>{{$t('tokens.collapse.price')}}</span>
                    </label>
                    <div class="col-sm-9 participar">
                      <div class="pl-2">
                        <span>{{item.price / item.trxNum}}</span> TRX</div>
                    </div>
                  </div>
                  <div class="form-group row no-gutters participar-wrapper">
                    <label class="col-2 font-weight-bold text-right description">
                      <span>{{$t('tokens.collapse.quantity')}}</span>
                    </label>
                    <div class="col-sm-2 pl-2 participar">
                      <input type="number" class="form-control" v-model="checkboxNumber">
                    </div>
                  </div>
                  <div class="form-group row no-gutters participar-wrapper">
                    <div class="col-2 description">&nbsp;</div>
                    <div class="col-sm-10 participar" style="width: 100%">
                      <div class="form-check checkbox">
                        <input type="checkbox" class="form-check-input" v-model="toggle" id='checkbox3' checked>
                        <label class="form-check-label" for='checkbox3'>
                          <span>{{$t('tokens.collapse.msg1')}}
                            <b>
                              <span>{{checkboxNumber * 100 * 2}}</span> TRX</b> {{$t('tokens.collapse.msg2')}}
                            <b>
                              <span>{{checkboxNumber}}</span> TRX</b> {{$t('tokens.collapse.msg3')}}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row no-gutters participar-wrapper">
                    <div class="col-2 description">&nbsp;</div>
                    <div class="col-sm-10 participar">
                      <button class="btn btn-success" :disabled="!(toggle && checkboxNumber > 0)">
                        <span>{{$t('base.confirm')}}</span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </transition>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    /*
       * block list data
       * @type {Array}
       * */
    tokensListData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      /*
         * now data
         * @type {String}
         * */
      nowData: null,
      /*
        * showParticipar
        * @type {Boolean}
        * */
      showParticipar: null,
      /*
        * counted
        * @type {Number}
        * */
      counted: 0,
      /*
        * checkboxNumber
        * @type {Number}
        * */
      checkboxNumber: 0,
      /*
         * toggle
         * @type {Boolean}
         * */
      toggle: false
    };
  },
  computed: {
    ...mapGetters({
      getLogin: "login"
    })
  },
  methods: {
    timestampToTime(timestamp) {
      let date = new Date(timestamp);
      let Y = date.getFullYear() + " ";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      let D = date.getDate() + "/";
      let h =
        date.getMinutes() + 1 < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() + 1 < 10
          ? "0" + date.getMinutes() + " "
          : date.getMinutes() + " ";
      return `${D}${M}${Y}${h}${m}`;
    },
    // showParticipar
    show(index) {
      if (!this.getLogin) {
        this.$router.push({
          path: "/login"
        });
        return;
      }

      this.counted += 1;

      if (this.showParticipar !== null && this.showParticipar !== index) {
        this.counted = 0;
        this.showParticipar = index;
      }

      if (this.showParticipar === null) {
        this.showParticipar = index;
      }

      if (this.counted > 1 && this.showParticipar === index) {
        this.showParticipar = null;
        this.counted = 0;
      }
    },
    // toMoney
    toMoney(num) {
      num = num.toFixed(2);
      num = parseFloat(num);
      num = num.toLocaleString();
      num = num.replace(/,/g, ".");

      return num;
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.col-sm-12 {
  padding: 0;
  color: #fff;
}

.participar-tr {
  background: #f9f9f9;
}

.participar-name {
  width: auto;
  flex: 0 0 75%;
  max-width: 75%;
}

.profile .table > thead > tr > th,
.profile .table > tbody > tr > th,
.profile .table > tfoot > tr > th,
.profile .table > thead > tr > td,
.profile .table > tbody > tr > td,
.profile .table > tfoot > tr > td {
  padding: 21px;
  vertical-align: middle;
  min-width: 100px;
}

.participar-wrapper {
  flex-wrap: wrap;
  display: flex;
  margin-bottom: 1rem;
}

.description {
  min-width: 16.66667%;
}

.thead-dark {
  background: #cd524c;
}

.form-check-label {
  font-weight: normal;
}

.block-list-header {
  background: none;
  border-bottom: 1px solid #efefef;
}

.table-hover > tbody > tr:hover {
  background: none;
}

tr {
  border-bottom: 1px solid #efefef;
}

.profile .table a {
  color: #cd524c;
}

.table > tbody > tr > td {
  border-top: none;
  align-items: center;
}

td {
  color: #6f6f6f;
}

a:hover {
  text-decoration: none;
}

.form-group {
  margin-bottom: 1rem !important;
}

.page-go {
  cursor: pointer;
}

.table-striped > tbody > tr:nth-of-type(odd) {
  background: none;
}

.table {
  margin-bottom: 0;
}

.btn-primary {
  background: #cd524c;
  border-radius: 0.25rem !important;
  border: 1px solid #fff !important;
}

/*.btn-primary:hover {*/
/*color: #52cbca;*/
/*background: #fff;*/
/*border: 1px solid #52cbca;*/
/*}*/

/*.btn-primary-active:hover {*/
/*color: #fff;*/
/*background-image: linear-gradient(270deg, #22e6b8, #00c1ce);*/
/*border: 1px solid #52cbca;*/
/*}*/

.btn-primary-active {
  color: #cd524c;
  background: #fff;
  border-radius: 0.25rem !important;
  border: 1px solid #cd524c !important;
}

.table > tbody + tbody {
  border-top: none;
}

a,
a:active,
a:focus,
a:hover,
button,
button:hover {
  border: none;
}

.table-responsive {
  box-shadow: 0 0 20px 0 #ececec;
}

.container {
  margin: 0;
  padding: 0;
  overflow: auto;
}

.row {
  margin: 0;
}

.item {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 58px;
}

.btn-success {
  color: #cd524c;
  background: #fff;
  border-radius: 0.25rem !important;
  border: 1px solid #cd524c;
}

.btn-success:hover {
  background: #cd524c;
  border: 1px solid #cd524c;
  color: #fff;
}
.item-name {
  font-weight: 700;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
}

@media (min-width: 576px) {
  .col-sm-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .item {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .profile .table > thead > tr > th,
  .profile .table > tbody > tr > th,
  .profile .table > tfoot > tr > th,
  .profile .table > thead > tr > td,
  .profile .table > tbody > tr > td,
  .profile .table > tfoot > tr > td {
    padding: 11px;
    vertical-align: middle;
  }
}

@media (max-width: 576px) {
  .thead-dark {
    display: none;
  }

  .item-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .td {
    display: flex;
  }

  .item {
    display: none !important;
  }

  .profile .table > thead > tr > th,
  .profile .table > tbody > tr > th,
  .profile .table > tfoot > tr > th,
  .profile .table > thead > tr > td,
  .profile .table > tbody > tr > td,
  .profile .table > tfoot > tr > td {
    padding: 7px;
    vertical-align: middle;
  }
}

@media (min-width: 768px) {
  .table-responsive {
    border: none;
  }

  .item {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .profile .table th {
    overflow: hidden;
  }
  .container {
    max-width: 720px;
    overflow-x: scroll;
  }
  .profile .table > thead > tr > th,
  .profile .table > tbody > tr > th,
  .profile .table > tfoot > tr > th,
  .profile .table > thead > tr > td,
  .profile .table > tbody > tr > td,
  .profile .table > tfoot > tr > td {
    padding: 11px;
    vertical-align: middle;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 940px;
    overflow: auto;
  }

  .profile .table > thead > tr > th,
  .profile .table > tbody > tr > th,
  .profile .table > tfoot > tr > th,
  .profile .table > thead > tr > td,
  .profile .table > tbody > tr > td,
  .profile .table > tfoot > tr > td {
    padding: 21px;
    vertical-align: middle;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
    overflow: auto;
  }
}

.checkbox {
  position: relative;
  height: 50px;
}

.checkbox input[type="checkbox"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  opacity: 0;
}

.checkbox label {
  position: absolute;
  left: 30px;
  top: 0;
  height: 20px;
  line-height: 20px;
  padding-left: 0;
}

.checkbox label:before {
  content: "";
  position: absolute;
  left: -30px;
  top: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  border-radius: 50%;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
}

.checkbox label:after {
  content: "";
  position: absolute;
  left: -22px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: 0;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  background: #fff;
  transform: rotate(45deg);
  transition: all 0.3s ease;
}

.checkbox input[type="checkbox"]:checked + label:before {
  background: #cd524c;
  border-color: #cd524c;
}

.checkbox input[type="checkbox"]:checked + label:after {
  background: #cd524c;
}
</style>

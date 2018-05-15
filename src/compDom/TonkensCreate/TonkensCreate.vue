<template>
  <div>
    <div class="card">
      <div class="card-header bg-dark text-white text-center">
        <span>{{$t('tokens.create.title')}}</span>
      </div>
      <div class="card-body">
        <fieldset>
          <legend class="details">
            <span>{{$t('tokens.create.detail')}}</span>
          </legend>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>{{$t('tokens.create.name')}}</label>
              <div>
                <input type="text" name="name" class="form-control" v-model="tokenName">
              </div>
            </div>
            <div class="form-group col-md-6">
              <label>{{$t('tokens.create.supply')}}</label>
              <div>
                <input type="number" name="totalSupply" class="form-control"
                       :class="{'is-invalid': totalSupply < 1}"
                       v-model="totalSupply">
                <span class="invalid-feedback" v-show="totalSupply < 1">{{$t('tokens.create.supplyalert')}}</span>
              </div>
              <small class="form-text text-muted">
                <span>{{$t('tokens.create.supplymsg')}}</span>
              </small>
            </div>
          </div>
          <!--Description-->
          <div class="form-row">
            <div class="form-group col-md-12">
              <label>{{$t('tokens.create.desc')}}</label>
              <div>
                <input type="text" name="description" class="form-control"
                       :class="{'is-invalid': noDescription}"
                       v-model="description">
                <span class="invalid-feedback" v-show="noDescription">{{$t('tokens.create.descalert')}}</span>
              </div>
              <small class="form-text text-muted">
                <span>{{$t('tokens.create.descmsg')}}</span>
              </small>
            </div>
          </div>
          <!--url-->
          <div class="form-row">
            <div class="form-group col-md-12">
              <label>{{$t('tokens.create.url')}}</label>
              <div>
                <input type="text" name="url" class="form-control "
                       :class="{'is-invalid':urlError}"
                       v-model="checkUrl">
                <span class="invalid-feedback" v-show="urlError">{{$t('tokens.create.urlalert')}}</span>
              </div>
              <small class="form-text text-muted">
                <span>{{$t('tokens.create.urlmsg')}}</span>
              </small>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <span>{{$t('tokens.create.rate')}}</span>
          </legend>
          <div class="form-row text-muted">
            <p class="col-md-12">
                <span>
                  {{$t('tokens.create.ratemsg1')}}
                </span>
            </p>
            <p class="col-md-12">
              <span>{{$t('tokens.create.ratemsg2')}}<b><span>{{num}}</span> <span>{{tokenName !== '' ? tokenName : 'Token'}}</span></b>{{$t('tokens.create.ratemsg3')}}<b><span>{{trxNum}}</span> {{$t('tokens.create.ratemsg4')}}</b></span>
            </p>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>{{$t('tokens.create.trxaxmount')}}</label>
              <div>
                <input type="number" name="trxNum" class="form-control"
                       :class="{'is-invalid':trxNum < 0}"
                       v-model="trxNum">
                <span class="invalid-feedback" v-show="trxNum < 0">{{$t('tokens.create.trxaxmountalert')}}</span>
              </div>
            </div>
            <div class="form-group col-md-6"><label>{{$t('tokens.create.tokenamount')}}</label>
              <div>
                <input type="number" name="num" class="form-control"
                       :class="{'is-invalid':num < 0}"
                       v-model="num">
                <span class="invalid-feedback" v-show="num < 0">{{$t('tokens.create.tokenamountalert')}}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <p class="col-md-12" style="font-size: 16px">
              <b><span>{{$t('tokens.create.tokenprice1')}}</span></b>: 1 <span
              style="font-weight: 700;">{{tokenName !== '' ? tokenName : 'Token'}}</span>
              = <span>{{(trxNum / num).toFixed(3) === 'Infinity' ? '∞' : (trxNum / num).toFixed(3)}}</span>
              {{$t('tokens.create.tokenprice2')}}
            </p>
          </div>
        </fieldset>
        <!--Participation-->
        <fieldset>
          <legend>
            <span>{{$t('tokens.create.part')}}</span>
          </legend>
          <div class="form-row text-muted">
            <p class="col-md-12">
                <span>{{$t('tokens.create.partmsg')}}<b>{{tokenName||' ??'}}</b> tokens</span>
            </p>
          </div>
          <div class="form-row">
            <!--Start Date-->
            <div class="form-group col-md-6">
              <label>{{$t('tokens.create.startdate')}}</label>
              <div>
                <input type="datetime-local"
                       max="9999-12-31T23:59"
                       name="startTime"
                       v-model="startDate"
                       :class="{'is-invalid': new Date(startDate).getTime() < new Date(currentDate).getTime()}"
                       class="form-control datetime-local">
                <span class="invalid-feedback" v-show="new Date(startDate).getTime() < new Date(currentDate).getTime()">{{$t('tokens.create.startdatemsg')}}</span>
              </div>
            </div>
            <!--End Date-->
            <div class="form-group col-md-6">
              <label>{{$t('tokens.create.enddate')}}</label>
              <div>
                <input type="datetime-local" max="9999-12-31T23:59" name="endTime"
                       v-model="endDate"
                       :class="{'is-invalid': new Date(endDate).getTime() < new Date(startDate).getTime()}"
                       class="form-control datetime-local">
                <span class="invalid-feedback" v-show="new Date(endDate).getTime() < new Date(startDate).getTime()">{{$t('tokens.create.enddatemsg')}}</span>
              </div>
            </div>
          </div>
        </fieldset>
        <div class="form-group">
          <div class="form-check">
            <div class='checkbox'>
              <input type="checkbox" name="confirmed" v-model="checkbox" class="form-check-input" id='checkbox3'
                     checked>
              <label for='checkbox3' class="form-check-label">{{$t('tokens.create.confirmmsg')}}</label>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button type="submit"
                  class="btn btn-success"
                  :disabled="!(!urlError &&
                                (tokenName !== '') &&
                                (description !== '') &&
                                (totalSupply > 0) &&
                                (trxNum > 0) &&
                                (num > 0) &&
                                !(new Date(startDate).getTime() < new Date(currentDate).getTime()) &&
                                !(new Date(endDate).getTime() < new Date(startDate).getTime()) &&
                                checkbox
                                )"
          ><span>{{$t('tokens.create.issue')}}</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        /*
         * urlError
         * @type {Boolean}
         * */
        urlError: false,
        /*
         * trxNum
         * @type {Number}
         * */
        trxNum: 1,
        /*
         * trxNum
         * @type {Number}
         * */
        num: 1,
        /*
         * totalSupply
         * @type {Number}
         * */
        totalSupply: 100000,
        /*
         * checkUrl
         * @type {String}
         * */
        checkUrl: 'http://',
        /*
         * startDate
         * @type {String}
         * */
        startDate: '',
        /*
         * endDate
         * @type {String}
         * */
        endDate: '',
        /*
         * currentDate
         * @type {String}
         * */
        currentDate: '',
        /*
         * tokenName
         * @type {String}
         * */
        tokenName: '',
        /*
         * description
         * @type {String}
         * */
        description: '',
        /*
         * noDescription
         * @type {Boolean}
         * */
        noDescription: false,
        /*
         * checkbox
         * @type {Boolean}
         * */
        checkbox: false
      }
    },
    mounted () {
      // set time
      setTimeout(() => {
        this.timestampToTime(new Date().getTime())
      }, 60)
    },
    methods: {
      // set time
      timestampToTime(timestamp) {
        let date = new Date(timestamp);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let endM = (date.getMonth() + 4 < 10 ? '0' + (date.getMonth() + 4) : date.getMonth() + 4) + '-';
        let D = date.getDate() + 'T';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();

        this.startDate = `${Y}${M}${D}${h}${m}${s}`
        this.endDate = `${Y}${endM}${D}${h}${m}${s}`
        this.currentDate = `${Y}${M}${D}${h}${m}${s}`
      }
    },
    watch: {
      checkUrl (url) {
        let regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/i;

        if (regex.test(url)) {
          this.urlError = false
        }
        else {
          this.urlError = true
        }
      },
      num (data) {
        console.log(data === '')
        if (data === '') {
          this.num = 0
        }
      },
      trxNum (data) {
        if (data === '') {
          this.trxNum = 0
        }
      },
      totalSupply (data) {
        if (data === '') {
          this.totalSupply = 0
        }
      },
      description (data) {

        if (data === '') {
          this.noDescription = true
        }
        else {
          this.noDescription = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .col-sm-8 {
    padding: 0;
    width: 100%;
  }

  .form-control {
    height: 50px;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 50px;
  }

  .text-muted {
    font-size: 16px;
  }

  label {
    font-size: 16px;
  }

  .form-check-label {
    margin-bottom: 0px;
  }

  .card-header:first-child {
    background: #cd524c;
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
  }

  .card-body {
    flex: 1 1 auto;
  }

  legend, .form-group, .text-center {
    padding: 1.25rem;
  }

  legend {
    color: #cd524c;
  }

  .form-group {
    margin: 0;
  }

  .invalid-feedback {
    color: #dc3545;
  }

  .was-validated .form-control:invalid:focus, .form-control.is-invalid:focus, .was-validated .custom-select:invalid:focus, .custom-select.is-invalid:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.2)
  }

  .btn-success {
    background: #cd524c;
    border: none;
    box-shadow: 0 0 20px 0 #ececec, 0 0 20px 0 #ececec;
    border-radius: 40px !important;
    padding: 12px 27px;
  }

  .datetime-local::-webkit-calendar-picker-indicator {
    color: #cd524c;
  }

  .datetime-local::-webkit-calendar-picker-indicator:hover {
    background: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button,
  input::-webkit-clear-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .checkbox {
    position: relative;
    height: 30px;
  }

  .checkbox input[type='checkbox'] {
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
    content: '';
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
    content: '';
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

  .checkbox input[type='checkbox']:checked + label:before {
    background: #cd524c;
    border-color: #cd524c;
  }

  .checkbox input[type='checkbox']:checked + label:after {
    background: #cd524c;
  }
</style>

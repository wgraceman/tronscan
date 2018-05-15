<template>
  <div>
    <div class="block-list-wrapper">
      <div class="table-responsive">
        <table class="table table-hover" v-show="delegateListData.length > 0">
          <!--list-header-->
          <thead>
            <tr class="block-list-header">
              <th>#</th>
              <th>{{$t('delegateList.name')}}</th>
              <th>{{$t('delegateList.addr')}}</th>
              <th>{{$t('delegateList.lastBlock')}}</th>
              <th>{{$t('delegateList.blockProduced')}}</th>
              <th>{{$t('delegateList.blockMissed')}}</th>
              <th>{{$t('delegateList.votes')}}</th>
            </tr>
          </thead>
          <!--list-content-->
          <tbody class="block-list-tbody">
            <tr v-for="(item,index) in delegateListData" :key="index">
              <td>{{index + 1}}</td>
              <td>
                <div class="td-name" @click="voteFor(index)">{{item.url}}

                </div>
              </td>
              <td>{{item.address}}</td>
              <td>{{item.latestBlockNumber}}</td>
              <td>{{item.producedTotal}}</td>
              <td>{{item.missedTotal}}</td>
              <td>{{item.votes}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container content dialog" v-if="showDialog">
      <div class="row">
        <div class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 ">
          <form class="reg-page sky-form">
            <div class="reg-header">
              <h5 class="text-center">{{$t('delegateList.dialog.title1')}}
                <em style="font-size:20px">{{votes}}</em> {{$t('delegateList.dialog.title2')}}</h5>
            </div>
            <div class="row text-center">

              <h3 style="word-break: break-word;">{{chosenDelegate.address}}</h3>
              <h3>{{chosenDelegate.url}}</h3>
              <div class="input margin-bottom-20">
                <input class="form-control" type="number" v-model="voteAmount">
              </div>
              <br>
              <div class="row">
                <button class="btn btn-default pull-left" @click.prevent="cancel">{{$t('base.cancel')}}</button>
                <button class="btn-u pull-right"  :disabled="submitDisabled" @click.prevent="submit">{{$t('base.submit')}}</button>
              </div>
            </div>
            <div align="center">
              <div class="g-recaptcha" data-sitekey="6Le1YycTAAAAAJXqwosyiATvJ6Gs2NLn8VEzTVlS"></div>
            </div>
            <hr>
            <h4>{{$t('base.instruction')}}</h4>
            <p>{{$t('delegateList.dialog.ins')}}</p>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from "vuex";

export default {
  async mounted() {
    await this.refreshTokenBalances();
  },
  props: {
    /*
       * block list data
       * @type {Array}
       * */
    delegateListData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      showDialog: false,
      chosenDelegate: {
        address: "",
        url: ""
      },
      voteAmount: 0
    };
  },
  methods: {
    ...mapActions(["refreshTokenBalances"]),
    voteFor(index) {
      if (!this.loginStatus) {
        this.$router.push("/error?msg=login");
      }
      this.chosenDelegate = this.delegateListData[index];
      this.showDialog = true;
    },
    cancel() {
      this.showDialog = false;
    },
    submit() {
      
    }
  },
  computed: {
    ...mapGetters(["loginStatus", "votes"]),
    submitDisabled() {
      return this.voteAmount < 0 || this.voteAmount > this. votes
    }
  }
};
</script>

<style scoped lang="scss">
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: rgba(1, 1, 1, 0.1);
  overflow: auto;
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
}
td {
  color: #6f6f6f;
}

.td-name {
  color: #cd524c;
  cursor: pointer;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
}

a:hover {
  text-decoration: none;
}

.page-go {
  cursor: pointer;
}

@media (max-width: 767px) {
  .table-responsive {
    border: none;
  }
}

.table-responsive {
  box-shadow: 0 10px 6px -6px #bbb;
}
</style>

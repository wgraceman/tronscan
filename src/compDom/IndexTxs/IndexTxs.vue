<template>
  <div class="col-sm-12 sm-margin-bottom-20">
    <div class="panel panel-profile no-bg">
      <div class="panel-heading overflow-h">
        <h2 class="panel-title heading-sm pull-left">
          Transactions</h2>
        <a href="/block" class=" pull-right">View All ></a>
      </div>
      <!-- <div id="scrollbar2" class="panel-body no-padding mCustomScrollbar _mCS_1 mCS-autoHide" data-mcs-theme="minimal-dark" style="height: 580px; position: relative; overflow: visible;">

      </div> -->
      <div class="row" >
        <div class=" loading"  v-if="txListData.length === 0">
          <!--loading-->
          <div align="center">
            <img src="/static/loader.gif" alt="Showing">
            <p>loading...</p>
          </div>

        </div>
      </div>
      <div class="block-list">
        <tx-list :blockListData="txListData"></tx-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TxList from "compDom/TxList/TxList";

export default {
  data() {
    return {
      txListData: []
    };
  },
  computed: {
    ...mapState("blockchain", {
      allTransactions: "transactions"
    })
  },
  methods: {
    
  },
  watch: {
    allTransactions(txList) {
      //  set ajax block list data ok
      this.txListData = txList.slice(0, 7);
    }
  },
  components: {
    TxList
  }
};
</script>


<style lang="scss" scoped>
.profile .panel-profile.no-bg {
  box-shadow: 0 0 20px 0 #ececec !important;
}

b {
  font-weight: normal;
}

.profile .panel-heading {
  border-bottom: 1px solid #efefef;
}

.profile-event {
  border-bottom: 1px solid #efefef;
  margin-bottom: 0;
}

.profile .date-formats {
  background-image: linear-gradient(to left, #22e6b8, #00c1ce);
}
</style>

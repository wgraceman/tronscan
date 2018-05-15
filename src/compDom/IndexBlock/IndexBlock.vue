<template>
  <div class="col-sm-12 sm-margin-bottom-20">
    <div class="panel panel-profile no-bg">
      <div class="panel-heading overflow-h">
        <h2 class="panel-title heading-sm pull-left">
          {{$t('indexBlock.name')}}</h2>
        <!-- <router-link to="/blocks" class=" pull-right">{{$t('indexBlock.all')}} ></router-link> -->
      </div>
      <!-- <div id="scrollbar2" class="panel-body no-padding mCustomScrollbar _mCS_1 mCS-autoHide" data-mcs-theme="minimal-dark" style="height: 180px; position: relative; overflow: visible;">
        
      </div> -->
      <div class="block-list">
        <div class="loading" v-if="blockListData.length === 0">
          <!--loading-->
          <div align="center">
            <img src="/static/loader.gif" alt="Showing">
            <p>{{$t('base.loading')}}</p>
          </div>
        </div>
        <block-list :blockListData="blockListData"></block-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BlockList from "compDom/BlockList/BlockList";

export default {
  data() {
    return {
      blockListData: []
    };
  },
  mounted() {
    // ajax block data
    this.getBlocksAjax(7);
  },
  computed: {
    ...mapState("blockchain", {
      getBlocks: "blocks"
    })
  },
  methods: {
    ...mapActions("blockchain", {
      getBlocksAjax: "getBlocks"
    })
  },
  watch: {
    getBlocks(blockList) {
      //  set ajax block list data ok

      this.blockListData = blockList;
    }
  },
  components: {
    BlockList
  }
};
</script>


<style lang="scss" scoped>
.profile .panel-heading {
  border-bottom: 1px solid #efefef;
}

.profile-event {
  border-bottom: 1px solid #efefef;
  margin-bottom: 0;
}
</style>

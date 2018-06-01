<template>
  <div class="col-sm-12 sm-margin-bottom-20">
    <div class="panel panel-profile no-bg">
      <div class="panel-heading overflow-h">
        <h2 class="panel-title heading-sm pull-left">
          {{$t('indexBlock.name')}}</h2>
      </div>
      <div class="block-list">
        <loader v-if="!blocks"></loader>
        <block-list class="data-list" :blockListData="blocks.data"></block-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BlockList from "compDom/BlockList/BlockList";
import Loader from 'compUI/Loader/Loader';

export default {
  async created() {
    // ajax block data
    this.getBlocks(this.query);
  },
  data() {
    return {
      query: {
        sort: '-number',
        limit: 15,
        order: '-timestamp'
      }
    };
  },
  computed: {
    ...mapGetters({
      blocks: "blockchain/allBlocks" 
    })
  },
  methods: {
    ...mapActions("blockchain", [
      "getBlocks"
    ])
  },
  components: {
    BlockList,
    Loader
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

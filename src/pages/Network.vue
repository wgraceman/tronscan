<template>
  <div class="profile container " style="margin-top: 0px">
    <div class="row">
      <div>
        <div class="profile-body">
          <div align="left" id="divadvert" style="margin-bottom: 11px; margin-top: -10px;">
            <span id="ContentPlaceHolder1_litIBannerAdd"><br></span>
          </div>

          <index-brief></index-brief>
          <div id="ContentPlaceHolder1_mainboxes" class="row margin-bottom-10">
            <index-chart></index-chart>
            <index-pie></index-pie>
          </div>
          <br>
          <div class="row margin-bottom-40">
            <index-block></index-block>
          </div>
          <div class="row margin-bottom-40">
            <index-txs></index-txs>
          </div>
          <span id="ContentPlaceHolder1_lblDefConModeContent"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import IndexBrief from "compDom/IndexBrief/IndexBrief.vue";
import IndexChart from "compDom/IndexChart/IndexChart.vue";
import IndexPie from "compDom/IndexChart/IndexPie.vue";
import IndexBlock from "compDom/IndexBlock/IndexBlock.vue";
import IndexTxs from "compDom/IndexTxs/IndexTxs.vue";

export default {
  name: "index",
  components: {
    IndexBrief,
    IndexChart,
    IndexBlock,
    IndexTxs,
    IndexPie
  },
  mounted() {
    this.initScrollBar();
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: mapGetters({
    witnesses: "allWitnesses",
    nodes: "allNodes",
    tokens: "allTokens",
    currentBlock: "currentBlock"
  }),
  methods: {
    ...mapActions([
      "getAllWitnesses",
      "getAllNodes",
      "getAllTokens",
      "getBlockByNumber"
    ]),
    initScrollBar() {
      jQuery(".mCustomScrollbar").mCustomScrollbar({
        theme: "minimal",
        scrollInertia: 300,
        scrollEasing: "linear"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

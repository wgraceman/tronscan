<template>
  <div>
    <div id="ContentPlaceHolder1_mainboxes" class="row margin-bottom-20">
      <div class="col-lg-4 md-margin-bottom-20">
        <div class="service-block-v3 service-block-red border-1">
          <i class="fa fa-dollar" style="margin-right:16px"></i>
          <span class="service-heading" rel="tooltip" data-placement="right" title="" data-original-title="View More">
            <font size="2" color="white">{{$t('indexBrief.price')}}</font>
          </span>
          <h4 style="margin-top:2px">
            <font color="white">
              <font color="white">
                ${{numberWithCommas(priceUsd)}}
                <font size="2">{{$t('indexBrief.usd')}}</font>
                <font :color="percentChangeColor" size="2"> (
                  {{percentChange+'%'}})</font>
              </font>
            </font>
          </h4>
        </div>
      </div>
      <div class="col-lg-4 md-margin-bottom-20">
        <div class="service-block-v3 service-block-red border-2">
          <i class="fa fa-sitemap" style="margin-right:16px"></i>
          <span class="service-heading">
            <font size="2" color="white">{{$t('indexBrief.randv')}}</font>
          </span>
          <h4 style="margin-top:2px">
            <font color="white">
              <font color="white">
                {{representatives.length}}
                <font size="2">
                  / {{numberWithCommas(mostVost)}} TRX
                </font>
              </font>
            </font>
          </h4>
        </div>
      </div>
      <div class="col-lg-4 md-margin-bottom-20">
        <div class="service-block-v3 service-block-red border-3">
          <i class="fa fa-line-chart" style="margin-right:16px"></i>
          <span class="service-heading" rel="tooltip" data-placement="right" title="" data-original-title="View More">
            <font size="2" color="white">{{$t('indexBrief.rank')}}</font>
          </span>
          <h4 style="margin-top:2px">
            <font color="white">
              <font color="white">
                #{{rank}}
              </font>
            </font>
          </h4>
        </div>
      </div>
    </div>

    <div id="ContentPlaceHolder1_mainboxes" class="row margin-bottom-20">
      <div class="col-md-4 md-margin-bottom-20">
        <div class="service-block-v3 service-block-red border-4">
          <i class="fa fa-cubes" style="margin-right:16px"></i>
          <span class="service-heading" rel="tooltip" data-placement="right" title="" data-original-title="View More">
            <font size="2" color="white">{{$t('indexBrief.height')}}</font>
          </span>
          <h4 style="margin-top:2px">
            <font color="white">
              <font color="white">
                {{numberWithCommas(lastBlockNumber)}}
              </font>
            </font>
          </h4>
        </div>

      </div>

      <div class="col-md-4 md-margin-bottom-20">
        <div class="service-block-v3 service-block-red border-5">
          <i class="fa fa-users" style="margin-right:16px"></i>
          <span class="service-heading" rel="tooltip" data-placement="right" title="" data-original-title="View More">
            <font size="2" color="white">{{$t('indexBrief.holders')}}</font>
          </span>
          <h4 style="margin-top:2px">
            <font color="white">
              <font color="white">
                {{numberWithCommas(accountsNumber)}}
              </font>
            </font>
          </h4>
        </div>
      </div>
      <div class="col-md-4 md-margin-bottom-20">
        <div class="service-block-v3 service-block-red border-6">
          <i class="fa fa-globe" style="margin-right:16px"></i>
          <span class="service-heading" rel="tooltip" data-placement="right" title="" data-original-title="View More">
            <font size="2" color="white">{{$t('indexBrief.cap')}}</font>
          </span>
          <h4 style="margin-top:2px">
            <font color="white">
              <font color="white">
                ${{computedCap}} {{$t('indexBrief.billion')}}
              </font>
            </font>
          </h4>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {numberWithCommas} from "@/utils/helpers";

export default {
  async mounted() {
    await this.getTronBrief();
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      marketCapUsd: "marketCapUsd",
      priceUsd: "priceUsd",
      priceBtc: "priceBtc",
      rank: "rank",
      percentChange: "percentChange",
      representatives: "allWitnesses",
      lastBlock: "blockchain/lastBlock",
      accounts: "blockchain/allAccounts",
    }),
    computedCap(){
      return (this.$i18n.locale === 'en' ? this.marketCapUsd * 1 : this.marketCapUsd * 10).toFixed(3)
    },
    percentChangeColor() {
      return this.percentChange > 0 ? "#0ADC00" :"#ffcc00";
    },
    mostVost() {
      return this.representatives[0] && this.representatives[0].votes
    },
    lastBlockNumber() {
      return this.lastBlock.number ? this.lastBlock.number : "0"
    },
    accountsNumber() {
      return this.accounts.length ? this.accounts.length : "0"
    }
  },
  methods: {
    ...mapActions(["getTronBrief"]),
    numberWithCommas(n){
      if(n){
        return numberWithCommas(n)
      }else{
        return ""
      }
    }
  }
};
</script>

<style lang="scss">
.service-block-red {
  box-shadow: 0 10px 6px -6px #bbb;
  min-height: 100px;
  &.border-2,
  &.border-4,
  &.border-6 {
    background: #808080;
  }
}
</style>



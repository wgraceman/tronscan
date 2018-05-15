<template>
  <div class="profile container " style="margin-top: 5px">
    <br>
    <!--block list-->
    <div class="row">
      <div class="col-md-8">
        <div class=" block-list">
          <tonkens-create></tonkens-create>
        </div>
      </div>
      <div class="posts col-md-4">
        <div class="headline headline-md margin-bottom-20">
          <h4>
            {{$t('tokens.create.inst')}}</h4>
        </div>
        <div id="owl-demo">
          <div class="item">
            <p>
              {{$t('tokens.create.inst1')}}
            </p>
            <p>
              {{$t('tokens.create.inst2')}}
            </p>
            <p>
              {{$t('tokens.create.inst3')}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapState, mapGetters } from "vuex";
// TonkensCreate
import TonkensCreate from "@/compDom/TonkensCreate/TonkensCreate";
// Loader
import Loader from "compUI/Loader/Loader";

export default {
  data() {
    return {
      /*
         * Tokens list data
         * @type {Array}
         * */
      tokensListData: [],
      /*
         * iscomponent
         * @type {String}
         * */
      component: "TonkensList"
    };
  },
  created() {
    // ajax Tokens data
    this.getAllTokens();
  },
  computed: {
    ...mapGetters({
      getPageRouter: "pageRouter"
    }),
    ...mapState("tokens", {
      getTokens: "tokens"
    })
  },
  methods: {
    ...mapActions("tokens", {
      getAllTokens: "getAllTokens"
    })
  },
  watch: {
    getTokens(tokensList) {
      this.tokensListData = tokensList;
    },
    getPageRouter(router) {
      if (router === "create") {
        this.component = "TonkensCreate";
      } else {
        this.component = "TonkensList";
      }
    }
  },
  components: {
    TonkensCreate
  }
};
</script>

<style scoped lang="scss">
.fa-pulse {
  display: inline-block;
}

.page-txt {
  padding: 2px 4px 4px 3px;
  border: 1px solid #d4d4d4;
  line-height: 30px;
  background-color: #eaeaea;
  margin-top: 2px;
  height: 2px;
}

.fa-pulse {
  color: #192330;
}

.row {
  position: relative;
  margin: 0;
}

.block-list {
  box-shadow: 0 0 20px 0 #ececec;
  min-height: 523px;
  margin-bottom: 30px;
}

.loading {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  padding-top: 15%;
  width: 100%;
  min-height: 523px;
  text-align: center;
  z-index: 100;
}

.col-md-6 {
  width: 100%;
}

.container {
  min-height: 610px;
}

.pagination {
  display: flex;
  float: right;
  margin-top: 10px;
  margin-right: 20px;
}

@media (max-width: 1200px) {
  .pagination {
    margin: 10px auto 0;
    float: none;
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
  }
}

.pagination .page-item:first-child {
  margin-right: 15px;
}

.pagination .page-item {
  position: relative;
  margin: 0 6px;
  min-width: 14px;
  display: flex;
  justify-content: center;
}

.pagination .page-item .page-link {
}

.page-item:first-child .page-link {
  margin-left: 0;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.pagination .page-item .page-link {
  position: relative;
  display: block;
  margin-left: -1px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  color: #6f6f6f;
  padding: 0;
  border: none !important;
  background: none !important;
  cursor: pointer;
}

.no-click {
  cursor: default !important;
}

.pagination .page-item {
  position: relative;
  margin: 0 6px;
  min-width: 14px;
  &.active:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 2.5px;
    right: 0;
    height: 2px;
    background-image: linear-gradient(270deg, #22e6b8, #00c1ce);
  }
}

@media (min-width: 992px) {
  .container {
    min-height: 523px;
  }
}

@media (min-width: 1200px) {
  .container {
    min-height: 523px;
  }
}

@media (max-width: 767px) {
  .hidden-xs {
    display: inherit;
  }
  .container {
    min-height: 523px;
  }
}

@media (min-width: 768px) {
  .container {
    min-height: 523px;
  }
}
</style>

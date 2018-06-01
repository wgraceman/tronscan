<template>
  <div>
    <div class="block-list-wrapper">
      <div class="table-responsive">
        <table class="table table-hover" v-show="transListData.length > 0">
          <!--list-header-->
          <thead>
            <tr class="block-list-header">
              <th>{{$t('transList.created')}}</th>
              <th>{{$t('transList.hash')}}</th>
              <th>{{$t('transList.type')}}</th>
            </tr>
          </thead>
          <!--list-content-->
          <tbody class="block-list-tbody">
            <tr v-for="item in transListData" :key="item.number">
              <td>
                <span rel="tooltip" data-placement="bottom" :data-original-title="new Date (item.time)" class="timestampToTime">{{timestampToTime(item.timestamp)}}</span>
              </td>
              <td>
                <a class="page-go" @click="$router.push('/transactions/'+item.hash)">{{item.hash}}</a>
              </td>
              <td>
                {{parseTransType(item.contractType)}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from "vuex";
import commaNumber from "@/utils/mixins/commaNumber";

export default {
  props: {
    /*
       * block list data
       * @type {Array}
       * */
    transListData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  mixins: ["commaNumber"],
  methods: {
    parseTransType(type) {
      switch (type) {
        case 1:
          return this.$t("transList.type1");
          break;
        case 11:
          return this.$t("transList.type11");
          break;
        case 4:
          return this.$t("transList.type4");
          break;
        default:
          return this.$t("transList.typeDefault");
          break;
      }
    },
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
    // go blockIF
    goBlockIn(blockNumber) {
      this.$router.push({
        path: `/blocks/${blockNumber}`
      });

      // get block If
      this.getBlockInformation(item);
    },
    ...mapActions("blockchain", {
      /*
        * get block If
        * @type {Object}
        * */
      getBlockInformation: "blockInformation"
    })
  }
};
</script>

<style scoped lang="scss">
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
  box-shadow: 0 0 20px 0 #ececec;
}
</style>

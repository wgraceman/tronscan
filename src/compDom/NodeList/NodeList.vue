<template>
  <div>
    <div class="block-list-wrapper">
      <div class="table-responsive">
        <table class="table table-hover" v-show="nodeListData.length > 0">
          <!--list-header-->
          <thead>
            <tr class="block-list-header">
              <th>#</th>
              <th>{{$t('nodes.region')}}</th>
              <th>{{$t('nodes.nodes')}}</th>
              <!-- <th>Parenthash</th> -->
            </tr>
          </thead>
          <!--list-content-->
          <tbody class="block-list-tbody">
            <tr v-for="(item,index) in nodeListData" :key="index">
              <td>{{index + 1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.total}}</td>
              <!-- <td class="address-tag"><a>{{item.parentHash}}</a></td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from "vuex";

export default {
  props: {
    /*
       * block list data
       * @type {Array}
       * */
    nodeListData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
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
    goBlockIn(item) {
      this.$router.push({
        path: `/block/${item.number}`
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
  box-shadow: 0 10px 6px -6px #bbb;
}
</style>

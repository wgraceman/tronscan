<template>
  <div class="profile container " style="margin-top: 5px">
    <br>
    <!--block list-->
    <div class="row block-list">
      <div align="center" style="height: 500px; margin-top:200px" v-if="!mapLoaded">
        <img src="/static/loader.gif" alt="Showing">
        <p>{{$t('base.loading')}}</p>
      </div>
      <div class="col-md-4 nodelist">
        <!-- <img src="/static/loader.gif" alt="Showing">
          <p>loading...</p>
         -->
        <!-- <ul>
          <li v-for="(node,index) in joinedNodes" :key="index">
            {{node.name}}
          </li>
        </ul> -->
        <node-list :nodeListData="joinedNodes">

        </node-list>
      </div>
      <div class="col-md-8">
        <div id="container" style="height: 500px; min-width: 310px; max-width: 800px; margin: 0 auto"></div>
      </div>

    </div>
    <br><br>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from "vuex";
//  blocklist
import NodeList from "compDom/NodeList/NodeList";
import Highcharts from "highcharts/highmaps";
import proj4 from "proj4";
import map from "@/plugins/world";
import mapTheme from "@/plugins/mapTheme";

export default {
  created() {},
  async mounted() {
    await this.getAllNodes();
    this.initMap();
    this.mapLoaded = true;
  },
  data() {
    return {
      mapLoaded: false
    };
  },
  computed: {
    ...mapGetters({
      nodes: "allNodes"
    }),
    filteredNodes() {
      return this.nodes.filter(node => {
        return node.city !== "null";
      });
    },
    joinedNodes() {
      let nodesByCountry = {};
      for (let node of this.filteredNodes) {
        if (!nodesByCountry[node.country]) {
          nodesByCountry[node.country] = {
            name: node.country,
            nodes: [],
            total: 0
          };
        }
        nodesByCountry[node.country].nodes.push(node);
        nodesByCountry[node.country].total += node.count;
      }

      let countries = Object.values(nodesByCountry);
      countries = countries.sort((a, b) => a.total - b.total);
      countries.reverse();     
      return countries;
    }
  },
  methods: {
    // nextPage
    ...mapActions(["getAllNodes"]),
    initMap() {
      let mapData = Highcharts.geojson(map);

      let data = this.filteredNodes.map(node => {
        let [x, y] = this.lonlatToXY(node.longitude, node.latitude);
        return {
          x: x,
          y: y,
          city: node.city,
          z: node.count,
          country: node.country
        };
      });
      Highcharts.setOptions({
        chart: {
          style: {
            fontFamily: "Helvetica Neue"
          }
        },
        credits: {
          enabled: false
        }
      });
      Highcharts.mapChart("container", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          spacing: [10, 0, 0, 0]
        },
        title: {
          text: this.$t('nodes.mapTitle')
        },
        legend: {
          enabled: false
        },
        mapNavigation: {
          enabled: false
        },
        series: [
          {
            name: "Countries",
            mapData: mapData,
            color: "#E0E0E0",
            enableMouseTracking: false
          },
          {
            type: "mapbubble",
            name: "Count",
            data: data,
            minSize: 4,
            maxSize: "12%",
            color: "#cd524c",
            tooltip: {
              pointFormat: "{point.country}-{point.city},{point.z} nodes"
            }
          }
        ]
      });
    },
    lonlatToXY(lon, lat) {
      let transform = {
        crs:
          "+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +datum=WGS84 +units=m +no_defs",
        scale: 0.0000172182781654,
        jsonres: 15.5,
        jsonmarginX: -999,
        jsonmarginY: 9851,
        xoffset: -19495356.3693,
        yoffset: 12635908.1982
      };
      if (typeof lon === "string") {
        lon = parseFloat(lon);
      }

      if (typeof lat === "string") {
        lat = parseFloat(lat);
      }

      var projected = proj4(transform.crs, [lon, lat]),
        cosAngle =
          transform.cosAngle ||
          (transform.rotation && Math.cos(transform.rotation)),
        sinAngle =
          transform.sinAngle ||
          (transform.rotation && Math.sin(transform.rotation)),
        rotated = transform.rotation
          ? [
              projected[0] * cosAngle + projected[1] * sinAngle,
              -projected[0] * sinAngle + projected[1] * cosAngle
            ]
          : projected;
      return [
        parseInt(
          ((rotated[0] - (transform.xoffset || 0)) * (transform.scale || 1) +
            (transform.xpan || 0)) *
            (transform.jsonres || 1) +
            (transform.jsonmarginX || 0)
        ),
        parseInt(
          (((transform.yoffset || 0) - rotated[1]) * (transform.scale || 1) +
            (transform.ypan || 0)) *
            (transform.jsonres || 1) -
            (transform.jsonmarginY || 0)
        )
      ];
    }
  },
  components: {
    NodeList
  },
  watch: {
    ['$i18n.locale']() {
      this.initMap()
    }
  }
};
</script>

<style scoped lang="scss">
.nodelist {
  border: 1px solid #f7f7f7;
  height: 500px;
  overflow: auto;
}
</style>

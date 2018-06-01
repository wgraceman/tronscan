<template>
  <div class="col-sm-6">

    <div class="tag-box tag-box-v2 box-shadow shadow-effect-1" style="border-right-color: rgb(128, 128, 128); border-right-style: solid; border-right-width: 2px; margin-bottom: 0px; background-color: #FFFFFF;border-left: none;" >
      <div id="container-pie" style="min-width: 255px; height: 200px; margin: 0 auto"></div>
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import { mapGetters, mapActions } from "vuex";

export default {
  async mounted() {
    await this.getAllWitnesses();
    this.initChart();
  },
  computed: {
    ...mapGetters({
      witnesses: "allWitnesses"
    })
  },
  methods: {
    ...mapActions([
      "getAllWitnesses"
    ]),
    initChart() {
      if (this.witnesses.length <= 0) {
        return;
      }
      
      let witnesses = this.witnesses.sort(this.down);
      let totalVotes = witnesses.reduce((p, c) => {
        return (p += c.votes);
      }, 0);
      // console.log('xx: ', witnesses)
      let curVotes = 0;
      let data = [];
      let length = Math.min(10, witnesses.length);
      for (let i = 0; i < length; i++) {
        let w = witnesses[i];
        data.push([
          w.url
            .replace("https://", "")
            .replace("http://", "")
            .split("/")[0],
          w.votes
        ]);
        curVotes += w.votes;
      }
      data.push(["OTHERS", totalVotes - curVotes]);
      let chart = null;
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
      Highcharts.chart(
        "container-pie",
        {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            spacing: [0, 0, 0, 0]
          },
          title: {
            text: this.$t('pieChart.title')
          },
          tooltip: {
            pointFormat: "{series.name}: <b>{point.y}</b> "
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                style: {
                  color:
                    (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                    "black"
                }
              }
            }
          },
          series: [
            {
              type: "pie",
              innerSize: "80%",
              name: this.$t('pieChart.seriesName'),
              data: data
            }
          ]
        },
        function(c) {
          chart = c;
        }
      );
    },
    down(x, y) {
      return x.votes < y.votes ? 1 : -1;
    }
  },
  watch: {
    ["$i18n.locale"](lang) {
      this.initChart();
    }
  }
};
</script>

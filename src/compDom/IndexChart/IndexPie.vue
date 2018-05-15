<template>
  <div class="col-sm-6">

    <div class="tag-box tag-box-v2 box-shadow shadow-effect-1" style="border-right-color: rgb(128, 128, 128); border-right-style: solid; border-right-width: 2px; margin-bottom: 0px; background-color: #FFFFFF;">
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
    ...mapActions(["getAllWitnesses"]),
    initChart() {
      if (this.witnesses.length <= 0) {
        return;
      }
      let totalVotes = this.witnesses.reduce((p, c) => {
        return (p += c.votes);
      }, 0);
      let curVotes = 0;
      let data = [];
      let length = Math.min(10, this.witnesses.length);
      for (let i = 0; i < length; i++) {
        let w = this.witnesses[i];
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
    }
  },
  watch: {
    ["$i18n.locale"](lang) {
      this.initChart();
    }
  }
};
</script>

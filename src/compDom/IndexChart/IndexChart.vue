<template>
  <div class="col-sm-6 margin-bottom-20">

    <div class="tag-box tag-box-v2 box-shadow shadow-effect-1" style="margin-bottom: 0px; background-color: #FFFFFF;">
      <div id="container-line" style="min-width: 255px; height: 200px; margin: 0 auto"></div>
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import axios from "axios";
export default {
  async mounted() {
    let res = await axios.get(
      "https://min-api.cryptocompare.com/data/histoday?fsym=TRX&tsym=USD&limit=6"
    );
    let data = res.data.Data;
    this.cate = data.map(e => {
      let timestamp = new Date(e.time * 1000);
      return `${timestamp.getMonth()}/${timestamp.getDate()}`;
    });
    this.price = data.map(e => {
      return e.close;
    });
    this.loadChart()
  },
  data() {
    return {
      cate: [],
      price: []
    }
  },
  methods: {
    loadChart() {
      let title = this.$t('lineChart.title')
      let yTitle = this.$t('lineChart.yTitle')
      let xName = this.$t('lineChart.xName')
      let cate = this.cate
      let price = this.price
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
      Highcharts.chart("container-line", {
        animation: false,
        chart: {
          type: "line"
        },
        colors: ["#cd524c"],
        title: {
          text: title
        },
        xAxis: {
          categories: cate
        },
        yAxis: {
          title: {
            text: yTitle
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          enabled: false
        },
        series: [
          {
            name: xName,
            data: price
          }
        ]
      });
    }
  },
  watch: {
    ["$i18n.locale"](lang) {
      this.loadChart()
    }
  }
};
</script>

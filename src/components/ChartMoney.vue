<template>
  <div class="highcharts-wrap"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import {handleChartClick} from '../assets/js/util'
import {chart} from '../assets/js/mixin'
export default {
  mixins: [chart],
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    hasMin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    draw () {
      let _this = this, categories = [], seriesData = []
      // console.log(this.data)
      this.data.forEach((item) => {
        seriesData.push(parseFloat(item.y))
        categories.push(item.curDate)
      })
      let max = Math.max.apply(Math, seriesData),
        min = Math.min.apply(Math, seriesData),
        options = {
          credits: {
            enabled: false
          },
          chart: {
            type: 'column',
            margin: 0
          },
          title: {
            text: null
          },
          subtitle: {
            text: null
          },
          xAxis: {
            categories: categories,
            crosshair: true,
            labels: {
              enabled: false
            },
            tickWidth: 0
          },
          yAxis: {
            min: _this.hasMin ? min - ((max - min) / 10) : 0,
            title: {
              text: null
            },
            labels: {
              enabled: false
            },
            gridLineWidth: 0
          },
          tooltip: {
            // head + 每个 point + footer 拼接成完整的 table
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            column: {
              borderWidth: 0
            },
            series: {
              cursor: 'pointer',
              point: {
                events: {
                  click: function (e) { // 点击圆环回调
                    console.log('Category: ' + this.category + ', value: ' + this.y)
                    handleChartClick.bind(_this)({
                      category: this.category,
                      y: this.y
                    })
                  }
                }
              }
            }
          },
          series: [{
            name: '总资产',
            data: seriesData
          }]
        }
      this.chart = new Highcharts.Chart(this.$el, options)
    }
  }
}
</script>

  <style scoped lang="less">
  .highcharts-wrap {
    height: 100%;
  }
  </style>

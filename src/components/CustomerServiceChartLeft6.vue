<template>
  <div class="highcharts-wrap"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import {chart} from '../assets/js/mixin'

export default {
  mixins: [chart],
  props: {
    data: {
        type: Array,
        default: []
    },
    legend: {
        type: Boolean,
        default: false
    }
  },
  methods: {
    draw() {
        var chart = null, _this = this;
        let options = {
            credits: {
              enabled: false
            },
            chart: {
                type: 'area'
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                },
            },
            yAxis: {
                title: {
                    text: null
                },
            },
            tooltip: {
                valueSuffix: ' 百万'
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
                name: '亚洲',
                data: [502, 635, 809, 947, 1402, 3634, 5268]
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
<template>
  <div class="highcharts-wrap"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import {chart} from '../assets/js/mixin'

export default {
  mixins: [chart],
  methods: {
    draw() {
        let options = {
            credits: {
                enabled: false
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                tickWidth: 0
            },
            yAxis: {
                title: {
                    text: null
                },
                lineWidth: 1
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    label: {
                            connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            series: [{
                name: '漏损率',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }
        this.chart = new Highcharts.Chart(this.$el, options)
    }
  }
}
</script>

<style scoped lang="less">
    .highcharts-wrap {
        height: 45%;
    }
</style>
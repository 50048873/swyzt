<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import * as HighchartsMore from 'highcharts/highcharts-more.js';
HighchartsMore(Highcharts);

export default {
  name: 'PipeChartRight1',
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
        let options = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: null
            },
            pane: {
                startAngle: -135,
                endAngle: 135,
                size: '100%' // 仪表盘的占容器的比例
            },
            // the value axis
            yAxis: {
                min: 0,
                max: 100,
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 14,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: '漏损率',
                    y: 16
                },
                plotBands: [{
                    from: 0,
                    to: 16,
                    color: '#55BF3B' // green
                }, {
                    from: 16,
                    to: 30,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 30,
                    to: 100,
                    color: '#DF5353' // red
                }]
            },
            series: [{
                name: '漏损率',
                data: [80],
                tooltip: {
                    valueSuffix: ' %'
                },
                dataLabels:{
                    color:'red',
                    // style:{"fontSize": "36px"}
                    y: 65,
                    formatter: function() {
                        return this.y.toFixed(2) + "%"
                    }
                }
            }]
        }
        let callback = function (chart) {
            if (!chart.renderer.forExport) {
                setInterval(function () {
                    var point = chart.series[0].points[0],
                        newVal,
                        inc = Math.round((Math.random() - 0.5) * 20);
                    newVal = point.y + inc;
                    if (newVal < 0 || newVal > 100) {
                        newVal = point.y - inc;
                    }
                    point.update(newVal);
                }, 2000);
            }
        }
        this.chart = new Highcharts.Chart(this.$el, options, callback)
    }
  }
}
</script>

<style scoped lang="less">
    .highcharts-container {
        height: calc(55% - 28px);
    }
</style>
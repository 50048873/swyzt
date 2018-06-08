<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';

export default {
  name: 'ChartProfit',
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
        var chart = null, _this = this;
        let options = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'pie'
            },
            title: {
                align: 'left',
                floating: true,
                text: '', //圆中心文字
                style: { "fontWeight": "bold", "fontSize": "12px" },
                x: 15
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            legend: {
                enabled: _this.legend,
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical',
                x: 0,
                y: 0
            },
            plotOptions: {
                pie: {
                    // minSize: 100,
                    size: 100,
                    innerSize: '50%',
                    showInLegend: true,
                    dataLabels: {
                        enabled: false,
                        useHTML: true,
                        distance: 20,
                        // y: -10,
                        padding: 0,
                        verticalAlign: 'middle',
                        formatter : function() {  
                            return "<div>"+this.point.name+this.percentage.toFixed(0)+"%</div>"; 
                        }
                    }
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) { // 点击圆环回调
                                /*layer.open({
                                    title: '项目进度统计',
                                    type: 1,
                                    skin: 'layui-layer-home', 
                                    anim: 0,
                                    shadeClose: true, 
                                    content: $(this.name).removeAttr('class').get(0).innerHTML
                                });*/
                            }
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: '利润总额分版块构成',
                data: _this.data
            }]
        }
        let callback = (c) => {
            // 环形图圆心
            var centerY = c.series[0].center[1],
                titleHeight = parseInt(c.title.styles.fontSize);
            c.setTitle({
                //x: 4,
                y: centerY + titleHeight/2
            });
            chart = c;
        }
        this.chart = new Highcharts.Chart(this.$el, options, callback)
    }
  }
}
</script>

<style scoped lang="less">
    .highcharts-container {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 60px;
        height: 130px;
    }
</style>
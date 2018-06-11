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
                type: 'pie'
            },
            title: {
                floating: true,
                text: null, //圆中心文字
                style: { "fontWeight": "bold", "fontSize": "12px" }
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            legend: {
                enabled: _this.legend
            },
            plotOptions: {
                pie: {
                    size: 180,
                    innerSize: '60%',
                    showInLegend: true,
                    dataLabels: {
                        enabled: false,
                        useHTML: true,
                        distance: 20,
                        y: -10,
                        padding: 0,
                        verticalAlign: 'middle',
                        formatter : function() {  
                            return "<div><p>"+this.point.name+"</p>"+this.percentage.toFixed(0)+"%</div>"; 
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
    .highcharts-wrap {
        height: 100%;
    }
</style>
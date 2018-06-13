<template>
  <section class="layout-page">
    <div class="left" :style="getBgImage()">
      <div class="select-wrap">
        <div class="search-year">
          <select-year @selectChange="selectChange"></select-year>
        </div>
      </div>
      <div class="cards">
        <card class="ON" :percent="card1.percent" :iconCls="iconCls[0]">
          <card-title slot="titlePart" title="官网（公里）" :value1="card1.currentValue"></card-title>
          <chart-money :data="card1.list" slot="chartPart" :hasMin="card1.hasMin" v-if="card1.list.length"></chart-money>
        </card>
        <card-three :iconCls="iconCls[1]">
          <card-title slot="titlePart" title="管材类别（%）"></card-title>
          <customer-service-chart-left4 slot="chartPart" :data="card8.list" :legend="card8.legend" v-if="card8.list.length"></customer-service-chart-left4>
        </card-three>
        <card-three :iconCls="iconCls[2]">
          <card-title slot="titlePart" title="管径类别（%）"></card-title>
          <customer-service-chart-left4 slot="chartPart" :data="card8.list" :legend="card8.legend" v-if="card8.list.length"></customer-service-chart-left4>
        </card-three>
        <card :percent="card1.percent" percentTitle="完成率" :iconCls="iconCls[3]">
          <card-title
          slot="titlePart"
          title="巡检管道（公里）"
          subTitle1="计划"
          :value1="card3.currentValue"
          subTitle2="实收"
          :value2="card3.currentValue">
        </card-title>
        <chart-money slot="chartPart" :data="card3.list" :hasMin="card3.hasMin" v-if="card3.list.length"></chart-money>
      </card>
      <card :percent="card1.percent" :iconCls="iconCls[4]">
        <card-title
        slot="titlePart"
        title="抢修任务（单）"
        subTitle1="总单数"
        :value1="parseInt(card4.currentValue)"
        subTitle2="已处理"
        :value2="parseInt(card4.currentValue)">
      </card-title>
      <chart-money slot="chartPart" :data="card3.list" :hasMin="card3.hasMin" v-if="card3.list.length"></chart-money>
    </card>
  </div>
  <div class="map-wrap">
    <map-nx></map-nx>
  </div>
</div>
<div class="right m-content-right">
  <tab :data="tabData" @tabChange="tabChange"></tab>
  <div class="carts">
    <card-two title="漏损率（%）" height="400">
      <pipe-chart-right1 :data="card9.list" :legend="card9.legend" v-if="card9.list.length"></pipe-chart-right1>
      <el-date-picker
      style="width:100%;margin-bottom:5px;"
      size="mini"
      v-model="card9.value"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <pipe-chart-right2 :data="card9.list" :legend="card9.legend" v-if="card9.list.length"></pipe-chart-right2>
  </card-two>
  <card-two title="设备数量（台）">
    <manage-chart7 :data="card7.list" v-if="card7.list.length"></manage-chart7>
  </card-two>
  <card-two title="设备类型">
    <pipe-chart-right3 :data="card8.list" v-if="card8.list.length"></pipe-chart-right3>
  </card-two>
</div>
</div>
</section>
</template>

<script>
import ChartMoney from './ChartMoney'
import CardThree from './CardThree'
import CustomerServiceChartLeft4 from './CustomerServiceChartLeft4'
import PipeChartRight1 from './PipeChartRight1'
import PipeChartRight2 from './PipeChartRight2'
import PipeChartRight3 from './PipeChartRight3'
import ManageChart7 from './ManageChart7'
import {getStaticPath, parseInt, pageCommon} from '../assets/js/mixin'
import * as api from '../assets/js/api'
import {getCurrentValue, getTabData} from '../assets/js/util'
export default {
  name: 'Pipe',
  components: {
    ChartMoney,
    CardThree,
    CustomerServiceChartLeft4,
    PipeChartRight1,
    PipeChartRight2,
    PipeChartRight3,
    ManageChart7
  },
  mixins: [getStaticPath, parseInt, pageCommon],
  data () {
    return {
      tabData: getTabData(),
      curDate: '2017',
      card1: {
        percent: '',
        list: [],
        currentValue: '',
        hasMin: true
      },
      card2: {
        percent: '',
        list: [],
        currentValue: '',
        fzl: '',
        hasMin: true
      },
      card3: {
        percent: '',
        list: [],
        currentValue: '',
        hasMin: true
      },
      card4: {
        percent: '',
        list: [],
        currentValue: '',
        yyzsrtbzz: ''
      },
      card5: {
        list: [],
        currentValue: '',
        jlr: ''
      },
      card6: {
        percent: '',
        list: [],
        currentValue: '',
        jhtz: ''
      },
      card7: {
        list: [],
        legend: true
      },
      card8: {
        list: [],
        legend: true
      },
      card9: {
        list: [],
        legend: true,
        value: ''
      }
    }
  },
  methods: {
    tabChange (index, title) {
      let params = {
        curDate: title
      }
      this.get7(params)
    },
    getBgImage () {
      return {backgroundImage: `url(${this.getStaticPath('/static/img/bg.jpg')})`}
    },
    initParam () {
      this.iconCls = ['nxst-gw2', 'nxst-gclb', 'nxst-gjlb', 'nxst-xjgd', 'nxst-qxrw']
    },
    get1 () {
      let params = {
        curDate: this.curDate
      }
      api.get1(params)
        .then((res) => {
          this.card1.list = res.list
          this.card1.percent = getCurrentValue(res.list, 'percent')
          this.card1.currentValue = getCurrentValue(res.list, 'y')
        })
    },
    get2 () {
      let params = {
          curDate: this.curDate
        },
        handleFzl = (fz, zc) => {
          let percent = fz / zc * 100
          if (isNaN(percent)) {
            return '--'
          }
          return percent.toFixed(2) + '%'
        }
      api.get2(params)
        .then((res) => {
          this.card2.list = res.list
          this.card2.percent = getCurrentValue(res.list, 'percent')
          this.card2.currentValue = getCurrentValue(res.list, 'y')
          this.card2.fzl = handleFzl(this.card2.currentValue, this.card1.currentValue)
        })
    },
    get3 () {
      let params = {
        curDate: this.curDate
      }
      api.get3(params)
        .then((res) => {
          this.card3.list = res.list
          this.card3.percent = getCurrentValue(res.list, 'percent')
          this.card3.currentValue = getCurrentValue(res.list, 'y')
        })
    },
    get4 () {
      let params = {
        curDate: this.curDate
      }
      api.get4(params)
        .then((res) => {
          this.card4.list = res.list
          this.card4.percent = getCurrentValue(res.list, 'percent')
          this.card4.currentValue = getCurrentValue(res.list, 'y')
          this.card4.yyzsrtbzz = getCurrentValue(res.list, 'yyzsrtbzz')
        })
    },
    get5 () {
      let params = {
        curDate: this.curDate
      }
      api.get5(params)
        .then((res) => {
          this.card5.list = res.list
          this.card5.currentValue = getCurrentValue(res.list, 'y')
          this.card5.jlr = getCurrentValue(res.list, 'jlr')
        })
    },
    get6 () {
      let params = {
        curDate: this.curDate
      }
      api.get6(params)
        .then((res) => {
          this.card6.list = res.list
          this.card6.percent = getCurrentValue(res.list, 'percent')
          this.card6.currentValue = getCurrentValue(res.list, 'y')
          this.card6.jhtz = getCurrentValue(res.list, 'jhtz')
        })
    },
    get7 (params) {
      if (!params) {
        params = {
          curDate: this.curDate
        }
      }
      api.get7(params)
        .then((res) => {
          this.card7.list = res.list
        })
    },
    get8 () {
      let params = {
        curDate: this.curDate
      }
      api.get8(params)
        .then((res) => {
          this.card8.list = res.list
        })
    },
    get9 () {
      let params = {
        curDate: this.curDate
      }
      api.get9(params)
        .then((res) => {
          this.card9.list = res.list
        })
    },
    loadData () {
      this.get1()
      this.get2()
      this.get3()
      this.get4()
      this.get5()
      this.get6()
      this.get7()
      this.get8()
      this.get9()
    }
  },
  created () {
    this.initParam()
    this.loadData()
  }
}
</script>

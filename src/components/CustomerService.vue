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
		        <card-title
    				slot="titlePart"
		        	title="应收实收水量（万方）"
		        	subTitle1="应收"
		        	:value1="card1.currentValue"
		        	subTitle2="实收"
		        	:value2="card1.currentValue">
		        </card-title>
		        <chart-money slot="chartPart" :data="card1.list" :hasMin="card1.hasMin" v-if="card1.list.length"></chart-money>
    		</card>
    		<card :percent="card2.percent" :iconCls="iconCls[1]">
		        <card-title
    				slot="titlePart"
		        	title="应收实收消费（万元）"
		        	subTitle1="应收"
		        	:value1="card2.currentValue"
		        	subTitle2="实收"
		        	:value2="card2.fzl">
		        </card-title>
		        <chart-money slot="chartPart" :data="card2.list" :hasMin="card2.hasMin" v-if="card2.list.length"></chart-money>
    		</card>
    		<card :iconCls="iconCls[2]">
		        <card-title slot="titlePart" title="欠费（万元）" :value1="card3.currentValue"></card-title>
		        <chart-money slot="chartPart" :data="card3.list" :hasMin="card3.hasMin" v-if="card3.list.length"></chart-money>
    		</card>
    		<card-three :iconCls="iconCls[3]">
		        <card-title slot="titlePart" title="用水结构占比（百分比）"></card-title>
		        <customer-service-chart-left4 slot="chartPart" :data="card8.list" :legend="card8.legend" v-if="card8.list.length"></customer-service-chart-left4>
    		</card-three>
    		<card-three :iconCls="iconCls[4]">
		        <card-title slot="titlePart" title="用水户数（万户）" :value1="card5.currentValue"></card-title>
		        <customer-service-chart-left5 slot="chartPart" :data="card5.list" v-if="card5.list.length"></customer-service-chart-left5>
    		</card-three>
		</div>
		<div class="map-wrap">
			<map-nx></map-nx>
		</div>
	</div>
	<div class="right m-content-right">
		<tab :data="tabData" @tabChange="tabChange"></tab>
		<div class="carts">
			<card-two title="集团售水收入（万元）" height="150">
				<customer-service-chart-left6 :data="card5.list" v-if="card5.list.length"></customer-service-chart-left6>
			</card-two>
			<card-two title="分公司售水收入分析" height="150">
				<customer-service-chart-left7 :data="card9.list" v-if="card9.list.length"></customer-service-chart-left7>
			</card-two>
			<card-two title="客户报修（次）" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
			<card-two title="客户热线（次）" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
			<card-two title="客户投诉（次）" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
			<card-two title="抄表（应抄、实抄）（%）" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
		</div>
	</div>
  </section>
</template>

<script>
	import ChartMoney from './ChartMoney'
	import CardThree from './CardThree'
	import ProduceChartRight1 from './ProduceChartRight1'
	import CustomerServiceChartLeft4 from './CustomerServiceChartLeft4'
	import CustomerServiceChartLeft5 from './CustomerServiceChartLeft5'
	import CustomerServiceChartLeft6 from './CustomerServiceChartLeft6'
	import CustomerServiceChartLeft7 from './CustomerServiceChartLeft7'
	import {getStaticPath, pageCommon} from '../assets/js/mixin'
	import * as api from '../assets/js/api'
	import {getCurrentValue, getTabData} from '../assets/js/util'
	export default {
	    name: 'CustomerService',
	    components: {
	    	ChartMoney,
	    	CardThree,
	    	ProduceChartRight1,
	    	CustomerServiceChartLeft4,
	    	CustomerServiceChartLeft5,
	    	CustomerServiceChartLeft6,
	    	CustomerServiceChartLeft7
	    },
	    mixins: [getStaticPath, pageCommon],
	    data() {
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
		    		legend: true
	    		}
	    	}
	    },
	    methods: {
	    	tabChange(index, title) {
	    		let params = {
	    			curDate: title
	    		}
	    		this.get_7(params)
	    	},
		    getBgImage() {
		    	return {backgroundImage: `url(${this.getStaticPath('/static/img/bg.jpg')})`}
		    },
		    initParam() {
	    		this.iconCls = ['nxst-yssssl', 'nxst-money', 'nxst-money', 'nxst-ysjgdb', 'nxst-yshs']
		    },
		    get_1() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_1(params)
		    		.then((res) => {
		            	this.card1.list = res.list
		            	this.card1.percent = getCurrentValue(res.list, 'percent')
		            	this.card1.currentValue = getCurrentValue(res.list, 'y')
			        })
		    },
		    get_2() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	let handleFzl = (fz, zc) => {
		    		let percent = fz / zc * 100
		    		if (isNaN(percent)) {
		    			return '--'
		    		}
		    		return percent.toFixed(2) + '%'
		    	}
		    	api.get_2(params)
		    		.then((res) => {
		            	this.card2.list = res.list
		            	this.card2.percent = getCurrentValue(res.list, 'percent')
		            	this.card2.currentValue = getCurrentValue(res.list, 'y')
		            	this.card2.fzl = handleFzl(this.card2.currentValue, this.card1.currentValue)
			        })
		    },
		    get_3() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_3(params)
		    		.then((res) => {
		            	this.card3.list = res.list
		            	this.card3.percent = getCurrentValue(res.list, 'percent')
		            	this.card3.currentValue = getCurrentValue(res.list, 'y')
			        })
		    },
		    get_4() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_4(params)
		    		.then((res) => {
		            	this.card4.list = res.list
		            	this.card4.percent = getCurrentValue(res.list, 'percent')
		            	this.card4.currentValue = getCurrentValue(res.list, 'y')
		            	this.card4.yyzsrtbzz = getCurrentValue(res.list, 'yyzsrtbzz')
			        })
		    },
		    get_5() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_5(params)
		    		.then((res) => {
		            	this.card5.list = res.list
		            	this.card5.currentValue = getCurrentValue(res.list, 'y')
		            	this.card5.jlr = getCurrentValue(res.list, 'jlr')
			        })
		    },
		    get_6() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_6(params)
		    		.then((res) => {
		            	this.card6.list = res.list
		            	this.card6.percent = getCurrentValue(res.list, 'percent')
		            	this.card6.currentValue = getCurrentValue(res.list, 'y')
		            	this.card6.jhtz = getCurrentValue(res.list, 'jhtz')
			        })
		    },
		    get_7(params) {
		    	if (!params) {
		    		params = {
			    		curDate: this.curDate
			    	}
		    	}
		    	api.get_7(params)
		    		.then((res) => {
		            	this.card7.list = res.list
			        })
		    },
		    get_8() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_8(params)
		    		.then((res) => {
		            	this.card8.list = res.list
			        })
		    },
		    get_9() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_9(params)
		    		.then((res) => {
		            	this.card9.list = res.list
			        })
		    },
		    loadData() {
		    	this.get_1()
	    		this.get_2()
	    		this.get_3()
	    		this.get_4()
	    		this.get_5()
	    		this.get_6()
	    		this.get_7()
	    		this.get_8()
	    		this.get_9()
		    }
	    },
	    created() {
	    	this.initParam()
	    	this.loadData()
	    }
	}
</script>
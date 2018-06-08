<template>
  <section class="CustomerService">
	<div class="left" :style="getBgImage()">
		<div class="select-wrap">
	    	<div class="search-year">
	    		<select-year @selectChange="selectChange"></select-year>
	    	</div>
	    </div>
		<div class="cards">
    		<card class="ON" :percent="card1.percent" :iconCls="iconCls[0]">
    			<template slot="titlePart">
    				<h3>
			          <span>应收实收水量（万方）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title">应收</span>
			          <span class="strongCount bgc-theme"><b class="fs-20">{{card1.currentValue}}</b></span>
			        </div>
			        <div class="liabilityPercent">
			          <span class="title">实收</span>
			          <span class="strongCount bgc-green"><b class="fs-20">{{card1.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card1.list" :hasMin="card1.hasMin" v-if="card1.list.length"></chart-money>
		        </template>
    		</card>
    		<card :percent="card2.percent" :iconCls="iconCls[1]">
    			<template slot="titlePart">
    				<h3>
			          <span>应收实收消费</span>
			          <span>（万元）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title">应收</span>
			          <span class="strongCount bgc-theme"><b class="fs-20">{{card2.currentValue}}</b></span>
			        </div>
			        <div class="liabilityPercent">
			          <span class="title">实收</span>
			          <span class="strongCount bgc-green"><b class="fs-20">{{card2.fzl}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card2.list" :hasMin="card2.hasMin" v-if="card2.list.length"></chart-money>
		        </template>
    		</card>
    		<card :iconCls="iconCls[2]">
    			<template slot="titlePart">
    				<h3>
			          <span>欠费</span>
			          <span>（万元）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card3.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card3.list" :hasMin="card3.hasMin" v-if="card3.list.length"></chart-money>
		        </template>
    		</card>
    		<card-three :iconCls="iconCls[3]">
    			<template slot="titlePart">
    				<h3>
			          <span>用水结构占比</span>
			          <span>（百分比）</span>
			        </h3>
		        </template>
		        <template slot="chartPart">
		        	<customer-service-chart-left4 :data="card8.list" :legend="card8.legend" v-if="card8.list.length"></customer-service-chart-left4>
		        </template>
    		</card-three>
    		<card-three :iconCls="iconCls[4]">
    			<template slot="titlePart">
    				<h3>
			          <span>用水户数</span>
			          <span>（万户）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card5.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<customer-service-chart-left5 :data="card5.list" v-if="card5.list.length"></customer-service-chart-left5>
		        </template>
    		</card-three>
		</div>
		<div class="map-wrap">
			<map-nx></map-nx>
		</div>
	</div>
	<div class="right m-content-right">
		<tab :data="tabData" @tabChange="tabChange"></tab>
		<div class="carts">
			<card-two title="集团售水收入" height="150">
				<customer-service-chart-left6 :data="card5.list" v-if="card5.list.length"></customer-service-chart-left6>
			</card-two>
			<card-two title="分公司售水收入分析" height="150">
				<customer-service-chart-left7 :data="card9.list" v-if="card9.list.length"></customer-service-chart-left7>
			</card-two>
			<card-two title="客户报修" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
			<card-two title="客户热线" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
			<card-two title="客户投诉" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
			<card-two title="抄表（应抄、实抄）" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
		</div>
	</div>
  </section>
</template>

<script>
	const tabData = [
	    {
	      title: '2017'
	    },
	    {
	      title: '2016'
	    }
	]
	import ChartMoney from './ChartMoney'
	import Card from './Card'
	import Tab from './Tab'
	import CardTwo from './CardTwo'
	import CardThree from './CardThree'
	import ProduceChartRight1 from './ProduceChartRight1'
	import CustomerServiceChartLeft4 from './CustomerServiceChartLeft4'
	import CustomerServiceChartLeft5 from './CustomerServiceChartLeft5'
	import CustomerServiceChartLeft6 from './CustomerServiceChartLeft6'
	import CustomerServiceChartLeft7 from './CustomerServiceChartLeft7'
	import {getStaticPath} from '../assets/js/mixin'
	import MapNx from './MapNx'
	import SelectYear from './SelectYear'
	import * as api from '../assets/js/api'
	import {getCurrentValue} from '../assets/js/util'
	export default {
	    name: 'CustomerService',
	    components: {
	    	ChartMoney,
	    	Card,
	    	Tab,
	    	CardTwo,
	    	CardThree,
	    	ProduceChartRight1,
	    	CustomerServiceChartLeft4,
	    	CustomerServiceChartLeft5,
	    	CustomerServiceChartLeft6,
	    	CustomerServiceChartLeft7,
	    	MapNx,
	    	SelectYear
	    },
	    mixins: [getStaticPath],
	    data() {
	    	return {
	    		tabData: tabData,
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
	    	selectChange(newVal) {
	    		this.curDate = newVal
	    		this.tabData[0].title = newVal
	    		this.tabData[1].title = parseInt(newVal) - 1
	    		this.card1.list = []
	    		this.card2.list = []
	    		this.card3.list = []
	    		this.card4.list = []
	    		this.card5.list = []
	    		this.card6.list = []
	    		this.card7.list = []
	    		this.card8.list = []
	    		this.card9.list = []
	    		this.loadData()
	    	},
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

<style scoped lang="less">
	@import "../assets/less/variable.less";
	.CustomerService {
		display: flex;
		.left {
			display: flex;
			flex: 1;
			margin-right: 10px;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			position: relative;
			.select-wrap {
				position: absolute;
				top: 10px;
				right: 10px;
				.search-year {
					width: 120px;
				}
			}
			.cards {
			}
			.map-wrap {
				flex: 1;
				text-align: center;
				margin-top: 60px;
			}
		}
		.right {
			// display: flex;
			// flex-direction: column;
			// justify-content: space-between;
			.carts {
				// flex: 1;
				// display: flex;
			    // flex-direction: column;
			    // justify-content: space-between;
			    .card {
			    	margin-top: 10px;
			    	&:first-child {
			    		margin-top: 0;
			    	}
			    }
			}
		}
	}
</style>
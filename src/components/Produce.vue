<template>
  <section class="Produce">
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
			          <span>自来水供水量</span>
			          <span>（万方）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card1.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card1.list" :hasMin="card1.hasMin" v-if="card1.list.length"></chart-money>
		        </template>
    		</card>
    		<card :percent="card2.percent" :iconCls="iconCls[1]">
    			<template slot="titlePart">
    				<h3>
			          <span>电量</span>
			          <span>（kwh）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card2.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card2.list" :hasMin="card2.hasMin" v-if="card2.list.length"></chart-money>
		        </template>
    		</card>
    		<card :percent="card3.percent" :iconCls="iconCls[2]">
    			<template slot="titlePart">
    				<h3>
			          <span>药量</span>
			          <span>（吨）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card3.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card3.list" :hasMin="card3.hasMin" v-if="card3.list.length"></chart-money>
		        </template>
    		</card>
    		<card :percent="card4.percent" :iconCls="iconCls[3]">
    			<template slot="titlePart">
    				<h3>
			          <span>水质合格率</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card4.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card4.list" v-if="card4.list.length"></chart-money>
		        </template>
    		</card>
    		<card :iconCls="iconCls[4]">
    			<template slot="titlePart">
    				<h3>
			          <span>单方水成本</span>
			          <span>（元/吨）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card1.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card5.list" v-if="card5.list.length"></chart-money>
		        </template>
    		</card>
    		<card :percent="card6.percent" :iconCls="iconCls[5]">
    			<template slot="titlePart">
    				<h3>
			          <span>单方水能耗</span>
			          <span>（吨）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card1.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card6.list" v-if="card6.list.length"></chart-money>
		        </template>
    		</card>
    		<card :percent="card6.percent" :iconCls="iconCls[6]">
    			<template slot="titlePart">
    				<h3>
			          <span>自来水药耗</span>
			          <span>（吨）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card1.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card6.list" v-if="card6.list.length"></chart-money>
		        </template>
    		</card>
		</div>
		<div class="map-wrap">
			<map-nx></map-nx>
		</div>
	</div>
	<div class="right m-content-right">
		<tab :data="tabData" @tabChange="tabChange"></tab>
		<div class="carts">
			<card-two title="六盘山历年供水规模（能力）及供水量统计" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
			<card-two title="供水量分析" height="300">
				<produce-chart-right2 :data="card9.list" v-if="card9.list.length" height="150"></produce-chart-right2>
				<produce-chart-right3 :data="card8.list" v-if="card8.list.length" height="150"></produce-chart-right3>
			</card-two>
			<card-two title="单方水成本" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
			<card-two title="单方水能耗" height="150">
				<produce-chart-right1 :data="card7.list" v-if="card7.list.length"></produce-chart-right1>
			</card-two>
			<card-two title="单方水药耗" height="150">
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
	import ProduceChartRight1 from './ProduceChartRight1'
	import ProduceChartRight2 from './ProduceChartRight2'
	import ProduceChartRight3 from './ProduceChartRight3'
	import {getStaticPath} from '../assets/js/mixin'
	import MapNx from './MapNx'
	import SelectYear from './SelectYear'
	import * as api from '../assets/js/api'
	import {getCurrentValue} from '../assets/js/util'
	export default {
	    name: 'Produce',
	    components: {
	    	ChartMoney,
	    	Card,
	    	Tab,
	    	CardTwo,
	    	ProduceChartRight1,
	    	ProduceChartRight2,
	    	ProduceChartRight3,
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
		    		list: []
	    		},
	    		card8: {
		    		list: []
	    		},
	    		card9: {
		    		list: []
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
	    		this.iconCls = ['nxst-gsl', 'nxst-dl', 'nxst-yl', 'nxst-szhgl', 'nxst-dfscb', 'nxst-snh', 'nxst-zlsyh']
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
	.Produce {
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
				.card {
					margin: 15px; 
					padding: 10px;
					&.ON {
				      border: 2px solid @color-theme;
				    }
				    h3 {
				    	margin-bottom: 6px;
				    }
				    .totalMoney, .liabilityPercent {
				    	margin-bottom: 6px;
				    	.title {
				    		margin-right: 6px;
				    	}
						.title, .strongCount {
				    		font-weight: bold;
				    	}
				    	.strongCount {
							display: inline-block;
						    padding: 5px 20px 5px 5px;
						    border-radius: 0 20px 20px 0;
						    min-width: 80px;
							box-sizing: border-box;
				    	}
				    }
				    .totalMoney {
				    	
				    	
				    }
				}
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
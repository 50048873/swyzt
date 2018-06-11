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
    			<card-title slot="titlePart" title="总资产（亿元）" :value1="card1.currentValue"></card-title>
		        <chart-money slot="chartPart" :data="card1.list" :hasMin="card1.hasMin" v-if="card1.list.length"></chart-money>
    		</card>
    		<card :percent="card2.percent" :iconCls="iconCls[1]">
    			<card-title
    				slot="titlePart"
		        	title="负债总额（亿元）"
		        	subTitle1="总　额"
		        	:value1="card2.currentValue"
		        	subTitle2="负债率"
		        	:value2="card2.fzl">
		        </card-title>
		        <chart-money slot="chartPart" :data="card2.list" :hasMin="card2.hasMin" v-if="card2.list.length"></chart-money>
    		</card>
    		<card :percent="card3.percent" :iconCls="iconCls[2]">
    			<card-title slot="titlePart" title="净资产（亿元）" :value1="card3.currentValue"></card-title>
		        <chart-money slot="chartPart" :data="card3.list" :hasMin="card3.hasMin" v-if="card3.list.length"></chart-money>
    		</card>
    		<card :percent="card4.percent" :iconCls="iconCls[3]">
    			<card-title
    				slot="titlePart"
		        	title="营业总收入（万元）"
		        	:value1="card4.currentValue"
		        	subTitle2="同比增长"
		        	:value2="card4.yyzsrtbzz">
		        </card-title>
		        <chart-money slot="chartPart" :data="card4.list" v-if="card4.list.length"></chart-money>
    		</card>
    		<card :iconCls="iconCls[4]">
    			<card-title
    				slot="titlePart"
		        	title="利润总额（万元）"
		        	subTitle1="总　额"
		        	:value1="card5.currentValue"
		        	subTitle2="净利润"
		        	:value2="card5.jlr">
		        </card-title>
		        <chart-money slot="chartPart" :data="card5.list" v-if="card5.list.length"></chart-money>
    		</card>
    		<card :percent="card6.percent" :iconCls="iconCls[5]">
    			<card-title
    				slot="titlePart"
		        	title="投资（万元）"
		        	subTitle1="完成"
		        	:value1="card6.currentValue"
		        	subTitle2="计划"
		        	:value2="card6.jhtz">
		        </card-title>
		        <chart-money slot="chartPart" :data="card6.list" v-if="card6.list.length"></chart-money>
    		</card>
		</div>
		<div class="map-wrap">
			<map-nx @handleItem="handleItem"></map-nx>
		</div>
	</div>
	<div class="right m-content-right">
		<tab :data="tabData" @tabChange="tabChange"></tab>
		<div class="carts">
			<card-two title="各分公司供水量（万吨）" height="350">
				<manage-chart7 :data="card7.list" :legend="card7.legend" v-if="card7.list.length"></manage-chart7>
			</card-two>
			<card-two title="利润总额分版块构成" height="350">
				<manage-chart8 :data="card8.list" :legend="card8.legend" v-if="card8.list.length"></manage-chart8>
			</card-two>
			<card-two title="各公司营业收入、净利润，计划完成率" height="380">
				<manage-chart9 :data="card9.list" :legend="card9.legend" v-if="card9.list.length"></manage-chart9>
			</card-two>
		</div>
	</div>
  </section>
</template>

<script>
	import ChartMoney from './ChartMoney'
	import ManageChart7 from './ManageChart7'
	import ManageChart8 from './ManageChart8'
	import ManageChart9 from './ManageChart9'
	import {getStaticPath, pageCommon} from '../assets/js/mixin'
	import * as api from '../assets/js/api'
	import {getCurrentValue, getTabData} from '../assets/js/util'
	export default {
	    name: 'Manage',
	    components: {
	    	ChartMoney,
	    	ManageChart7,
	    	ManageChart8,
	    	ManageChart9
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
		    initParam() {
	    		this.iconCls = ['nxst-money', 'nxst-fzze', 'nxst-jzc', 'nxst-money', 'nxst-lrzr', 'nxst-tz']
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
import {_getStaticPath} from '@/assets/js/util'
import Card from '@/components/Card'
import CardTitle from '@/components/CardTitle'
import Tab from '@/components/Tab'
import CardTwo from '@/components/CardTwo'
import SelectYear from '@/components/SelectYear'
import MapNx from '@/components/MapNx'

export let getStaticPath = {
  methods: {
    getStaticPath: _getStaticPath
  }
}

export let parseInt = {
  methods: {
    parseInt (val) {
      return parseInt(val)
    }
  }
}

export let chart = {
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.draw()
  },
  watch: {
    data (newVal, oldVal) {
      if (newVal) {
        this.draw()
      }
    }
  }
}

export let pageCommon = {
  components: {
    Card,
    CardTitle,
    Tab,
    CardTwo,
    SelectYear,
    MapNx
  },
  methods: {
    handleItem (item) {
      console.log(item)
    },
    selectChange (newVal) {
      this.curDate = newVal
      this.tabData[0].title = newVal
      this.tabData[1].title = newVal - 1
      this.loadData()
    },
    getBgImage () {
      return {backgroundImage: `url(${this.getStaticPath('/static/img/bg.jpg')})`}
    }
  }
}

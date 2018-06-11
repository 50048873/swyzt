<template>
  <div class="MapNx">
    <img ref="map" class="m-nx-map" :src="getStaticPath('/static/img/map.png')" alt="map.png">
    <div class="tip" v-for="item in list" :style="getPosition(item)" @click="handleItem(item)">
      <div class="iconWrap"><img :src="getIcon(item.percent)" alt=""></div>
      <div class="des" :class="getReverse(item.reverse)">
        <div v-html="getTitle(item.adunnm)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import * as api from '../assets/js/api'
import {throttle, _getStaticPath} from '../assets/js/util'
export default {
  name: 'MapNx',
  data() {
    return {
      list: []
    }
  },
  methods: {
    getStaticPath: _getStaticPath,
    handleItem(item) {
      this.$emit('handleItem', item)
    },
    getReverse(flag) {
      return flag ? 'reverse' : ''
    },
    getTitle(title) {
      if (title.indexOf('、') === -1) {
        return title
      } else {
        let arr = title.split('、')
        return arr.map((item) => {
          return `<h6>${item}</h6>`
        }).join('')
      }
    },
    getIcon(percent) {
      let icon1 = require('../assets/img/dw-1.png'),
          icon2 = require('../assets/img/dw-2.png'),
          icon3 = require('../assets/img/dw-3.png')
      if (!Array.isArray(percent)) {
        if (percent > 0) {
          return icon1
        } else if (percent < 0) {
          return icon2
        } else {
          return icon3
        }
      } else {
        let allZero = percent.every((item) => {
          return item === 0
        }) 
        if (allZero) {
          return icon3
        }

        let hasOne = percent.some((item) => {
          return item > 0
        })
        if (hasOne) {
          return icon1
        } else {
          return icon2
        }
      }
    },
    getPosition(item) {
      let imgOriginW = 763,
          imgW = $(this.$refs.map).width(),
          radio = imgW / imgOriginW
      return {
        top: item.y * radio + 'px',
        left: item.x * radio + 'px'
      }
    },
    get_company() {
      api.get_company()
        .then((res) => {
          this.list = res
        })
    },
    addResizeEvent() {
      let fn = function() {
        this.$forceUpdate()
      }
      window.addEventListener('resize', () => {
        throttle(fn, this)
      }, false)
    }
  },
  created() {
    this.get_company()
  },
  mounted() {
    this.addResizeEvent()
  }
}
</script>

<style lang="less">
  @import "../assets/less/variable.less";
  @import "../assets/less/tool.less";
  .MapNx {
    position: relative;
    display: inline-block;
    .tip {
      position: absolute;
      cursor: pointer;
      .iconWrap {
        position: absolute;
        width: 16px;
        z-index: 1;
      }
      .des {
        position: absolute;
        white-space: nowrap;
        top: 24px;
        left: 6px;
        background-color: white;
        padding: 5px 8px;
        border-radius: 4px;
        text-align: left;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        font-size: 12px;
        h6 {
          font-size: 12px;
        }
        p {
          font-size: 10px;
          white-space: nowrap;
        }
        &.reverse {
          position: relative;
          left: -100%;
          margin-right: -10px;
        }
      }
      &:hover {
        z-index: 2;
        .des {
          background-color: @color-theme;
          color: white;
          font-size: 14px;
          h6 {
            font-size: 14px;
          }
        }
        .iconWrap {
          transform-origin: center bottom;
          transform: scale(1.5);
        }
      }
    }
  }
</style>
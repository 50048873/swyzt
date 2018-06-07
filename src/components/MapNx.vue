<template>
  <div class="MapNx">
    <img ref="map" class="m-nx-map" :src="getStaticPath('/static/img/map.png')" alt="map.png">
    <div class="tip" v-for="item in list" :style="getPosition(item)">
      <div class="iconWrap"><img :src="getIcon(item.percent)" alt=""></div>
      <div class="des">
        <h6>{{item.adunnm}}</h6>
        <!-- <p>内容</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {getStaticPath} from '../assets/js/mixin'
import * as api from '../assets/js/api'
const normal = 1, abnormal = 2
export default {
  name: 'MapNx',
  mixins: [getStaticPath],
  data() {
    return {
      list: []
    }
  },
  methods: {
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
      return {
        top: item.y * (540 / 785) + 'px',
        left: item.x * (540 / 785) + 'px'
      }
    },
    /*getWarnPosition(item) {
      let imgOriginW = 1363,
          imgOriginH = 2049,
          whRadio = imgOriginW / imgOriginH,
          imgW = $(this.$refs.map).width(),
          imgH = imgW / whRadio
          console.log(imgW, imgH)
      let nx = {
        jd: [104.2869, 107.6536],
        wd: [35.2494, 39.8758]
      }
      
      //图片内目标Y坐标=取绝对值（目标纬度-图片上边对应纬度）/取绝对值（图片下边纬度-图片上边对应纬度）*（图片的高度）
      //图片内目标X坐标=取绝对值（目标经度-图片左边对应经度）/取绝对值（图片右边经度-图片左边对应经度）*（图片的宽度）
      let top = Math.abs(item.lttd - nx.wd[1]) / Math.abs(nx.wd[0] - nx.wd[1]) * imgH - 40 + 'px',
          left = Math.abs(item.lgtd - nx.jd[0]) / Math.abs(nx.jd[1] - nx.jd[0]) * imgW - 20 + 'px'
      return {top, left}
    },*/
    get_company() {
      api.get_company()
        .then((res) => {
          this.list = res
        })
    }
  },
  created() {
    this.get_company()
  }
}
</script>

<style scoped lang="less">
  .MapNx {
    position: relative;
    display: inline-block;
    .tip {
      position: absolute;
      .iconWrap {
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
      }
      .des {
        margin-left: 20px;
        background-color: white;
        padding: 5px 8px;
        border-radius: 4px;
        text-align: center;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        white-space: nowrap;
        h6 {
          font-weight: bold;
          font-size: 12px;
        }
        p {
          font-size: 10px;
          white-space: nowrap;
        }
      }
    }
  }
</style>
<template>
  <div class="CartTitle">
    <h3>{{title}}</h3>
    <div>
      <span class="title" v-if="subTitle1">{{subTitle1}}</span>
      <span :class="getValue1Class" v-if="value1">{{value1}}</span>
    </div>
    <div>
      <span class="title" v-if="subTitle2">{{subTitle2}}</span>
      <span :class="getValue2Class" v-if="value2">{{value2}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle1: {
      type: String,
      default: ''
    },
    value1: {
      type: [String, Number],
      default: ''
    },
    subTitle2: {
      type: [String, Number],
      default: ''
    },
    value2: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    getValue1Class () {
      if (this.subTitle1) {
        return 'strongCount bgc-theme'
      }
      return ''
    },
    getValue2Class () {
      if (this.subTitle2) {
        return 'strongCount bgc-green'
      }
      return ''
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/variable.less";
.CartTitle {
  h3 {
    margin-bottom: 6px;
  }
  .strongCount {
    display: inline-block;
    padding: 2px 20px 2px 4px;
    border-radius: 0 20px 20px 0;
    min-width: 80px;
    box-sizing: border-box;
    line-height: 1;
    margin-top: 5px;
  }
  span {
    font-weight: bold;
  }
  span:first-child {
    font-size: 16px;
    margin-right: 6px;
  }
  span:last-child {
    font-size: 20px;
  }
}
</style>

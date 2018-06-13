<template>
  <section class="CardTwo" :style="getHeight">
    <h3 class="title ellipsis" :title="title">{{title}}</h3>
    <div class="chart">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CardTwo',
  props: {
    title: {
      type: String,
      default: ''
    },
    height: {
      type: [String, Number],
      default: 300
    }
  },
  computed: {
    getHeight () {
      let height = parseFloat(this.height) + 'px'
      return {
        height: height
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/variable.less";
.CardTwo {
  background-color: white;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  .title {
    position: relative;
    padding-left: 20px;
    vertical-align: top;
    line-height: 1;
    margin-top: 5px;
    margin-bottom: 10px;
    flex: 0 0 14px;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 14px;
      height: 14px;
      background-color: @color-theme;
    }
  }
  .chart {
    flex: 1;
  }
  &:first-child {
    margin-top: 0;
  }
}
</style>

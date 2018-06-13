<template>
  <section class="CardThree">
    <div class="top">
      <slot name="titlePart"></slot>
    </div>
    <div class="bottom">
      <div class="icon-wrap">
        <i :class="iconCls"></i>
      </div>
      <slot name="chartPart"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CardThree',
  props: {
    iconCls: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/variable.less";
.CardThree {
  position: relative;
  margin: 15px;
  padding: 10px;
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.5);
  height: 170px;
  .top {
    position: relative;
    z-index: 1;
    h3 {
      margin-bottom: 6px;
    }
  }
  .icon-wrap {
    position: absolute;
    z-index: 1;
    bottom: 10px;
    left: 10px;
    font-size: 32px;
    color: @color-theme;
  }
}
</style>

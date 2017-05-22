<template>
  <div class="mint-tabbar" :class="{
      'is-fixed': fixed
    }">
    <slot></slot>
  </div>
</template>

<script>
/**
 * mt-tabbar
 * @module components/tabbar
 * @desc 底部 tab，依赖 tab-item
 * @param {boolean} [fixed=false] - 固定底部
 * @param {*} value - 返回 item component 传入的 id
 *
 * @example
 * <mt-tabbar v-model="selected">
 *   <mt-tab-item id="订单">
 *     <img slot="icon" src="http://placehold.it/100x100">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </mt-tabbar>
 *
 * <mt-tabbar v-model="selected" fixed>
 *   <mt-tab-item :id="['传入数组', '也是可以的']">
 *     <img slot="icon" src="http://placehold.it/100x100">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </mt-tabbar>
 */
export default {
  name: 'mt-tabbar',

  props: {
    fixed: Boolean,
    value: {}
  }
};
</script>

<style lang="css">
.mint-tabbar {
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    position: relative;
    background-color: #fafafa;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    text-align: center;
}
.mint-tabbar > .mint-tab-item.is-selected {
    background-color: #eaeaea;
    color: #26a2ff;
}
.mint-tabbar.is-fixed {
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
}
</style>

<template>
  <span
    class="mint-badge"
    :style="{ backgroundColor: color }"
    :class="['is-' + type, 'is-size-' + size]">
    <slot></slot>
  </span>
</template>

<script>
/**
 * mt-badge
 * @module components/badge
 * @desc 徽章
 * @param {string} [type=primary] 组件样式，可选 primary, error, success, warning
 * @param {string} [color] - 传入颜色值
 * @param {string} [size=normal] - 尺寸，接受 normal, small, large
 *
 * @example
 * <mt-badge color="error">错误</mt-badge>
 * <mt-badge color="#333">30</mt-badge>
 */
export default {
  name: 'mt-badge',
  props: {
    color: String,
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'normal'
    }
  }
};
</script>
<style lang="css">

.mint-badge {
    color: #fff;
    text-align: center;
    display: inline-block
}
.mint-badge.is-size-large {
    border-radius: 14px;
    font-size: 18px;
    padding: 2px 10px
}
.mint-badge.is-size-small {
    border-radius: 8px;
    font-size: 12px;
    padding: 2px 6px
}
.mint-badge.is-size-normal {
    border-radius: 12px;
    font-size: 15px;
    padding: 2px 8px
}
.mint-badge.is-warning {
    background-color: #ffc107
}
.mint-badge.is-error {
    background-color: #f44336
}
.mint-badge.is-primary {
    background-color: #26a2ff
}
.mint-badge.is-success {
    background-color: #4caf50
}

</style>

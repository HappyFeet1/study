<template>
  <div class="mint-search">
    <div class="mint-searchbar">
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input
        ref="input"
        @click="visible = true"
        type="search"
        v-model="currentValue"
        :placeholder="placeholder"
        class="mint-searchbar-core">
      </div>
      <a
        class="mint-searchbar-cancel"
        @click="visible = false, currentValue = ''"
        v-show="visible"
        v-text="cancelText">
      </a>
    </div>
    <div class="mint-search-list" v-show="show || currentValue">
      <div class="mint-search-list-warp">
        <slot>
          <x-cell v-for="(item, index) in result" :key="index" :title="item"></x-cell>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import XCell from '@/ui/cell/';

/**
 * mt-search
 * @module components/search
 * @desc 搜索框
 * @param {string} value - 绑定值
 * @param {string} [cancel-text=取消] - 取消按钮文字
 * @param {string} [placeholder=取消] - 搜索框占位内容
 * @param {boolean} [autofocus=false] - 自动 focus
 * @param {boolean} [show=false] - 始终显示列表
 * @param {string[]} [result] - 结果列表
 * @param {slot} 结果列表
 *
 * @example
 * <mt-search :value.sync="value" :result.sync="result"></mt-search>
 * <mt-search :value.sync="value">
 *   <mt-cell v-for="item in result" :title="item"></mt-cell>
 * </mt-search>
 */
export default {
  name: 'mt-search',

  data() {
    return {
      visible: false,
      currentValue: this.value
    };
  },

  components: { XCell },

  watch: {
    currentValue(val) {
      this.$emit('input', val);
    },

    value(val) {
      this.currentValue = val;
    }
  },

  props: {
    value: String,
    autofocus: Boolean,
    show: Boolean,
    cancelText: {
      default: '取消'
    },
    placeholder: {
      default: '搜索'
    },
    result: Array
  },

  mounted() {
    this.autofocus && this.$refs.input.focus();
  }
};
</script>

<style lang="css">

.mint-search {
    height: 100%;
    height: 100vh;
    overflow: hidden;
}
.mint-searchbar {
    position: relative;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    background-color: #d9d9d9;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 8px 10px;
    z-index: 1;
}
.mint-searchbar-inner {
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    background-color: #fff;
    border-radius: 2px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    height: 28px;
    padding: 4px 6px;
}
.mint-searchbar-inner .mintui-search {
    font-size: 12px;
    color: #d9d9d9;
}
.mint-searchbar-core {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    border: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    outline: 0;
}
.mint-searchbar-cancel {
    color: #26a2ff;
    margin-left: 10px;
    text-decoration: none;
}
.mint-search-list {
    overflow: auto;
    padding-top: 44px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
}

</style>

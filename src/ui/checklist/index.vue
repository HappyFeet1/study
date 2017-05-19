<template>
  <div @change="$emit('change', currentValue)" class="mint-checklist" :class="{ 'is-limit': max <= currentValue.length }">
    <label class="mint-checklist-title" v-text="title"></label>
    <x-cell v-for="(option,index) in options" :key="index">
      <label class="mint-checklist-label" slot="title">
        <span
          :class="{'is-right': align === 'right'}"
          class="mint-checkbox">
          <input
            class="mint-checkbox-input"
            type="checkbox"
            v-model="currentValue"
            :disabled="option.disabled"
            :value="option.value || option">
          <span class="mint-checkbox-core"></span>
        </span>
        <span class="mint-checkbox-label" v-text="option.label || option"></span>
      </label>
    </x-cell>
  </div>
</template>

<script>
import XCell from '@/ui/cell/';
/**
 * mt-checklist
 * @module components/checklist
 * @desc 复选框列表，依赖 cell 组件
 *
 * @param {(string[]|object[])} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
 * @param {string[]} value - 选中值的数组
 * @param {string} title - 标题
 * @param {number} [max] - 最多可选的个数
 * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
 *
 *
 * @example
 * <mt-checklist :v-model="value" :options="['a', 'b', 'c']"></mt-checklist>
 */
export default {
  name: 'mt-checklist',

  props: {
    max: Number,
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: Array
  },

  components: { XCell },

  data() {
    return {
      currentValue: this.value
    };
  },

  computed: {
    limit() {
      return this.max < this.currentValue.length;
    }
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      if (this.limit) val.pop();
      this.$emit('input', val);
    }
  }
};
</script>

<style lang="css">
  .mint-checklist .mint-cell {
    padding: 0;
}
.mint-checklist.is-limit .mint-checkbox-core:not(:checked) {
    background-color: #d9d9d9;
    border-color: #d9d9d9;
}
.mint-checklist-label {
    display: block;
    padding: 0 10px;
}
.mint-checklist-title {
    color: #888;
    display: block;
    font-size: 12px;
    margin: 8px;
}
.mint-checkbox {}
.mint-checkbox.is-right {
    float: right;
}
.mint-checkbox-label {
    vertical-align: middle;
    margin-left: 6px;
}
.mint-checkbox-input {
    display: none;
}
.mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #26a2ff;
    border-color: #26a2ff;
}
.mint-checkbox-input:checked + .mint-checkbox-core::after {
    border-color: #fff;
    -webkit-transform: rotate(45deg) scale(1);
            transform: rotate(45deg) scale(1);
}
.mint-checkbox-input[disabled] + .mint-checkbox-core {
    background-color: #d9d9d9;
    border-color: #ccc;
}
.mint-checkbox-core {
    display: inline-block;
    background-color: #fff;
    border-radius: 100%;
    border: 1px solid #ccc;
    position: relative;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}
.mint-checkbox-core::after {
    border: 2px solid transparent;
    border-left: 0;
    border-top: 0;
    content: " ";
    top: 3px;
    left: 6px;
    position: absolute;
    width: 4px;
    height: 8px;
    -webkit-transform: rotate(45deg) scale(0);
            transform: rotate(45deg) scale(0);
    -webkit-transition: -webkit-transform .2s;
    transition: -webkit-transform .2s;
    transition: transform .2s;
    transition: transform .2s, -webkit-transform .2s;
}
</style>

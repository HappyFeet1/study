<template>
  <x-cell
    class="mint-field"
    :title="label"
    v-clickoutside="doCloseActive"
    :class="[{
      'is-textarea': type === 'textarea',
      'is-nolabel': !label
    }]">
    <textarea
      @change="$emit('change', currentValue)"
      ref="textarea"
      class="mint-field-core"
      :placeholder="placeholder"
      v-if="type === 'textarea'"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      v-model="currentValue">
    </textarea>
    <input
      @change="$emit('change', currentValue)"
      ref="input"
      class="mint-field-core"
      :placeholder="placeholder"
      :number="type === 'number'"
      v-else
      :type="type"
      @focus="active = true"
      :disabled="disabled"
      :readonly="readonly"
      :value="currentValue"
      @input="handleInput">
    <div
      @click="handleClear"
      class="mint-field-clear"
      v-if="!disableClear"
      v-show="currentValue && type !== 'textarea' && active">
      <i class="mintui mintui-field-error"></i>
    </div>
    <span class="mint-field-state" v-if="state" :class="['is-' + state]">
      <i class="mintui" :class="['mintui-field-' + state]"></i>
    </span>
    <div class="mint-field-other">
      <slot></slot>
    </div>
  </x-cell>
</template>

<script>
import XCell from '@/ui/cell/';
import Clickoutside from '@/ui/utils/clickoutside';


/**
 * mt-field
 * @desc 编辑器，依赖 cell
 * @module components/field
 *
 * @param {string} [type=text] - field 类型，接受 text, textarea 等
 * @param {string} [label] - 标签
 * @param {string} [rows] - textarea 的 rows
 * @param {string} [placeholder] - placeholder
 * @param {string} [disabled] - disabled
 * @param {string} [readonly] - readonly
 * @param {string} [state] - 表单校验状态样式，接受 error, warning, success
 *
 * @example
 * <mt-field v-model="value" label="用户名"></mt-field>
 * <mt-field v-model="value" label="密码" placeholder="请输入密码"></mt-field>
 * <mt-field v-model="value" label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></mt-field>
 * <mt-field v-model="value" label="邮箱" placeholder="成功状态" state="success"></mt-field>
 */
export default {
  name: 'mt-field',

  data() {
    return {
      active: false,
      currentValue: this.value
    };
  },

  directives: {
    Clickoutside
  },

  props: {
    type: {
      type: String,
      default: 'text'
    },
    rows: String,
    label: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    disableClear: Boolean,
    state: {
      type: String,
      default: 'default'
    },
    value: {},
    attr: Object
  },

  components: { XCell },

  methods: {
    doCloseActive() {
      this.active = false;
    },

    handleInput(evt) {
      this.currentValue = evt.target.value;
    },

    handleClear() {
      if (this.disabled || this.readonly) return;
      this.currentValue = '';
    }
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      this.$emit('input', val);
    },

    attr: {
      immediate: true,
      handler(attrs) {
        this.$nextTick(() => {
          const target = [this.$refs.input, this.$refs.textarea];
          target.forEach(el => {
            if (!el || !attrs) return;
            Object.keys(attrs).map(name => el.setAttribute(name, attrs[name]));
          });
        });
      }
    }
  }
};
</script>

<style lang="css">
.mint-field {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.mint-field .mint-cell-title {
    width: 105px;
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
}
.mint-field .mint-cell-value {
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.mint-field.is-nolabel .mint-cell-title {
    display: none;
}
.mint-field.is-textarea {
    -webkit-box-align: inherit;
        -ms-flex-align: inherit;
            align-items: inherit;
}
.mint-field.is-textarea .mint-cell-title {
    padding: 10px 0;
}
.mint-field.is-textarea .mint-cell-value {
    padding: 5px 0;
}
.mint-field-core {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    outline: 0;
    line-height: 1.6;
    font-size: inherit;
    width: 100%;
}
.mint-field-clear {
    opacity: .2;
}
.mint-field-state {
    color: inherit;
    margin-left: 20px;
}
.mint-field-state .mintui {
    font-size: 20px;
}
.mint-field-state.is-default {
    margin-left: 0;
}
.mint-field-state.is-success {
    color: #4caf50;
}
.mint-field-state.is-warning {
    color: #ffc107;
}
.mint-field-state.is-error {
    color: #f44336;
}
.mint-field-other {
    top: 0;
    right: 0;
    position: relative;
}

</style>

<template>
  <div class="container">

    <mt-header title="CheckList">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <mt-checklist
      class="page-part"
      title="复选框列表"
      v-model="value1"
      :options="options1">
    </mt-checklist>

    <div>
      <mt-cell title="选中的项">{{ value1 }}</mt-cell>
    </div>

    <mt-checklist
      class="page-part"
      title="第二个复选框列表"
      v-model="value2"
      :options="options2">
    </mt-checklist>

    <div>
      <mt-cell title="选中的项">{{ value2 }}</mt-cell>
    </div>

    <mt-checklist
      class="page-part"
      title="最多选两个"
      :max="2"
      v-model="value3"
      :options="options3">
    </mt-checklist>

    <div>
      <mt-cell title="选中的项">{{ value3 }}</mt-cell>
    </div>

    <mt-checklist
      align="right"
      class="page-part"
      title="右对齐"
      v-model="value4"
      :options="options4">
    </mt-checklist>
  </div>
</template>

<script>
import checklist from '@/ui/checklist/';
export default {
  name: 'page-checklist',

  data() {
    return {
      value1: [],
      value2: ['选中禁用的值'],
      value3: ['选项A'],
      value4: []
    };
  },

  created() {
    this.options1 = ['选项A', '选项B', '选项C'];
    this.options3 = ['选项A', '选项B', '选项C', '选项D'];
    this.options4 = ['选项A', '选项B', '选项C', '选项D'];
    this.options2 = [
      {
        label: '被禁用',
        value: '值F',
        disabled: true
      },
      {
        label: '选中禁用',
        value: '选中禁用的值',
        disabled: true
      },
      {
        label: '选项A',
        value: '值A'
      },
      {
        label: '选项B',
        value: '值B'
      }
    ];
  },
  components: {
      'mt-checklist':checklist
  }
};
</script>

<style lang="css">
  .page-checklist .page-part {
    margin-top: 40px;
  }
</style>

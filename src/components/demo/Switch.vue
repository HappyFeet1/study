<template>
  <div class="page-switch">
    <mt-header title="Switch">
            <div slot="left">
                <mt-button icon="back" @click="$router.back()">返回</mt-button>
            </div>
        </mt-header>
    <div class="page-part page-switch-padding">
      <mt-switch v-model="value1" @change="handleChange">
        <label v-text="value1"></label>
      </mt-switch>
    </div>

    <div class="page-part page-switch-padding">
      <mt-switch v-model="value4" @change="handleChange">
        <label v-text="value4"></label>
      </mt-switch>
    </div>

    <mt-cell :title="'选项 ' + value2">
      <mt-switch v-model="value2" @change="handleChange"></mt-switch>
    </mt-cell>
    <mt-cell :title="'选项 ' + value3">
      <mt-switch v-model="value3" @change="handleChange"></mt-switch>
    </mt-cell>
  </div>
</template>

<script>
import Cell from '@/ui/cell/';
import Switch from '@/ui/switch/';
export default {
  name: 'page-switch',

  data() {
    return {
      value1: false,
      value2: false,
      value3: true,
      value4: true
    };
  },

  methods: {
    handleChange(event) {
      console.log(event);
    }
  },
  components: {
      'mt-cell': Cell,
      'mt-switch': Switch
  }
};
</script>

<style lang="css">
  .page-switch-padding{
    padding: 0 10px;
  }
</style>
<template>
    <div class="container">
        <mt-header title="MessageBox">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-msgbox-wrapper">
            <mt-button @click.native="openAlert" size="large">打开 alert 提示框</mt-button>
            <mt-button @click.native="openConfirm" size="large">打开 confirm 提示框</mt-button>
            <mt-button @click.native="openPrompt" size="large">打开 prompt 提示框</mt-button>
        </div>
    </div>
</template>
<style>
.page-msgbox-wrapper {
    padding: 10px 10px 0 10px;
}

.page-msgbox-wrapper button {
    margin-bottom: 10px;
}
</style>

<script type="text/babel">
  export default {
    methods: {
      openAlert() {
        this.$messageBox.alert('操作成功!', '提示');
      },
      openConfirm() {
        this.$messageBox.confirm('确定执行此操作?', '提示');
      },
      openPrompt() {
        const that = this;
        this.$messageBox.prompt(' ', '请输入姓名').then(({ value }) => {
          if (value) {
            that.$messageBox.alert(`你的名字是 ${ value }`, '输入成功');
          }
        });
      }
    }
  };
</script>
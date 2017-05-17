<template>
    <div class="container">
        <mt-header title="Toast">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-toast-wrapper">
            <mt-button @click.native="openToast" size="large">点击弹出 Toast</mt-button>
            <mt-button @click.native="openToastWithIcon" size="large">点击弹出带有 icon 的 Toast</mt-button>
            <mt-button @click.native="openBottomToast" size="large">自定义 Toast icon</mt-button>
        </div>
    </div>
</template>
<style>
.page-toast-wrapper {
    padding: 10px 10px 0 10px;
}

.page-toast-wrapper button {
    margin-bottom: 10px;
}
</style>

<script type="text/babel">
export default {
    methods: {
        openToast() {
            this.$toast('信息');
        },
        openToastWithIcon() {
            this.$toast.success('操作成功');
        }
    }
};
</script>
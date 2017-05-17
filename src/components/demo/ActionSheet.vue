<template>
    <div class="container">
        <mt-header title="ActionSheet">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-toast-wrapper">
            <mt-button @click.native="openAs1" size="large">点击弹出 ActionSheet</mt-button>
            <mt-button @click.native="openAs2" size="large">不带取消按钮的 action sheet</mt-button>
        </div>
        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
        <mt-actionsheet :actions="actions2" v-model="sheetVisible2" cancel-text=""></mt-actionsheet>
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
import ActionSheet from '@/ui/actionsheet/';
export default {
    data() {
        return {
            sheetVisible: false,
            sheetVisible2: false,
            actions: [],
            actions2: []
        }
    },
    methods: {
        openAs1() {
            this.sheetVisible = true;
        },
        openAs2() {
            this.sheetVisible2 = true;
        },
        takePhoto(){},
        openAlbum(){},
        goBack(){
            history.go(-1);
        }
    },
    components: {
        'mt-actionsheet': ActionSheet
    },
    mounted() {
        this.actions = [{
            name: '拍照',
            method: this.takePhoto
        }, {
            name: '从相册中选择',
            method: this.openAlbum
        }];
        this.actions2 = [{
            name: '确定'
        }, {
            name: '返回上一步',
            method: this.goBack
        }];
    }
};
</script>
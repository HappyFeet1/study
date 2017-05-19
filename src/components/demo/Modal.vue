<template>
    <div class="container">
        <mt-header title="Modal">
            <div slot="left">
                <mt-button icon="back" @click="$router.back()">返回</mt-button>
            </div>
        </mt-header>
        <div class="page-msgbox-wrapper">
            <mt-button @click.native="openModalSimple" size="large">打开</mt-button>
            <mt-button @click.native="openModalMulti" size="large">打开 自定义多按键</mt-button>
        </div>
        <router-link to="/field" slot="left">
                <mt-button icon="back">Field</mt-button>
        </router-link>
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
        openModalMulti() {
            this.$modal({
                title:'自定义多按键',
                content: '<p style="color:red">这是内</p>',
                ok: function () { },
                btns: {
                    ok2: {
                        text: 'ok',
                        callback: function () { }
                    },
                    tv: {
                        text: '关闭',
                        callback: function () {

                        }
                    },
                    tv3: {
                        text: '关闭',
                        callback: function () {

                        }
                    }
                }
            });
        },
        openModalSimple(){
            this.$modal({
                title:'温馨提示',
                content:'你的智商只有60？',
                okText:'是的',
                ok:function(){

                },
                cancel:function(){}
            });
        }
    },
    mounted () {

    }
};
</script>
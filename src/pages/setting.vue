<template>
    <div class="index-container">
        <mt-header title="设置">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="cell-container">
            <mt-cell title="个人信息" to="//m.hehenian.com/profile/userinfo.do?flag=auth" is-link>
            </mt-cell>
            <mt-cell title="银行卡管理" to="//m.hehenian.com/profile/managerCard.do" is-link>
            </mt-cell>
            <mt-cell title="修改手机号码" is-link :click="updateMobile">
            </mt-cell>
            <mt-cell title="修改登录密码" to="//m.hehenian.com/account/resetPwdIndex.do?pwdFlag=login" is-link>
            </mt-cell>
            <mt-cell title="修改交易密码" to="//m.hehenian.com/account/resetPwdIndex.do?pwdFlag=pay" is-link>
            </mt-cell>
            <mt-cell title="第三方登录" v-if="isWeiXin" :click="bindWxAccount" is-link>
                <img src="http://static.hehenian.com/m/v2/images/wx_icon.png?v=17e58ad" width="32" height="32" style="margin-right:10px;" >
                <span class="cGreen" v-if="!wxBind">去绑定</span>
                <span class="cRed" v-else>解绑</span>
            </mt-cell>
        </div>
        <div class="btn-container">
            <mt-button type="primary" size="large" @click="loginout" >退出</mt-button>
        </div>
        <script type="text/template" id="payPswTpl">
            <div class="center">
                <div class="payPsw-help">
                    <p>请前往钱生花电脑端官网</p>
                    <p>(www.qianshenghua.com)</p>
                    <p class="cGold">个人中心→安全中心→修改手机号码</p>
                    <p>办理变更业务</p>
                </div>
            </div>
        </script>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import Cell from 'mint-ui/lib/cell/';
import 'mint-ui/lib/cell/style.css';
import verifySafe from '@/common/verifyUpdateMobile';
export default {
    data() {
        return {
            wxBind: false
        }
    },
    components: {
        'mt-cell': Cell
    },
    computed: {
        ...mapState([
            'isWeiXin'
        ])
    },
    methods: {
        updateMobile(){
            verifySafe(()=>{
                this.$router.push({
                    path:'setting/mobileUpdate'
                })
            });
        },
        bindWxAccount() {
            var that = this;
            if (!this.wxBind) {
                this.$modal({
                    title: '微信绑定提示',
                    content: "将授权绑定您在使用的微信号？",
                    ok: function () {
                        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce9367158e4ffd55&redirect_uri=http%3A%2F%2Fm.hehenian.com%2Fweixin%2FauthBind.do&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
                    },
                    cancel: function () { }
                });
            } else {
                this.$modal({
                    title: '微信解绑提示',
                    content: "您是否需要解绑！解绑后将不能实时收到微信变动消息",
                    ok: function () {
                        that.$axios.post('/weixin/unBind.do')
                        .then(res=>{
                            if (res.code == 0) {
                                that.wxBind = false;
                            }
                        });
                    },
                    cancel: function () { }
                });
            }
        },
        loginout(){
            this.$utils.setCookie('msid','');
            this.$toast('退出成功！');
            this.$router.push({name:'main'});
        }
    },
    beforeMount() {
        if (this.isWeiXin) {
            this.$axios.post('/weixin/checkWxBind.do')
                .then(res => {
                    this.wxBind = !!res.code;
                })
        }
    }
}
</script>
<style>
.cell-container {
    margin-top: 10px;
}

.btn-container {
    margin: 20px;
}
</style>



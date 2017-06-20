<template>
    <div class="container">
        <mt-header title="登录">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="top-tips" id="tips">请输入用户名或者手机号码</div>
        <div class="page-part">
            <mt-field label="用户名" v-model="userName" placeholder="用户名/手机号码" :state="userNameState" @click.native="userNameState=''"></mt-field>
            <mt-field label="密　码" type="password" v-model="password" placeholder="请输入密码" :state="passwordState" @click.native="passwordState=''"></mt-field>
            <mt-field label="验证码" v-model="code" v-if="needcode">
                <img :src="'http://m.hehenian.com/common/imageCode.do?pageId=userlogin&_'+timestamp" height="45px" width="100px" @click="updateTime">
            </mt-field>
        </div>
        <div class="form-export">
            <a href="http://m.hehenian.com/account/regIndex.do?redirectUrl=http://m.hehenian.com/#!/mine" class="register cGold">立即注册</a>
            <a href="http://m.hehenian.com/account/resetPwdIndex.do" class="forget-psw cGold">找回密码</a>
        </div>
        <div class="page-button-group">
            <mt-button size="large" :disabled="disabled" type="primary" @click="login">登录</mt-button>
        </div>
    </div>
</template>
<script>
import Field from 'mint-ui/lib/field/';
import 'mint-ui/lib/field/style.css';
export default {
    data() {
        return {
            userName: '',
            password: '',
            userNameState: '',
            passwordState: '',
            code: '',
            needcode: false,
            timestamp: +new Date
        }
    },
    computed: {
        disabled() {
            return this.userName && this.password ? false : true;
        }
    },
    methods: {
        login() {
            if (this.checkUseName() && this.checkPsw()) {
                this.$axios.post('/login/login.do', {
                    userName: this.userName,
                    password: this.password,
                    code: this.code
                }).then(data => {
                    if (data.result === 0) {
                        this.toast(data.msg);
                        this.$router.back();
                    } else if (data.result === 2) {
                        this.toast(this.needcode ? data.msg : '请输入验证码');
                        this.needcode = true;
                    } else if (data.result === 3) {
                        this.toast(data.msg);
                    } else {
                        this.toast(data.msg || '登录失败');
                    }
                });
            }

        },
        updateTime() {
            this.timestamp = +new Date;
        },
        checkUseName() {
            let check = (this.userName).replace(/\s/g, '').replace(/[\u4e00-\u9fa5]/g, '**').length > 3;
            if (!check) {
                this.toast('用户名格式错误！');
            }
            this.userNameState = check ? 'success' : 'error';
            return check;
        },
        checkPsw() {
            let check = (this.password).replace(/\s/g, '').replace(/[\u4e00-\u9fa5]/g, '**').length > 3;
            if (!check) {
                this.toast('密码格式错误！');
                this.passwordState = check ? 'success' : 'error';
            }
            return check;
        }
    },
    components: {
        'mt-field': Field
    }
}
</script>
<style>
.top-tips {
    color: #CDCDCD;
    font-size: 12px;
    padding-top: 10px;
    padding-left: 10px;
}
.page-part {
    margin-top: 10px;
}
.form-export {
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.form-export .register {
    float: left;
}
.form-export .forget-psw {
    float: right;
}
.form-export a {
    display: block;
}
.page-button-group {
    margin: 10px;
}
</style>




<template>
    <div class="container update-mobile">
        <mt-header title="修改手机号">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div v-show="step==1">
            <div class="top-tips">1/2. 请输入新手机号码</div>
            <div class="page-part">
                <mt-field 
                label="新手机号" 
                v-model.trim="mobile" 
                placeholder="请输入新手机号码" 
                :state="mobileState"
                @click.native="mobileState=''">
                </mt-field>
            
                <mt-field label="短信验证码" 
                v-model.trim="code" 
                :state="codeState"
                placeholder="短信验证码"
                @click.native="codeState=''">
                    <mt-button size="small" type="primary" @click="getCode()" :disabled="countTime!==120">
                        {{countTime==120?'免费获取':countTime+'秒'}}
                    </mt-button>
                </mt-field>
            
            </div>
            <div class="page-button-group">
                <mt-button size="large" type="primary" @click="checkMobile()">确定</mt-button>
            </div>
        </div>
        <div v-show="step==2">
            <div class="top-tips">2/2. 修改手机号需要支付密码验证</div>
            <div class="page-part">
                <mt-field 
                label="支付密码"
                type="password"
                v-model.trim="payPsw" 
                placeholder="请输入支付密码" 
                :state="payPswState"
                @click.native="payPswState=''">
                </mt-field>
            </div>
            <div class="form-export">
                <a href="javascript:;"></a>
                <a href="javascript:;" @click="forgetPayPsw()">忘记支付密码</a>
            </div>
            <div class="page-button-group">
                <mt-button size="large" type="primary" @click="checkPayPsw()">确定</mt-button>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.update-mobile {
    background: #fff;
    .top-tips {
        color: #CDCDCD;
        font-size: 12px;
        padding: 10px 0 0 10px;
    }
    .page-part {
        margin-top: 10px;
    }
    .page-button-group{margin: 30px 10px;}
    .form-export { padding:10px 10px 0 10px;display: -webkit-box; display: -webkit-flex; display: flex; height: 20px; line-height: 20px; }
    .form-export a { display: block; font-size: 12px; color: #DBA955; display: block; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; }
    .form-export a:last-child { text-align: right; }
}
</style>
<script>
import MtField from 'mint-ui/lib/field/';
import 'mint-ui/lib/field/style.css';
export default {
    data() {
        return {
            mobile     : '13688089999',
            mobileState: '',
            code       : '',
            codeState  : '',
            countTime  : 120,
            hasGetCode : false,
            payPsw     : '',
            payPswState: '',
            step       : 1
        }
    },
    methods:{
        checkPhone(){
            if(!this.mobile.length){
                this.mobileState = 'error';
                this.$toast('请输入手机号码');
                return false;
            }
            if(!this.$utils.checkPhone(this.mobile)){
                this.mobileState = 'error';
                this.$toast('手机号码格式错误');
                return false;
            }
            return true;
        },
        checkCode(){
            if(!this.code.length){
                this.codeState = 'error';
                this.$toast('请输入短信验证码');
                return false;
            }
            if(this.code.length<4){
                this.codeState = 'error';
                this.$toast('短信验证码错误');
                return false;
            }
            return true;
        },
        checkMobile(){
            if(!this.hasGetCode){
                this.$toast('请先获取短信验证码');
                return;
            }
            if(!this.checkPhone()){
                return;
            }
            if(!this.checkCode()){
                return;
            }
            this.$axios.post('/profile/checkCode.do',{newMobilePhone:this.mobile,code: this.code})
            .then(res=>{
                res = res.result;
                if(res == 1){
                    this.$toast('手机号码已经存在！');
                }else if(res == 2){
                    this.$toast('短信验证码错误！');
                }else if(res == 3){
                    this.step = 2;
                    this.$toast('手机短信验证成功！','info');
                }else if(res == 4){
                    this.illegalModal();
                }
            });
        },
        countDown(){
            let interval = setInterval( () => {
                if (!--this.countTime) {
                    clearInterval(interval);
                    this.countTime=120;
                    return;
                }
            }, 1000);
        },
        asyncGetCode(val, modal){
            if(!val){
                this.$toast('请输入图像验证码');
            }else if(val.length<4){
                this.$toast('图像验证码错误');
            }else{
                this.$axios.post('/login/checkCode.do',{code: val, mobile: this.mobile})
                .then(res=>{
                    if (res.result == 1) {
                        this.$toast("验证码错误");
                    }else{
                        modal.close();
                        this.$axios.post('/common/sendPhoneVirifyCode.do',{
                            mobilePhone: this.mobile,
                            bizType: 'register',
                            sign: res.sign
                        })
                        .then(response=>{
                            if (response.ret == 1) {
                                this.$toast("发送验证码失败");
                            } else if (response.ret == 2) {
                                this.$toast("手机号码不存在");
                            } else if (response.ret == 3) {
                                this.$toast("手机号码已存在");
                            } else {
                                this.countDown();
                                this.$toast("手机短信验证已经发送！",'info');
                                this.hasGetCode = true;
                            }
                        })
                        .catch(e=>{
                            this.$toast('服务器出错');
                        });
                    }
                })
                // .catch(e=>{
                //     this.$toast('服务器出错');
                // });
            }
        },
        getCode(){
            if(!this.checkPhone()){
                return;
            }
            let that  = this,
                src   = '/common/imageCode.do?pageId=userlogin&d=',
                modal = this.$modal({
                title: '请输入图片验证码',
                content: '<input id="valCode" type="text" placeholder="验证码" style="width:9em;display:inline;height:40px;border:1px solid #ccc;padding:0 8px;" /> <img style="backround:#eee" id="getcode_" class="js-code" src="' +(src+new Date)+ '" width="80" height="40">',
                ok: function() {
                    var val = document.getElementById('valCode').value.trim();
                    that.asyncGetCode(val, modal.modal);
                    return false;
                },
                onshow: function() {
                    document.getElementById('getcode_').addEventListener('click', function(){
                        this.src = src + (+new Date);
                    });
                },
                cancel: function() {}
            })
        },
        checkPayPsw(){
            if(!this.payPsw){
                this.$toast('请输入支付密码');
                return;
            }else if(this.payPsw.length<4){
                this.$toast('支付密码错误');
                return;
            }else{
                this.$axios.post('/profile/validatePayPwd.do',{
                    newMobilePhone: this.mobile,
                    payPwd: this.payPsw
                })
                .then(res=>{
                    res = res.result;
                    if(res == 1){
                        this.$toast("支付密码错误");
                    }else if(res == 2){
                        this.illegalModal();
                    }else if(res == 0){
                        this.$modal({
                            title: '修改成功',
                            content: '<p style="padding:1em 0;">手机号码修改成功，<br>需要重新登录！</p>',
                            okText:'立即登录',
                            ok: function() {
                                location.href = "http://m.hehenian.com/login/loginout.do";
                            }
                        });
                    }
                });
            }
        },
        illegalModal(){
            let that = this;
            this.$modal({
                title: '温馨提示',
                content: '<p style="padding:1em 0;">您的账号未 <span class="cRed">实名认证</span>,<br>或未设置 <span class="cRed">支付密码</span> ，<br>不可更改手机号！</p>',
                okText:'立即设置',
                ok: function() {
                    that.$router.push({
                        path:'/setting'
                    });
                },
                cancel: function() {}
            });
        },
        forgetPayPsw(){
            this.$toast({
                title:'温馨提示',
                content: '<p style="padding:2em 0;">确定离开页面！</p>',
                ok: function(){
                    location.href = 'http://m.hehenian.com/account/resetPwdIndex.do?pwdFlag=pay';
                },
                cancel: function(){}
            });
        }
    },
    components: {
        MtField
    }
}
</script>


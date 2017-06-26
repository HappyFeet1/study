<template>
    <div class="container">
        <mt-header title="散标详情">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="target">
            <div class="title">
                {{info.borrowTitle}}
                <span>（{{info.businessNo}}）</span>
            </div>
            <div class="info">
                <div class="info_item">
                    <p>{{info.annualRate*(info.annualRate>1?1:100)}}%</p>
                    <p>预期年化收益率</p>
                </div>
                <div class="info_item">
                    <p>{{info.borrowAmount|fixed2}}元</p>
                    <p>标的总额</p>
                </div>
                <div class="info_item">
                    <p>{{info.deadline}}</p>
                    <p>借款期限</p>
                </div>
            </div>
            <div class="target_list">
                <ul>
                    <li>
                        <label>投资进度：</label>
                        <div class="text">
                            <div class="bar">
                                <div class="cur_bar" :style="{width: info.loanProgress+'%'}"></div>
                            </div>
                        </div>
                        <div class="bar_text">
                            {{info.loanProgress}}%
                        </div>
                    </li>
                    <li>
                        <label>已投人数：</label>
                        <div class="text">
                            <span class="org">{{info.investNum}}人</span>
                        </div>
                    </li>
                    <li>
                        <label>还款方式：</label>
                        <div class="text">{{info.paymentMode}}</div>
                    </li>
                    <li>
                        <label>起息时间：</label>
                        <div class="text">项目满标放款后的次日</div>
                    </li>
                    <li>
                        <label>风险提示：</label>
                        <div class="text">
                            <router-link to="/help/debtSafe" class="link">详情参见钱生花风险提示</router-link>
                        </div>
                    </li>
                    <li>
                        <label>安全保障：</label>
                        <div class="text">
                            <router-link to="/help/3safe" class="link">详情参见钱生花安全保障</router-link>
                        </div>
                    </li>
                </ul>
                <div :class="'status status-'+info.borrowStatus"></div>
            </div>
    
            <div class="buy_content">
                <div class="buy_money">
                    <p>{{info.surplusAmount|formatNumber}}元</p>
                    <span>该项目剩余可投金额</span>
                </div>
                <div class="buy_recharge">
                    账户余额：
                    <span>{{info.balanceAmount|formatNumber}}元</span>
                    <a :href="rechargeUrl">充值</a>
                </div>
                <!-- <div class="buy_text">请输入您要投资的金额</div> -->
                <div class="buy_input">
                    <input type="text" placeholder="输入的金额须为100的倍数" v-model="amount">元
                </div>
                <div class="buy_note" style="padding:5px 0 10px;">*只能使用平台余额购买</div>
                <!-- <div class="buy_text">请输入您收到的短信验证码</div> -->
                <div class="buy_code">
                    <input type="text" v-model="identifyCode" placeholder="请输入手机收到的验证码">
                    <span class="getCode" :class="{disabled:countTime!==120}" @click="getIdentifyCode()">{{countTime==120?'免费获取':countTime+'秒'}}</span>
                </div>
                <p class="buy_note" style="font-size:12px;padding:15px 0 0;">*提醒：为保障您合法的权益我们将发送验证码，输入验证码表明您本人已同意签署《信息调用授权委托书》</p>
    
                <!-- <div class="buy_note buy_note2">您输入的验证码错误，请重新输入</div>		 -->
                <div @click="toggleCheck()" class="buy_protol" :class="{'buy_protol_checked':checked}">我已阅读并同意
                    <span>丨《
                        <a href="http://m.hehenian.com/finance/authorize.do">信息调用授权委托书</a>》</span>
                </div>
            </div>
    
        </div>
        <div class="target_btn" ref="fixBtn" v-show="info.borrowStatus==1">
            <a href="javascript:;">确定投标</a>
        </div>
    </div>
</template>
<script>
import verifyPay   from '@/common/verifyPay.js';
import payPassword from '@/common/payPassword.js';
let interval = null;
export default {
    data() {
        return {
            amount      : '',
            identifyCode: '',
            info        : {},
            countTime   : 120,
            checked     : true,
            hasGetCode  : false,
            psw         : '',
            businessNo  : this.$route.query.businessNo,
            rechargeUrl : 'http://m.hehenian.com/balance/chargePage.do?goBackUrl=' + encodeURIComponent(location.href),
        }
    },
    methods: {
        toggleCheck: function () {
            this.checked = !this.checked;
        },
        asyncData: function () {
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$axios.get('/loan/loanInfo.do', { params: { businessNo: this.businessNo } })
                .then(res => {
                    this.$indicator.close();
                    if (res.code === -1) {
                        this.$toast('服务器响应失败');
                    }
                    let periodsCompany = res.loanInfo.periodsCompany == '月' ? "个" + res.loanInfo.periodsCompany : res.loanInfo.periodsCompany;
                    this.info = {
                        borrowTitle:     res.loanInfo.loanTitle,
                        deadline:        res.loanInfo.bidDay + periodsCompany,
                        borrowAmount:    res.loanInfo.borrowAmount,
                        annualRate:      res.loanInfo.investAnnualRate,
                        loanProgress:    res.loanInfo.borrowProgress,
                        hasInvestAmount: res.loanInfo.investedAmount,
                        investNum:       res.loanInfo.investNum,
                        paymentMode:     res.loanInfo.repayWay,
                        businessNo:      res.loanInfo.businessNo,
                        surplusAmount:   res.loanInfo.surplusAmount,
                        borrowStatus:    res.loanInfo.borrowStatus,
                        balanceAmount:   res.balanceAmount
                    }
                })
        },
        getIdentifyCode(){
            verifyPay(()=>{
                this.countDown();
                this.$axios.post('/common/sendPhoneVirifyCode.do')
                .then(res=>{
                    if (res.ret == 1) {
                        this.$toast("发送验证码失败");
                    } else if (res.ret == 2) {
                        this.$toast("手机号码不存在");
                    } else if (res.ret == 3) {
                        this.$toast("手机号码已存在");
                    } else {
                        this.countDown();
                        this.$toast("发送验证码成功");
                        this.hasGetCode = true;
                    }
                })
            });
        },
        countDown(){
            interval = setInterval( () => {
                if (!--this.countTime) {
                    clearInterval(interval);
                    this.countTime=120;
                    return;
                }
            }, 1000);
        },
        buyBtn(){
            if (!this.checked) {
                this.$toast('必须同意协议');
                return;
            }
            if (!this.amount) {
                this.$toast('请输入投资金额');
                return;
            }
            if(this.amount%100!==0){
                this.$toast('输入的金额须为100的倍数');
                return;
            }
            if (!this.hasGetCode) {
                this.$toast('请先获取短信验证码');
                return;
            }
            if (!this.identifyCode) {
                this.$toast('请输入短信验证码');
                return;
            }
            if (this.identifyCode < 4) {
                this.$toast('短信验证码错误');
                return;
            }
            if(this.amount>this.info.balanceAmount){
                this.$toast('余额不足，无法购买');
                return;
            }

            this.verifyPay(()=>{
                this.payPassword(psw=>{
                    this.psw = psw;
                    this.payOrder();
                });
            });
        },
        payOrder(){
            this.$axios.post('/loan/borrowInvest.do', {
                businessNo  : this.info.businessNo,
                amount      : this.amount,
                identifyCode: this.identifyCode,
                payPassword : this.psw
            })
            .then(res=>{
                if (res.retCode == '000') {
                    this.$toast ('购买成功！', 'info');
                    location.href = 'http://m.hehenian.com/profile/hfRecord.do';
                } else if (res.retCode == '001') {
                    this.$toast (res.retMsg);
                } else {
                    this.$toast (res.retMsg || '服务异常，购买失败！');
                }
            })
        }
    },
    beforeMount(){
        interval = null;
        this.asyncData();
    },
    mounted(){
        document.body.appendChild(this.$refs.fixBtn);
    },
    beforeDestroy(){
        this.$refs.fixBtn.parentNode.removeChild(this.$refs.fixBtn);
    }
}
</script>
<style>
@import '../../static/debt.css';
</style>

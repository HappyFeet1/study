<template>
    <div class="conainer">
        <mt-header title="账户余额">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="balance-banner">
            <h3 class="title">账户余额（元）</h3>
            <ul>
                <li class="item">
                    <p>{{view.balance|formatNumber}}
                        <span>平台</span>
                    </p>
                </li>
                <li class="mid">
                    <p>+</p>
                </li>
                <li class="item">
                    <p>{{view.chinaPNRBalance|formatNumber}}
                        <span>汇付天下</span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="account-pannel">
            <div class="btns">
                <a href="javascript:;" @click="recharge()">充 值</a>
                <a href="javascript:;" @click="withdraw()">提 现</a>
            </div>
        </div>
        <div class="cell-container">
            <mt-cell title="充值记录" to="http://m.hehenian.com/balance/chargeList.do" is-link>
            </mt-cell>
            <mt-cell title="提现记录" to="http://m.hehenian.com/balance/withdrawList.do" is-link>
            </mt-cell>
        </div>
    </div>
</template>
<script>
import  Cell       from     'mint-ui/lib/cell/';
import  verifyPay  from     '@/common/verifyPay';
import 'mint-ui/lib/cell/style.css';
export default {
    data() {
        return {
            view: {}
        }
    },
    methods: {
        asyncData() {
            this.$axios.get('/api/mineAccount.do')
                .then(res => {
                    if (res.code === 0) {
                        this.view = res.data;
                    } else if (res.code === -1) {
                        this.$router.push({ path: '/login' });
                    } else if (res.code === 1) {
                        this.$toast(res.msg);
                    }
                });
        },
        recharge() {
            verifyPay(() => {
                location.href = 'http://m.hehenian.com/balance/chargePage.do';
            });
        },
        withdraw() {
            let that = this;
            if (parseFloat(this.view.balance) + parseFloat(this.view.chinaPNRBalance) > 0) {
                this.$modal({
                    title: '请选择您要提现的金额账户',
                    content: '<style>.withdrawals a{display:inline-block;padding:15px 30px;color: #DDAD58;}</style><p class="withdrawals"><a style="border-right:1px solid #ccc;" href="http://m.hehenian.com/chinapnr/webappCash.do">汇付账户</a><a id="platBtn" href="javascript:;">平台账户</a></p>',
                    cancelText: '取消',
                    open:function(){
                        document.getElementById('platBtn').onclick=function(){
                            verifyPay(() => {
                                location.href = 'http://m.hehenian.com/balance/withdrawPage.do';
                            });
                        }
                    },
                    cancel: function () { }
                });
            } else {
                this.$toast('账户没有可提现的余额！');
            }
        }
    },
    beforeMount() {
        this.asyncData();
    },
    components: {
        'mt-cell': Cell
    }
}
</script>

<style>
.balance-banner{height:128px;background-image:url(http://static.hehenian.com/m/v4/images/balance_banner.jpg);-webkit-background-size:cover;background-size:cover;background-position:50% 50%;color:#fff;}
.balance-banner .title{text-align:center;font-size:16px;padding:20px 0 5px;font-weight:bold;}
.balance-banner ul{font-size:26px;text-align:center;}
.balance-banner ul li{display:inline-block;}
.balance-banner ul li.mid{width:1em;text-align:center;}
.balance-banner p{position:relative;min-width: 2em;}
.balance-banner p span{position:absolute;bottom:-1.2em;font-size:12px;left:0;}
.balance-btns{display:-webkit-box;display:-webkit-flex;display:flex;background:#fff;padding:20px 0;}
.balance-btns a{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:16px;background:#D7A34F;color:#fff;text-align:center;height:50px;line-height:50px;margin:0 30px;border-radius:25px;}
.balance-btns a:active{background:#A2793B;}

.account-pannel{background-color:#fff;text-align:center;margin:5px 0;border-top:1px solid #DCDCDC;border-bottom:1px solid #DCDCDC;}
.account-pannel .btns{display:-webkit-box;display:-webkit-flex;display:flex;padding:15px 0;text-align: center;}
.account-pannel .btns a{height:46px;line-height:46px;border-radius:23px;background-color:#DC9F2B;-webkit-box-flex:1;-webkit-flex:1;flex:1;margin:0 17px;color:#fff;}
.account-pannel .btns a:active{background-color:#CE7C00;}
</style>

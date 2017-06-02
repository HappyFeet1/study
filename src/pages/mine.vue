<template>
    <div class="mine">
        <div class="info-pannel">
            <a class="link" href="javascript:history.go(-1);">返回</a>
            <h2 class="title">我的账户</h2>
            <a class="total" href="#!/overview/asset">
                <h3>我的总资产(元)
                    <i class="icon icon-eye" :class="{'icon-eye-close':hide=='****'}" @click.stop.prevent="toggleHide()"></i>
                </h3>
                <p>{{hide||formatNumber(data.totalAssets)}}</p>
            </a>
            <ul class="sub-list">
                <li>
                    <h3>
                        <a href="#!/overview/total">累计收益(元)</a>
                        <i @click="incomeDialog('totalIncomeDialog')" class="icon icon-help"></i>
                    </h3>
                    <p>{{hide||formatNumber(data.totalInteres)}}</p>
                </li>
                <li>
                    <h3>
                        <a href="#!/overview/yesterday">昨日收益(元)</a>
                        <i @click="incomeDialog('yesterdayIncomeDialog')" class="icon icon-help"></i>
                    </h3>
                    <p>{{hide||formatNumber(data.yesterdayInteres)}}</p>
                </li>
            </ul>
        </div>
        <div class="account-pannel">
            <ul>
                <li>
                    <a href="javascript:;">
                        <h3>账户余额(元)</h3>
                        <p>{{hide||formatNumber(data.balance)}}</p>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <h3>汇付余额(元)</h3>
                        <p>{{hide||formatNumber(data.chinaPNRBalance)}}</p>
                    </a>
                </li>
            </ul>
            <div class="btns">
                <a href="javascript:;" ms-click="recharge()">充 值</a>
                <a href="javascript:;" ms-click="withdraw()">提 现</a>
            </div>
        </div>
        <div class="mine-menu">
            <div>
                <a href="#!/overview/asset">
                    <i class="icon icon-investment"></i>
                    <p>我的投资</p>
                </a>
                <a href="http://m.hehenian.com/page/h5/profile/bill_list.html">
                    <i class="icon icon-accout"></i>
                    <p>我的账单</p>
                </a>
                <a v-if="channel===0" href="http://m.hehenian.com/profile/financialPlannerReward.do">
                    <i class="icon icon-award"></i>
                    <p>理财师奖励</p>
                </a>
                <a href="#!/setting">
                    <i class="icon icon-setting"></i>
                    <p>设置</p>
                </a>
            </div>
            <div v-if="channel===0">
                <a href="#!/vip">
                    <i class="icon icon-vipClub"></i>
                    <p>VIP俱乐部</p>
                </a>
                <a href="#!/helper">
                    <i class="icon icon-helper"></i>
                    <p>助手</p>
                </a>
                <a href="javascript:;"></a>
                <a href="javascript:;"></a>
            </div>
        </div>
    
        <script type="text/template" id="totalIncomeDialog">
            <h2>累计收益计算说明</h2>
            <p>累计收益：是指持有中未到期的全部钱生花理财产品当前所获得的预计收益总和。（以投资金额计算）</p>
            <p class="formula">累计收益 = 投资金额 x 理财产品预期年化收益率 x 理财产品期限 ÷ 12 x 已投资天数（当前日期-计息日期）÷ 投资天数（赎回日期-计息日期）</p>
            <p>（注意：已经赎回理财产品不参与计算、计息日期为购买第二天）</p>
            <span>此数据仅供参考，实际收益以具体到账为准</span>
            <a href="javascript:;" class="close"></a>
        </script>
        <script type="text/template" id="yesterdayIncomeDialog">
            <h2>昨日收益计算说明</h2>
            <p>昨日收益：是指持有中全部的钱生花理财产品，每日获得的收益总和。（以投资金额计算）</p>
            <p class="formula">昨日收益 = 投资金额 x 理财产品预期年化收益率 x 理财产品期限 ÷ 12 ÷ 投资天数（赎回日期 - 计息日期）</p>
            <p>（注意：已经赎回理财产品不参与计算、计息日期为购买第二天）</p>
            <span>此数据仅供参考，实际收益以具体到账为准</span>
            <a href="javascript:;" class="close"></a>
        </script>
        <script type="text/template" id="redeemModal">
            <div class="redeem_con">
                <div class="redeem_main">
                    <div class="redeem_img">
                        <img src="http://static.hehenian.com/p_v2/images/redeem_title.png?v=63fe9d1" alt="">
                    </div>
                    <div class="redeem_info">
                        <p>
                            <strong>尊敬的主人</strong>
                        </p>
                        <p>您的{{data.redeemData.product_name}}已到期</p>
                        <p>小花为您赚了
                            <span class="cRed">￥{{data.redeemData.income}}（{{(data.redeemData.rate*100).toFixed(2)}}%）</span>
                        </p>
                        <p>莫让钱生锈，继续钱生花!</p>
                    </div>
                </div>
            </div>
        </script>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Mine from '@/store/modules/mine.js';
const localHide = localStorage.getItem('hideMoney');
export default {
    data() {
        return {
            hide: (localHide === '****' || localHide === null) ? '****' : false,
        }
    },
    computed: {
        ...mapState('Mine', {
            data: state => state.data
        }),
        ...mapState([
            'channel'
        ])
    },
    methods: {
        toggleHide() {
            this.hide = this.hide ? false : '****';
            localStorage.setItem('hideMoney', this.hide);
        },
        formatNumber(val) {
            return (Vue.filter('formatNumber'))(val)
        },
        incomeDialog(targetId) {
            this.$modal({
                title: false,
                skinClass: 'rate-tip',
                content: document.getElementById(targetId).innerHTML,
                onshow: function (modal) {
                    var that = this;
                    modal.addEventListener('click', function (e) {
                        if (e.target.className === 'close') {
                            that.close();
                        }
                    })
                }
            });
        }
    },
    beforeCreate() {
        this.$store.registerModule('Mine', Mine);
        this.$store.dispatch('Mine/syncDate');
    },
    destroyed() {
        this.$store.unregisterModule('Mine');
    },
    mounted() {
        var mineState = this.$store.state.Mine;
        if (mineState.data.income > 0) {
            this.$modal({
                title: '温馨提示',
                okText: '继续投资',
                content: document.getElementById('redeemModal').innerHTML,
                ok: function () {
                    location.href = `http://m.hehenian.com/product/plist.do?channel=${mineState.data.redeemData.channel}&subChannel=${mineState.data.redeemData.sub_channel}`
                },
                cancel: function () {}
            });
        }
    }
}
</script>

<style>
.info-pannel .link {
    position: absolute;
    height: 44px;
    line-height: 44px;
    left: 0;
    top: 0;
    width: 66px;
    overflow: hidden;
    color: #aaa;
    font-size: 14px;
    text-indent: 18px;
}

.info-pannel .link:before {
    content: '';
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    border-top: 1px solid #aaa;
    border-left: 1px solid #aaa;
    top: 17px;
    left: 16px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    pointer-events: none;
}

.info-pannel .link:before {
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
}

.info-pannel .link {
    text-indent: -999px;
}

.info-pannel {
    height: 279px;
    background-image: url(http://static.hehenian.com/m/v4/images/mine_banner_bg.jpg);
    -webkit-background-size: cover;
    background-size: cover;
    background-position: 50% 50%;
    color: #fff;
    text-align: center;
    position: relative;
    background-position: 50% 50%;
}

.info-pannel .title {
    font-size: 18px;
    line-height: 44px;
    margin-bottom: 30px;
}

.info-pannel .total {
    display: block;
    color: #fff;
}

.info-pannel .total h3 {
    font-size: 14px;
    padding-bottom: 10px;
}

.info-pannel .total p {
    font-size: 40px;
}

.sub-list {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}

.sub-list a {
    color: #fff;
}

.sub-list li {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 0 0 15px;
}

.sub-list li p {
    padding-top: 10px;
}

.sub-list h4 {
    font-size: 14px;
}

.sub-list p {
    font-size: 24px;
}

.account-pannel {
    background-color: #fff;
    text-align: center;
    margin: 5px 0;
    border-top: 1px solid #DCDCDC;
    border-bottom: 1px solid #DCDCDC;
}

.account-pannel ul {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    border-bottom: 1px solid #DCDCDC;
    height: 74px;
}

.account-pannel li {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    border-right: 1px solid #DCDCDC;
}

.account-pannel li:last-child {
    border-right: none;
}

.account-pannel h3 {
    font-size: 14px;
    color: #999;
}

.account-pannel p {
    font-size: 20px;
    color: #666;
}

.account-pannel li>a {
    padding: 15px 0;
    display: block;
}

.account-pannel li>a:active {
    background-color: #f2f2f2;
}

.account-pannel .btns {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 15px 0;
}

.account-pannel .btns a {
    height: 46px;
    line-height: 46px;
    border-radius: 23px;
    background-color: #DC9F2B;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    margin: 0 17px;
    color: #fff;
}

.account-pannel .btns a:active {
    background-color: #CE7C00;
}

.mine-menu {
    text-align: center;
    background-color: #fff;
    margin-top: 5px;
    border-top: 1px solid #DCDCDC;
}

.mine-menu>div {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    border-bottom: 1px solid #DCDCDC;
}

.mine-menu a {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 15px 0;
    border-right: 1px solid #DCDCDC;
}

.mine-menu a:last-child {
    border-right: none;
}

.mine-menu a:active {
    background-color: #f2f2f2;
}

.mine-menu .icon {
    display: inline-block;
    width: 25px;
    height: 25px;
}

.mine-menu .icon-investment {
    background-position: -25px -125px;
}

.mine-menu .icon-award {
    background-position: -50px -125px;
}

.mine-menu .icon-accout {
    background-position: -75px -125px;
}

.mine-menu .icon-setting {
    background-position: 0 -150px;
}

.mine-menu .icon-order {
    background-position: -25px -225px;
}

.mine-menu .icon-vipClub {
    background-position: 0 -250px;
}

.mine-menu .icon-helper {
    background-position: -25px -275px;
}

.mine-menu p {
    display: block;
    font-size: 12px;
    color: #544236;
}

.mine .icon-eye {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-position: -50px -250px;
    position: relative;
    bottom: -8px;
}

.mine .icon-eye-close {
    background-position: -75px -250px;
}

.mine .icon-help {
    background-position: 0 -275px;
    position: relative;
    bottom: -8px;
    display: inline-block;
    width: 25px;
    height: 25px;
}

.rate-tip .iModal,
.rate-tip .iModal-content {
    background-image: -webkit-linear-gradient(90deg, #BC9052, #9D7134);
    background-image: linear-gradient(90deg, #BC9052, #9D7134);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, .25);
    position: relative;
    overflow: visible;
}

.rate-tip h2 {
    color: #fff;
    border-bottom: 1px solid #fff;
    padding-bottom: 10px;
}

.rate-tip p {
    text-align: left;
    padding-top: 10px;
    color: #212121
}

.rate-tip .formula {
    color: #fff;
    padding: 20px 0 10px;
}

.rate-tip span {
    font-size: 12px;
    color: #F7BF71;
    padding-top: 10px;
    display: block;
}

.rate-tip .close {
    display: inline-block;
    width: 44px;
    height: 65px;
    background-image: url(http://static.hehenian.com/m/v4/images/dialog-close.png);
    -webkit-background-size: contain;
    background-size: contain;
    position: absolute;
    top: -65px;
    right: 10px;
}
</style>

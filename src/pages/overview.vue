<template>
    <div class="mine">
        <div class="info-pannel">
            <a class="link" href="javascript:history.go(-1);">返回</a>
            <h2 class="title">我的账户</h2>
            <a class="total" href="javascript:;" @click="syncDate('asset')">
                <h3>我的总资产(元)
                    <i class="icon icon-eye" :class="{'icon-eye-close':hide=='****'}" @click.stop.prevent="toggleHide()"></i>
                </h3>
                <p>{{hide||formatNumber(data.totalAssets)}}</p>
            </a>
            <ul class="sub-list">
                <li>
                    <h3>
                        <a @click="syncDate('total')" href="javascript:;">累计收益(元)</a>
                        <i @click="incomeDialog('totalIncomeDialog')" class="icon icon-help"></i>
                    </h3>
                    <p>{{hide||formatNumber(data.totalInteres)}}</p>
                </li>
                <li>
                    <h3>
                        <a @click="syncDate('yesterday')" href="javascript:;">昨日收益(元)</a>
                        <i @click="incomeDialog('yesterdayIncomeDialog')" class="icon icon-help"></i>
                    </h3>
                    <p>{{hide||formatNumber(data.yesterdayInteres)}}</p>
                </li>
            </ul>
        </div>
    
        <div class="assets-chart">
            <h2 class="title">{{assetTitle}}</h2>
            <ul class="asset-list" v-if="list.length">
                <li v-for="(el,index) in list" @click="gotoDetail(index)">
                    <span class="label">
                        {{el.label}}
                    </span>
                    <span class="money">
                        {{formatNumber(el.value)}}
                    </span>
                    <div class="level" :style="{'width':getLevelWidth(el.value,index)+'%'}">
                        <div class="line" :style="{'background':getLevelColor(index),'animation-duration':(1+index*.5)+'s'}"></div>
                    </div>
                </li>
            </ul>
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
    </div>
</template>
<script>
import verifyPay from '@/common/verifyPay';
const titleObj = {
    asset:'我的总资产',
    total:'累计收益',
    yesterday:'昨日受益'
}
export default {
    data() {
        return {
            hide: localStorage.getItem('hideMoney') !== 'false' ? '****' : false,
            data: {
                totalAssets: '',
                totalInteres: '',
                yesterdayInteres: '',
            },
            list: [],
            listLength: 0,
            startColor: [220, 160, 40],
            endColor: [150, 100, 10],
            key:null,
        }
    },
    computed:{
        assetTitle: function(){
            return this.key ? titleObj[this.key] : '';
        }
    },
    methods: {
        toggleHide() {
            this.hide = this.hide ? false : '****';
            localStorage.setItem('hideMoney', this.hide);
        },
        formatNumber(val) {
            return (Vue.filter('formatNumber'))(parseFloat(val), 2)
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
        },
        getLevelColor: function (i) {
            var color = [
                parseInt(this.startColor[0] + (this.endColor[0] - this.startColor[0]) * (i / this.listLength)),
                parseInt(this.startColor[1] + (this.endColor[1] - this.startColor[1]) * (i / this.listLength)),
                parseInt(this.startColor[2] + (this.endColor[2] - this.startColor[2]) * (i / this.listLength))
            ]
            return 'rgb(' + color.join(',') + ')';
        },
        getLevelWidth: function (val, i) {
            if (i === 0) {
                return 95;
            } else {
                let value = 95 * parseInt(val) / parseInt(this.list[0].value)
                return value + 30 < 50 ? value + 30 : value;
            }
        },
        syncDate: function (key) {
            key = key||this.$route.query.key || 'asset';
            if(this.key===key)return;
            this.list = [];
            this.$axios.post('/api/overview.do', { key: key })
                .then(res => {
                    if (res.data.code === -10000 || res.request.responseURL.indexOf('login/index.do') > -1) {
                        setTimeout(() => {
                            this.$router.push({ name: 'login' })
                        }, 0)
                        return;
                    }
                    let data = res.data.data;
                    this.data.totalAssets = data.totalAssets;
                    this.data.totalInteres = data.totalInteres;
                    this.data.yesterdayInteres = data.yesterdayInteres;
                    let list = data.list || [];
                    list.sort((a, b) => {
                        return parseFloat(b.value) - parseFloat(a.value);
                    });
                    this.list = list;
                    this.listLength = list.length;
                    this.key = key;
                })
                .catch(e => {
                    console.log(e)
                })
        },
        gotoDetail(index) {
            const href = this.list[index].url;
            if (href) {
                location.href = href;
            }
        },
        recharge() {
            verifyPay(() => {
                location.href = 'http://m.hehenian.com/balance/chargePage.do';
            });
        },
        withdraw() {
            if (parseFloat(this.data.balance) + parseFloat(this.data.chinaPNRBalance) > 0) {
                this.$modal({
                    title: '请选择您要提现的金额账户',
                    content: '<style>.withdrawals a{display:inline-block;padding:15px 30px;color: #DDAD58;}</style><p class="withdrawals"><a style="border-right:1px solid #ccc;" href="http://m.hehenian.com/chinapnr/webappCash.do">汇付账户</a><a href="javascript:chekp(\'http://m.hehenian.com/balance/withdrawPage.do\');">平台账户</a></p>',
                    cancelText: '取消',
                    cancel: function () { }
                });
            } else {
                this.$toast('账户没有可提现的余额！');
            }
        }
    },
    beforeMount() {
        this.syncDate();
    },
    mounted() {
    }
}
</script>
<style>
@import '../../static/overview.css';

.assets-chart {
    margin-top: 10px;
    background-color: #fff;
    padding-bottom: 5px;
    position: relative;
}

.assets-chart .title {
    font-size: 14px;
    padding: 10px;
}

.asset-list {
    margin: 0 10px;
}

.asset-list li {
    height: 40px;
    display: flex;
    align-items: center;
    background: #bbb;
    padding: 0 10px;
    position: relative;
    margin-bottom: 5px;
}

.asset-list li:active {
    background: #ccc;
}

.asset-list .level {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 0%;
    z-index: 1;
}

.asset-list .level .line {
    height: 40px;
    animation-name: level-slide;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
}

@keyframes level-slide {
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
}

.asset-list li span {
    display: block;
    position: relative;
    z-index: 2;
    flex: 1;
    padding: 0;
    color: #fff;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, .2);
}

.asset-list li span.money {
    text-align: right;
}
</style>

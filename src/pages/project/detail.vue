<template>
    <div class="container">
        <mt-header :title="base.productName">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="product-detial">
            <dl>
                <dt class="cGold">
                    <i class="t1"></i>产品简介
                </dt>
                <dd>
                    <p>
                        {{base.comment}}
                    </p>
                </dd>
            </dl>
            <dl>
                <dt class="cGold">
                    <i class="t2"></i>概要
                </dt>
                <dd>
                    <ol v-if="base.productName=='爱定宝'">
                        <li>加入条件：{{base.coefficient}} 元起投</li>
                        <li>购买期限：{{base.period}} 个月</li>
                        <li>锁 定 期：3 个月，锁定期内不可赎回</li>
                        <li>计息日期：购买后下一工作日</li>
                        <li>收益方式：到期投资及收益</li>
                    </ol>
                    <ol v-else-if="base.productName=='加薪宝'">
                        <li>加入条件：{{base.coefficient}} 元起投</li>
                        <li>购买期限：{{base.period}} 个月</li>
                        <li>锁 定 期：投资期内不可赎回</li>
                        <li>计息日期：购买后下一工作日</li>
                        <li>收益方式：到期投资及收益</li>
                    </ol>
                    <ol v-else-if="base.productName=='月利宝'">
                        <li>加入条件：{{base.coefficient}} 元起投</li>
                        <li>购买期限：{{base.period}} 个月</li>
                        <li>锁 定 期：1个月，锁定期内不可赎回</li>
                        <li>计息日期：购买后下一工作日</li>
                        <li>收益方式：到期投资及收益</li>
                    </ol>
                    <ol v-else-if="base.productName=='日利宝'">
                        <li>加入条件：{{base.coefficient}} 元起投</li>
                        <li>购买期限：{{base.period}} 个月</li>
                        <li>锁 定 期：3个月，锁定期内不可赎回</li>
                        <li>计息日期：购买后下一工作日</li>
                        <li>收益方式：到期投资及收益</li>
                    </ol>
                    <ol v-else-if="base.productName=='养老理财'">
                        <li>加入条件：{{base.coefficient}} 元起投</li>
                        <li>购买期限：{{base.period}} 个月</li>
                        <li>锁 定 期：3个月，锁定期内不可赎回</li>
                        <li>计息日期：购买后下一工作日</li>
                        <li>收益方式：到期投资及收益</li>
                    </ol>
                    <ol v-else-if="base.productName=='企金宝'">
                        <li>加入条件：加入金额10000元的倍数</li>
                        <li>购买期限：
                            <span class="">无固定期限</span>
                        </li>
                        <li>锁 定 期：除投资首个自然日为锁定期外，用户可随时赎回</li>
                        <li>计息日期：按日计息，每隔一月加息一次，加息幅度为0.5%，按起投资金分三种阶梯计算起息点（详见收益对照图）系统复投后阶梯保持不变</li>
                        <li>收益方式：动态复投 每隔一月本金+收益自动复投</li>
                        <li>赎回方式：按订单赎回，到帐时间T+1个工作日（非工作日顺延，T为预约赎回的时间）</li>
                    </ol>
                    <ol v-else-if="base.productName=='小钱库'">
                        <li>加入条件：{{base.coefficient}} 元起投</li>
                        <li>购买期限：3-15天</li>
                        <li>年化收益率：4%</li>
                        <li>赎回规则：购买当日不可赎回；支持全额赎回或部分赎回；不限赎回次数</li>
                        <li>计息日期：投资当日计息，赎回当日对应赎回资金不计息</li>
                        <li>计息方式：按日计息 ，每日复利</li>
                        <li>收益方式：一次性还本付息</li>
                    </ol>
                </dd>
            </dl>
            <dl>
                <dt class="cGold">
                    <i class="t3"></i>费用
                </dt>
                <dd>
                    <ol>
                        <li>加入费率： 0.00%</li>
                        <li>管理费率：参见{{base.productName}}服务协议</li>
                        <li>提前赎回费率：参见{{base.productName}}服务协议</li>
                    </ol>
                </dd>
            </dl>
            <dl>
                <dt class="cGold">
                    <i class="t5"></i>对标说明
                </dt>
                <dd style="text-align:center">
                    <img v-show="map" :src="'http://static.hehenian.com/m/v4/images/pro_map/'+map+'.png?t=20170503'" alt="" width="295">
                </dd>
            </dl>
            <dl>
                <dt class="cGold">
                    <i class="t6"></i>标的组成
                </dt>
                <dd>
                    <table class="riskview-table">
                        <tr>
                            <td colspan="4" class="A">满足各项指标，则评为A类</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="B">满足2项则为B类</td>
                            <td colspan="2" class="C">满足1项则为C类</td>
                        </tr>
                        <tr class="cnt">
                            <td>贷款项目指
                                <br>标情况及项
                                <br>目能立评价</td>
                            <td>担保措施</td>
                            <td>企业基本面
                                <br>评价</td>
                            <td>
                                <router-link to="/project/more" class="cGold">查看详情</router-link>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="D">各指标不满足，则评为Ｄ类</td>
                        </tr>
                    </table>
                </dd>
            </dl>
            <dl>
                <dt class="cGold">
                    <i class="t7"></i>部分标的详情
                </dt>
                <dd>
                    <table class="targets-table">
                        <tr v-for="el in data.loanList">
                            <td>
                                <p>{{el.loanTitle}}</p>
                            </td>
                            <td>
                                <i :class="el.rank">{{el.rank}}</i>
                            </td>
                            <td>
                                <router-link :to="{path:'/debtList/debtDetail',query:{businessNo:el.businessNum}}" class="cGold">查看详情</router-link>
                            </td>
                        </tr>
                    </table>
                </dd>
            </dl>
            <dl>
                <dt class="cGold">
                    <i class="t7"></i>交易记录
                </dt>
                <dd>
                    <table>
                        <tr v-for="el in data.recentList">
                            <td>{{el.mobilePhone}}</td>
                            <td>{{el.tradeTime}}</td>
                            <td>￥{{el.tradeAmount}}</td>
                        </tr>
                    </table>
                </dd>
            </dl>
        </div>
        <div class="fixed-btn-wrapper">
            <a class="fixed-btn" ref="button" :href="'http://m.hehenian.com/finance/prepay.do?pid='+data.rateId">立即投标</a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            base: {},
            data: {
                loanList: [],
                recentList: []
            },
            map: ''
        }
    },
    methods:{
        aysnData(){
            this.$axios.get('/api/getProjectDetail.do',{params:{id: this.$route.query.id}})
            .then(res=>{
                if(res.code===0){
                    this.data=res.data;
                }else{
                    this.$toast('系统出错了！');
                }
            });
        }
    },
    beforeMount() {
        var baseInfo = JSON.parse(localStorage.getItem('$$projectBaseInfo'));
            if(!baseInfo ||this.$route.query.id!=baseInfo.projectId){
                this.$toast('页面参数有误！');return;
            }
            this.base = baseInfo;
            if(baseInfo.productName=='爱定宝'){this.map='adb_b'}
            else if(baseInfo.productName=='月利宝'){this.map='yue_b'}
            else if(baseInfo.productName=='日利宝'){this.map='rlb_b'}
            else if(baseInfo.productName=='加薪宝'){this.map='jxb_b'}
            else if(baseInfo.productName=='养老理财'){this.map='lao_b'}
            else if(baseInfo.productName=='小钱库'){this.map='xqk_b'}
            else if(baseInfo.productName=='企金宝'){this.map='qjb_b'}
        this.aysnData();
    },
    mounted(){
        document.body.appendChild(this.$refs.button);
    },
    beforeDestroy(){
        this.$refs.button.parentNode.removeChild(this.$refs.button);
    }
}
</script>
<style>
@import './style.css';
</style>

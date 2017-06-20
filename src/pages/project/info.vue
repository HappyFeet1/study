<template>
    <div class="container">
        <mt-header :title="data.productName">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="product-meta">
            <ul>
                <li>
                    <p class="cGold">{{data.rate*(parseFloat(data.rate)>1?1:100)|fixed2}}
                        <sub>%</sub>
                    </p>
                    <span>预期年化收益</span>
                </li>
                <li>
                    <p class="cGold">{{data.period}}
                        <sub>个月</sub>
                    </p>
                    <span>项目期限</span>
                </li>
                <li>
                    <p class="cGold">{{data.coefficient}}
                        <sub>元</sub>
                    </p>
                    <span>起投金额</span>
                </li>
            </ul>
            <ul>
                <li class="label">投资进度:
                    <i class="cGold">{{data.finishRate}}%</i>
                </li>
                <li>
                    <div class="progress">
                        <div class="cur" :style="{width:data.finishRate+'%'}"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="product-info">
            <dl>
                <dt>
                    <div class="left">
                        <h2>{{data.productName}}
                            <span>（项目编号：{{data.projectId}}）</span>
                        </h2>
                    </div>
                    <div class="right">已投：
                        <span class="cGold">{{data.tradeCount}} 人</span>
                    </div>
                </dt>
                <dd>
                    <div class="left">
                        <p class="label">收益方式</p>
                    </div>
                    <div class="right">{{data.pattern}}</div>
                </dd>
                <dd>
                    <div class="left">
                        <p class="label">起息时间</p>
                    </div>
                    <div class="right">投资次日计息</div>
                </dd>
                <dd>
                    <div class="left">
                        <p class="label">本期总额</p>
                    </div>
                    <div class="right">{{data.projectAmount|formatNumber}} 元</div>
                </dd>
                <!--             <dd>
                        <div class="left">
                            <p class="label">共分散投资于</p>
                        </div>
                        <div class="right">{{data.bidNumber}} 标</div>
                    </dd> -->
                <dd>
                    <div class="left">
                        <p class="label">本期余额</p>
                    </div>
                    <div class="right">{{data.surplusAmount|formatNumber}} 元</div>
                </dd>
                <dd>
                    <div class="left">
                        <p class="label">安全保障</p>
                    </div>
                    <router-link class="right cGreen" to="/help/3safe">详情参见钱生花安全保障</router-link>
                </dd>
                <dd>
                    <div class="left">
                        <p class="label">更多详情</p>
                    </div>
                    <router-link class="right cGold" :to="{path:'/project/detail',query:{id:data.projectId}}">点击查看</router-link>
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
            data: {}
        }
    },
    // computed: {
    //     map:1
    // },
    methods: {
        aysnData() {
            this.$axios.get('/api/getProjectBasicInfo.do', { params: { id: this.$route.params.id } })
                .then(res => {
                    this.data = res.data;
                    localStorage.setItem('$$projectBaseInfo', JSON.stringify(res.data));
                })
                .catch(e => {
                    $.toast('服务器出错！');
                })
        }
    },
    beforeMount() {
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

<template>
    <div class="container">
        <mt-header title="散标详情">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="target">
            <div class="title">
                {{data.loanTitle}}
                <span>（{{data.businessNo}}）</span>
            </div>
            <div class="info">
                <div class="info_item">
                    <p>{{data.investAnnualRate*(data.investAnnualRate>1?1:100)}}%</p>
                    <p>预期年化收益率</p>
                </div>
                <div class="info_item">
                    <p>{{data.borrowAmount|formatNumber}}元</p>
                    <p>标的总额</p>
                </div>
                <div class="info_item">
                    <p>{{data.periods+(data.periodsCompany=='月' ? '个'+data.periodsCompany : data.periodsCompany)}}</p>
                    <p>借款期限</p>
                </div>
            </div>
            <div class="target_list">
                <ul>
                    <li>
                        <label>投资进度：</label>
                        <div class="text">
                            <div class="bar">
                                <div class="cur_bar" :style="{width: data.borrowProgress+'%'}"></div>
                            </div>
                        </div>
                        <div class="bar_text">
                            {{data.borrowProgress}}%
                        </div>
                    </li>
                    <li>
                        <label>已投人数：</label>
                        <div class="text">
                            <span class="org">{{data.investNum}}人</span>
                        </div>
                    </li>
                    <li>
                        <label>还款方式：</label>
                        <div class="text">{{data.paymentMode}}</div>
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
                <div class="status" :class="['status-'+data.borrowStatus]"></div>
            </div>
    
            <div class="target_menu">
                <mt-cell title="借款人信息" :to="{path:'/debt/borrowInfo'}" is-link></mt-cell>
                <mt-cell title="审核信息" :to="{path:'/debt/verifyInfo'}" is-link></mt-cell>
                <mt-cell title="投标记录" :to="{path:'/debt/bidInfo',query:{id:businessNo}}" is-link></mt-cell>
                <mt-cell title="还款计划" :to="{path:'/debt/repaymentInfo',query:{id:businessNo}}" is-link></mt-cell>
                <mt-cell title="常见问题" :to="{path:'/debt/help'}" is-link></mt-cell>
            </div>
        </div>
        <div class="target_btn" ref="fixBtn" v-show="data.borrowStatus==1">
            <router-link :to="{path:'/debt/buy', query:{businessNo:data.businessNo}}">立即投标</router-link>
        </div>
    </div>
</template>
<script>
import Cell from 'mint-ui/lib/cell/';
import 'mint-ui/lib/cell/style.css';
export default {
    data() {
        return {
            businessNo: this.$route.query.businessNo,
            data: {}
        }
    },
    methods: {
        asyncLoad() {
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$axios.get('/loan/loanInfo.do', { params: { businessNo: this.businessNo } })
                .then(res => {
                    this.data = res.loanInfo;
                    sessionStorage.setItem('debtData', JSON.stringify(res));
                    this.$indicator.close();
                })
        }
    },
    beforeMount() {
        this.asyncLoad();
    },
    mounted(){
        document.body.appendChild(this.$refs.fixBtn);
    },
    components: {
        'mt-cell': Cell
    },
    beforeDestroy(){
        this.$refs.fixBtn.parentNode.removeChild(this.$refs.fixBtn);
    }
}
</script>

<style>
@import '../../../static/debt.css';
</style>


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
                            <router-link to="/helper/list/debtSafe" class="link">详情参见钱生花风险提示</router-link>
                        </div>
                    </li>
                    <li>
                        <label>安全保障：</label>
                        <div class="text">
                            <router-link to="/helper/list/3safe" class="link">详情参见钱生花安全保障</router-link>
                        </div>
                    </li>
                </ul>
                <div class="status" :class="['status-'+data.borrowStatus]"></div>
            </div>
    
            <div class="target_menu">
                <mt-cell title="借款人信息" :to="{name:'borrowInfo'}" is-link></mt-cell>
                <mt-cell title="审核信息" :to="{name:'verifyInfo'}" is-link></mt-cell>
                <mt-cell title="投标记录" :to="{name:'bidInfo',query:{id:businessNo}}" is-link></mt-cell>
                <mt-cell title="还款计划" :to="{name:'repaymentInfo',query:{id:businessNo}}" is-link></mt-cell>
                <mt-cell title="常见问题" :to="{name:'debtHelp'}" is-link></mt-cell>
            </div>
        </div>
        <div class="target_btn">
            <router-link v-show="data.borrowStatus==1" :to="'/debtBuy/'+data.businessNo">立即投标</router-link>
        </div>
    </div>
</template>
<script>
import Cell from 'mint-ui/lib/cell/';
import 'mint-ui/lib/cell/style.css';
export default {
    data() {
        return {
            businessNo: this.$route.query.id,
            data: {}
        }
    },
    methods: {
        syncLoad() {
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$axios.get('/loan/loanInfo.do', { params: { businessNo: this.businessNo } })
                .then(res => {
                    this.data = res.data.loanInfo;
                    sessionStorage.setItem('debtData', JSON.stringify(res.data));
                    this.$indicator.close();
                })
        }
    },
    beforeMount() {
        this.syncLoad();
    },
    components: {
        'mt-cell': Cell
    },
}
</script>

<style>
.target {
    background: #fff;
}

.target .title {
    color: #191919;
    font-size: 16px;
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 15px;
}

.target .title span {
    color: #7f7f7f;
    font-size: 12px;
}

.info {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding-bottom: 20px;
}

.info .info_item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}

.info .info_item p {
    text-align: center;
    font-size: 13px;
    color: #212121;
}

.info .info_item p:first-child {
    color: #ef702c;
    font-size: 16px;
}

.target_list {
    position: relative;
    /* pointer-events: none; */
}

.target_list .status {
    position: absolute;
    right: 0;
    bottom: 10px;
    width: 100px;
    height: 100px;
    -webkit-background-size: contain;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}

@media (max-width: 320px) {
    .target_list .status {
        width: 60px;
        height: 60px;
    }
}

.target_list .status-1 {
    background-image: url('http://static.hehenian.com/m/v4/images/signet-1.png');
}

.target_list .status-2 {
    background-image: url('http://static.hehenian.com/m/v4/images/signet-2.png');
}

.target_list .status-3 {
    background-image: url('http://static.hehenian.com/m/v4/images/signet-3.png');
}

.target_list .status-4 {
    background-image: url('http://static.hehenian.com/m/v4/images/signet-4.png');
}

.target_list .status-5 {
    background-image: url('http://static.hehenian.com/m/v4/images/signet-5.png');
}

.target_list ul {
    padding-bottom: 10px;
}

.target_list:after {
    content: '';
    display: block;
    height: 10px;
    background: #eee;
    margin-left: -20px;
}

.target_list ul li {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 3px 0px;
    font-size: 14px;
}

.target_list ul li label {
    width: 110px;
    text-align: left;
    color: #666;
    padding-left: 15px;
}

.target_list ul li .text {
    /*     -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1; */
}

.org {
    color: #ef702c;
}

.target_list ul li .text .link {
    color: #32884f
}

.bar_text {
    font-size: 14px;
    color: #ef702c;
    margin-right: 15px;
    margin-left: 10px;
}

.target_list ul li .text .bar {
    width: 180px;
    height: 12px;
    background: #cccccc;
    border-radius: 12px;
    height: 12px;
}

.target_list ul li .text .bar .cur_bar {
    float: left;
    background: #ef702c;
    border-radius: 12px;
    height: 12px;
    width: 0px;
    transition: width 0.8s;
}
.target_btn {
	width: 100%;
	margin-top: 0px;
	max-width: 640px;
	margin: 0 auto;
	height: 58px;
}
.target_btn a {
	display: block;
	position: fixed;
	bottom: 0px;
	text-align: center;
	padding: 12px 0px;
	font-size: 16px;
	color: #ffffff;
	background: #b7761c;
	width: 100%;
	letter-spacing: 1px;
	max-width: 640px;
	color: #fff !important;
}
</style>


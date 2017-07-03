<template>
    <div class="container">
        <mt-header title="平台数据">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="overview">
            <div class="overview_item">
                <div class="overview_bar">
                    <span class="over_tit">运营统计数据</span>
                    <i>(截止{{date|date('yyyy-MM-dd')}})</i>
                </div>
                <ul>
                    <li class="o1">
                        <div class="item_info">
                            <p>{{(p2pData.totalAmt/10000)|formatNumber(2)}}</p>
                            <p>累计投资（万元）</p>
                        </div>
                    </li>
                    <li class="o2">
                        <div class="item_info">
                            <p>{{p2pData.totalNum|formatNumber(0)}}</p>
                            <p>累计成交笔数</p>
                        </div>
                    </li>
                    <li class="o3">
                        <div class="item_info">
                            <p>{{(p2pData.totalTradeAmt/10000)|formatNumber(2)}}</p>
                            <p>交易金额（万元）</p>
                        </div>
                    </li>
                    <li class="o4">
                        <div class="item_info">
                            <p>{{(p2pData.currentYearAmt/10000)|formatNumber(2)}}</p>
                            <p>当年成交金额（万元）</p>
                        </div>
                    </li>
                    <li class="o5">
                        <div class="item_info">
                            <p>{{p2pData.currentYearNum|formatNumber(0)}}</p>
                            <p>当年成交笔数</p>
                        </div>
                    </li>
                    <!-- <li class="o6">
                                            <div class="item_info">
                                                <p>{{(p2pData.totalProxyAmt/10000)|formatNumber(2)}}</p>
                                                <p>代偿金额（万元）</p>
                                            </div>
                                        </li>
                                        <li class="o7">
                                            <div class="item_info">
                                                <p>{{(p2pData.totalProxyedAmt/10000)|formatNumber(2)}}</p>
                                                <p>已代偿金额（万元）</p>
                                            </div>
                                        </li>
                                        <li class="o8">
                                            <div class="item_info">
                                                <p>{{(p2pData.totalProxyNum)|formatNumber(0)}}</p>
                                                <p>代偿笔数</p>
                                            </div>
                                        </li> -->
                </ul>
            </div>
            <div class="overview_item">
                <div class="overview_bar">
                    <span>借款数据统计</span>
                </div>
                <ul>
                    <li class="l1">
                        <div class="item_info">
                            <p>{{loanData.LOANTOTALALL|formatNumber(0)}}</p>
                            <p>累计借款人数</p>
                        </div>
                    </li>
                    <li class="l2">
                        <div class="item_info">
                            <p>{{(loanData.LOANTOTALMONTH)|formatNumber(0)}}</p>
                            <p>当月借款人数</p>
                        </div>
                    </li>
                    <li class="l3">
                        <div class="item_info">
                            <p>{{(loanData.LOANSUMALL/10000)|formatNumber(2)}}</p>
                            <p>累计借款金额</p>
                        </div>
                    </li>
                    <!--             <li class="l4">
                                            <div class="item_info">
                                                <p>{{(loanData.TENMAXSUM/10000)|formatNumber(2)}}</p>
                                                <p>最大十户借款余额（万元）</p>
                                            </div>
                                        </li>
                                        <li class="l5">
                                            <div class="item_info">
                                                <p>{{loanData.TENMAXSUMRATE}}</p>
                                                <p>最大十户借款余额占比</p>
                                            </div>
                                        </li> -->
                    <li class="l6">
                        <div class="item_info">
                            <p>{{loanData.OVERDUERATE}}</p>
                            <p>逾期率</p>
                        </div>
                    </li>
                    <li class="l7">
                        <div class="item_info">
                            <p>{{loanData.BADRATE}}</p>
                            <p>不良借款率</p>
                        </div>
                    </li>
                    <li class="l8">
                        <div class="item_info">
                            <p>{{loanData.BADDEBTRATE}}</p>
                            <p>坏账率</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="overview_item">
            <div class="overview_bar overview_bar_opa">
                <span>合作机构</span>
            </div>
            <div class="cooperation_list">
                <a href="javascript:;" class="c1"></a>
                <a href="javascript:;" class="c2"></a>
                <a href="javascript:;" class="c3"></a>
                <a href="javascript:;" class="c4"></a>
                <a href="javascript:;" class="c5"></a>
                <a href="javascript:;" class="c6"></a>
                <a href="javascript:;" class="c7"></a>
                <a href="javascript:;" class="c8"></a>
                <a href="javascript:;" class="c9"></a>
                <a href="javascript:;" class="c10"></a>
                <a href="javascript:;" class="c11"></a>
                <a href="javascript:;" class="c12"></a>
                <a href="javascript:;" class="c13"></a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            date: +new Date,
            loanData: {
                BADRATE: 0,
                BALANCE: 0,
                LOANTOTALALL: 0,
                BADDEBTRATE: 0,
                OVERDUERATE: 0,
                LOANSUMAVERAGE: 0,
                LOANSUMALL: 0,
                LOANTERMAVERAGE: 0,
                LOANTOTALMONTH: 0,
                err_code: 0
            },
            p2pData: {
                currentYearAmt: 0,
                currentYearNum: 0,
                totalAmt: 0,
                totalBakAmt: 0,
                totalNum: 0,
                totalProfit: 0,
                totalProxyAmt: 0,
                totalProxyNum: 0,
                totalProxyedAmt: 0,
                totalRegNum: 0,
                totalTradeAmt: 0,
            }
        }
    },
    beforeMount() {
        this.$axios.get('/api/overviewDetails.do')
            .then(data => {
                this.loanData = data.data.loanData;
                this.p2pData = data.data.p2pData;
            })
    }
}
</script>

<style>
.overview {
    padding: 10px 15px;
    background: #fff;
}

.overview_bar {
    position: relative;
    text-align: center;
    font-size: 16px;
    color: #aa8549;
    margin: 20px 0px;
    margin-bottom: 40px;
    letter-spacing: 1px;
}

.overview_bar_opa {
    margin: 0px;
    padding: 20px 0px;
    background: #F9FAFA;
}

.overview_bar:after {
    width: 100%;
    height: 1px;
    background: #aa8549;
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%), scale(0.5);
    transform: translateY(-50%), scale(0.5);
}

.overview_bar span {
    display: inline-block;
    background: #fff;
    position: relative;
    z-index: 2;
    padding: 0px 8px;
}

.overview_bar i {
    display: block;
    text-align: center;
    font-size: 14px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    font-style: normal;
    margin-top: 4px;
}

.overview_bar_opa span {
    background: #F9FAFA;
}

.overview_item ul li {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    margin-bottom: 30px;
}

.overview_item {
    margin-bottom: 60px;
}

.overview_item:last-child {
    margin-bottom: 0px;
}

.overview_item ul li:before {
    background: url(http://static.hehenian.com/m/v4/images/app/icon_overview.png) no-repeat 0px 0px;
    background-size: 347px auto;
    -webkit-background-size: 347px auto;
    content: '';
    display: block;
}

.overview_item ul li.o1:before {
    width: 40px;
    height: 40px;
}

.overview_item ul li.l1:before {
    width: 40px;
    height: 40px;
    background-position: 0px -52px;
}

.overview_item ul li.o2:before {
    width: 42px;
    height: 40px;
    background-position: -42px 0px;
}

.overview_item ul li.l2:before {
    width: 40px;
    height: 40px;
    background-position: -43px -52px;
}

.overview_item ul li.o3:before {
    width: 42px;
    height: 40px;
    background-position: -84px 0px;
}

.overview_item ul li.l3:before {
    width: 40px;
    height: 40px;
    background-position: -89px -52px;
}

.overview_item ul li.o4:before {
    width: 42px;
    height: 40px;
    background-position: -129px 0px;
}

.overview_item ul li.l4:before {
    width: 40px;
    height: 40px;
    background-position: -136px -51px;
}

.overview_item ul li.o5:before {
    width: 42px;
    height: 40px;
    background-position: -174px 0px;
}

.overview_item ul li.l5:before {
    width: 40px;
    height: 40px;
    background-position: -179px -52px;
}

.overview_item ul li.o6:before {
    width: 42px;
    height: 40px;
    background-position: -220px 0px;
}

.overview_item ul li.l6:before {
    width: 40px;
    height: 40px;
    background-position: -219px -52px;
}

.overview_item ul li.o7:before {
    width: 42px;
    height: 40px;
    background-position: -262px 0px;
}

.overview_item ul li.l7:before {
    width: 40px;
    height: 40px;
    background-position: -259px -52px;
}

.overview_item ul li.o8:before {
    width: 42px;
    height: 40px;
    background-position: -305px 0px;
}

.overview_item ul li.l8:before {
    width: 40px;
    height: 40px;
    background-position: -300px -52px;
}

.overview_item ul li .item_info {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    margin-left: 15px;
}

.overview_item ul li .item_info p:first-child {
    font-size: 24px;
    color: #63b9a7;
}

.overview_item ul li .item_info p:last-child {
    color: #525352;
    font-size: 12px;
}

.cooperation_list:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}

.cooperation_list {
    background: #F9FAFA;
}

.cooperation_list a {
    display: inline-block;
    width: 50%;
    background: #F9FAFA;
    float: left;
    float: left;
    box-sizing: border-box;
    margin-bottom: 15px;
}

.cooperation_list a:after {
    content: '';
    display: block;
    width: 150px;
    height: 44px;
    background-image: url(http://static.hehenian.com/p_v2/images/index_cooperation.png);
    background-size: 150px auto;
    margin: 0 auto;
}

.cooperation_list a.c2:after {
    background-position: 0px -325px;
}

.cooperation_list a.c3:after {
    background-position: 0px -55px;
}

.cooperation_list a.c4:after {
    background-position: 0px -379px;
}

.cooperation_list a.c5:after {
    background-position: 0px -110px;
}

.cooperation_list a.c6:after {
    background-position: 0px -435px;
}

.cooperation_list a.c7:after {
    background-position: 0px -162px;
}

.cooperation_list a.c8:after {
    background-position: 0px -485px;
}

.cooperation_list a.c9:after {
    background-position: 0px -216px;
}

.cooperation_list a.c10:after {
    background-position: 0px -538px;
}

.cooperation_list a.c11:after {
    background-position: 0px -268px;
}

.cooperation_list a.c12:after {
    background-position: 0px -590px;
}

.cooperation_list a.c13:after {
    background-position: 0px -645px;
}
</style>


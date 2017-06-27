<template>
    <div class="container">
        <mt-header title="资金流向">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="card-list-wrap" v-infinite-scroll="asyncData" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <div class="card-list" v-for="(item, index) in loadData" :key="index">
                <div class="hd">
                    <p>{{item.loanTitle}}
                        <i class="i-icon"></i>
                    </p>
                    <p class="cGray">{{item.statusName}}</p>
                </div>
                <ul class="bd">
                    <li>
                        <span class="cGray">投资金额：</span>
                        <span class="cGold">{{item.investAmount}}元</span>
                    </li>
                    <li>
                        <p>
                            <span class="cGray">匹配时间：</span>
                            <span>{{item.matchTime}}</span>
                        </p>
                        <p>
                            <span class="cGray">逾期预警：</span>
                            <span>{{item.overdueDays}}天</span>
                        </p>
                    </li>
                    <li>
                        <span class="cGray">还款进度：</span>
                        <p class="progress">
                            <i class="in" :style="{width:parseProgress(item.repayProgress)+'80%'}"></i>
                        </p>
                        <span>{{parseProgress(item.repayProgress)}}%</span>
                    </li>
                </ul>
                <div class="ft">
                    <a v-if="item.agreementUrl" class="j-agreement" :href="item.agreementUrl">
                        查看协议
                    </a>
                </div>
            </div>
        </div>
        <div class="page-infinite-loading">
            <p v-if="loading===true" class="page-infinite-loading">
                <mt-spinner type="double-bounce"></mt-spinner>
                加载中...
            </p>
            <p v-else-if="loading===-1" class="page-infinite-loading">
                没有更多了...
            </p>
            <p v-else-if="loading===-2" class="page-infinite-loading">
                没有查询结果
            </p>
        </div>
    </div>
</template>
<script>
import InfiniteScroll from 'mint-ui/lib/infinite-scroll/';
import Spinner        from 'mint-ui/lib/spinner/';
import 'mint-ui/lib/spinner/style.css';
export default {
    data: function () {
        return {
            tradeId: this.$route.query.tradeId,
            loadData: [],
            loading: false
        }
    },
    computed: {
        filterRequest: function () {
            return {
                pageSize: 5,
                pageNo: 1,
                tradeId: this.tradeId
            }
        }
    },
    methods: {
        asyncData() {
            if (this.loading) return;
            this.loading = true;
            this.$axios.get('/profile/investmentDetails.do', { params: this.filterRequest })
                .then(res => {
                    if (res.code === -10000) {
                        this.$router.push({ path: '/login' });
                        return;
                    }
                    setTimeout(() => {
                        var data = res.list;
                        if (this.filterRequest.pageNo === 1 && !data.length) {
                            this.loading = -2;//没有查询结果
                        } else if (this.filterRequest.pageNo > 1 && !data.length) {
                            this.loading = -1;//没有更多了
                        } else {
                            var arr = this.loadData;
                            this.loadData = arr.concat(data);
                            this.filterRequest.pageNo++;
                            this.loading = false;
                        }
                    }, 1500);
                })
                .catch(e => {
                    this.$router.push({ path: '/login' });
                });
        },
        parseProgress(val){
            return parseInt(parseFloat(val)*100);
        }
    },
    components: {
        'mt-spinner': Spinner
    }
}
</script>
<style>
.card-list {
    margin: 10px 10px 0;
    background: #fff;
    color: #111;
}
.card-list .hd {
    margin: 0 10px;
    border-bottom: 1px dashed #ccc;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 10px 0;
}
.card-list .hd p {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}
.card-list .hd p:last-child,
.card-list .bd li>p:last-child {
    text-align: right;
}
.card-list .bd {
    margin: 0 10px;
    font-size: 13px;
    padding: 5px 0;
}
.card-list .bd li {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 5px 0;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.card-list .bd li>p {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    white-space: nowrap;
}
.card-list .progress {
    height: 14px;
    border-radius: 9px;
    background: #ccc;
    margin-right: 5px;
    overflow: hidden;
}
.card-list .progress .in {
    height: 14px;
    background: #D38E2F;
    display: block;
}
.card-list .ft a {
    display: block;
    padding: 10px;
    border-top: 1px solid #ddd;
    position: relative;
}
.card-list .ft a:after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    position: absolute;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    top: 15px;
    right: 14px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.card-list .ft a:active {
    background: #e2e2e2;
}
.card-list .i-icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-image: url('http://static.hehenian.com/m/v4/images/shift_icon.jpg');
    -webkit-background-size: cover;
    background-size: cover;
    position: relative;
    bottom: -4px;
}
</style>


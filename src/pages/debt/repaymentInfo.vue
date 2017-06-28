<template>
    <div class="container">
        <mt-header title="还款计划">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="pannel-table pannel_table">
            <table class="table_v2 table_payment">
                <thead>
                    <tr>
                        <th>期限</th>
                        <th>预计还款日期</th>
                        <th>到期应还本息</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(el,index) in loadData">
                        <td>{{index+1}}</td>
                        <td>
                            <p class="payback_text">{{el.preRepayDate}}</p>
                            <p class="payback_light">应还本金：￥{{el.preCapital|formatNumber}}</p>
                        </td>
                        <td>
                            <p class="payback_text">￥{{(el.preCapital+el.preInterest)|formatNumber}}
                                <span class="payback_status" :class="{'payback_no':el.repayStatus==1}">{{el.repayStatus==1 ? '未偿还' : '已偿还'}}</span>
                            </p>
                            <p class="payback_light">应还利息：{{el.preInterest}}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
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
import Spinner from 'mint-ui/lib/spinner/';
import 'mint-ui/lib/spinner/style.css';
export default {
    data() {
        return {
            loadData: [],
            params: {
                businessNo: this.$route.query.id
            },
            loading: false
        }
    },
    beforeMount () {
        this.asyncData();
    },
    methods: {
        asyncData() {
            this.loading = true;
            this.$axios.get('/loan/loanRepayList.do', { params: this.params })
                .then(res => {
                    setTimeout(() => {
                        var data = res.list;
                        if (!data.length) {
                            this.loading = -2;//没有查询结果
                        }else {
                            this.loadData = data;
                            this.loading = -1;
                        }
                    }, 500);
                })

        }
    },
    components: {
        'mt-spinner': Spinner
    }
}
</script>
<style>
.pannel-table {
    background: #fff;
}

.pannel-table table.table_v2 {
    border: none;
}

.pannel-table table.table_v2 tr th {
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    padding: 8px 3px;
    font-size: 14px;
    color: #2b2b2b;
    font-weight: normal;
    text-align: center;
    background: #e0e0e0;
}

.pannel-table,
.pannel-table table {
    width: 100%;
}

.pannel-table table {
    border: 1px solid #e1e1e1;
}

.pannel-table table tr th {
    border: 1px solid #e1e1e1;
    padding: 8px 3px;
    font-size: 12px;
    color: #2b2b2b;
    font-weight: normal;
    text-align: center;
}

.pannel-table table tr td {
    border: 1px solid #e1e1e1;
    text-align: center;
    padding: 8px 3px;
    font-size: 12px;
    color: #848484;
}

.page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}

.page-infinite-loading div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}

.payback_list .payback_text {
    color: #212121;
    margin-bottom: 5px;
}

.payback_light {
    color: #bdbdbd;
    margin-top: 5px;
}

.payback_status {
    float: right;
    color: #088231;
    margin-right: 15px;
}

.payback_no {
    color: #666;
}
.page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}

.page-infinite-loading div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}
</style>



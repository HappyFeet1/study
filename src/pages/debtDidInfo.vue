<template>
    <div class="container">
        <mt-header title="投标记录">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="pannel-table ">
            <table class="table_v2">
                <thead>
                    <tr>
                        <th>投资人</th>
                        <th>时间</th>
                        <th>金额</th>
                    </tr>
                </thead>
                <tbody v-infinite-scroll="asyncData" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                    <tr v-for="el in loadData">
                        <td>{{el.investName}}</td>
                        <td>{{el.investTime}}</td>
                        <td>￥{{el.investAmount|formatNumber}}元</td>
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
import InfiniteScroll from 'mint-ui/lib/infinite-scroll/';
import Spinner from 'mint-ui/lib/spinner/';
import 'mint-ui/lib/spinner/style.css';

export default {
    data() {
        return {
            loadData: [],
            params: {
                businessNo: this.$route.query.id,
                pageNo: 1,
                pageSize: 10
            },
            loading: false
        }
    },
    methods: {
        asyncData() {
            this.loading = true;
            this.$axios.get('/loan/loanInvestList.do', { params: this.params })
                .then(res => {
                    console.log(1111111111)
                    console.log(res)
                    setTimeout(() => {
                        var data = res.list;
                        if (this.params.pageNo === 1 && !data.length) {
                            this.loading = -2;//没有查询结果
                        } else if (this.params.pageNo > 1 && !data.length) {
                            this.loading = -1;//没有更多了
                        } else {
                            var arr = this.loadData;
                            this.loadData = arr.concat(data);
                            this.params.pageNo++;
                            this.loading = false;
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
    padding: 10px;
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
</style>



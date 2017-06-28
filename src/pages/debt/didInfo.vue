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
@import './base.css';

</style>



<template>
    <div class="container">
        <mt-header title="VIP俱乐部活动">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="vip-activitys" v-infinite-scroll="asyncData" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <router-link class="item" :to="{path:'/vip/activityDetail',query:{type:el.articleType.id,id:el.id}}" v-for="(el,i) in loadData" :key="i">
                <div class="img" :style="{'background-image':'url('+getImageCover(el.coverImage)+')'}">
                    <i :class="el.status==1?'ing':'review'"></i>
                </div>
                <h3>
                    {{el.title}}
                </h3>
                <div style="font-size:12px;color:#666" v-html="el.summary">
                    
                </div>
            </router-link>
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
            loading: false,
            filterRequest: {
                typeType: 18,
                pageSize: 10,
                pageNo: 1
            }
        }
    },
    components: {
        'mt-spinner': Spinner
    },
    methods: {
        asyncData() {
            if (this.loading) return;
            this.loading = true;
            this.$axios.get('/api/queryVipInformation.do', { params: this.filterRequest })
                .then(res => {
                    setTimeout(() => {
                        var data = res.page;
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
                    }, 300);

                })
                .catch(e => {
                    console.log(e)
                })
        },
        getImageCover(str) {
            try {
                str = str.split(',')[0];
            } catch (e) {
                str = str || 'http://static.hehenian.com/m/v4/images/vip/acitivity.png';
            }
            return str;
        }
    }
}
</script>
<style>
.vip-activitys .item {
    padding: 10px;
    background: #fff;
    display: block;
}
.vip-activitys .item .img {
    display: block;
    height: 160px;
    background-size: cover;
    background-repeat: none;
    background-position: 50% 50%;
}
.vip-activitys h3{font-size: 14px;color: #393838;margin-top: 10px;height: 1.6em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}

</style>


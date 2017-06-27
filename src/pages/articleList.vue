<template>
    <div class="container">
        <mt-header title="社区服务">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <mt-navbar v-model="typeId">
            <mt-tab-item :id="5">知识讲堂</mt-tab-item>
            <mt-tab-item :id="6">深阅读</mt-tab-item>
            <mt-tab-item :id="11">轻奢品</mt-tab-item>
            <mt-tab-item :id="7">创富沙龙</mt-tab-item>
            <mt-tab-item :id="9">投资会所</mt-tab-item>
        </mt-navbar>
        <div class="news-list" v-infinite-scroll="asyncData" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <div v-for="el in loadData">
                <router-link class="item" :to="{path:'/articleDetail',query:{id:el.id}}">
                    <div class="img" :style="{'background-image': 'url('+el.coverImage+')'}"></div>
                    <div class="text">
                        <h4>{{el.title}}</h4>
                        <p>{{el.content}}</p>
                    </div>
                </router-link>
            </div>
            <div class="luxury-pannel" v-for="el in luxury">
                    <div class="img-play">
                        <router-link class="max" :to="{path:'/articleDetail',query:{id:el.max.id}}">
                            <img :src="el.max.coverImage" width="100%">
                        </router-link>
                        <div class="min">
                            <router-link v-for="(min,index) in el.min" :key="index" :to="{path:'/articleDetail',query:{id:min.id}}">
                                <div class="img" :style="{'background-image': 'url('+min.coverImage+')'}"></div><br>
                                <p>{{min.title}}</p>
                            </router-link>
                        </div>
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
import Navbar from 'mint-ui/lib/navbar/';
import TabItem from 'mint-ui/lib/tab-item/';
import InfiniteScroll from 'mint-ui/lib/infinite-scroll/';
import Spinner from 'mint-ui/lib/spinner/';

import 'mint-ui/lib/navbar/style.css';
import 'mint-ui/lib/tab-item/style.css';
import 'mint-ui/lib/spinner/style.css';

export default {
    data(){
        return {
            typeId: this.$route.query.typeId || 5,
            loadData:[],
            loading: false,
            pageNo:1,
            luxury:[],
        }
    },
   components:{
        'mt-navbar':   Navbar,
        'mt-tab-item': TabItem,
        'mt-spinner':  Spinner
   },
   watch:{
       typeId:function(val){
           this.refresh();
       }
   },
   methods:{
       asyncData(){
            this.loading = true;
            this.$axios.get('/api/queryInformationByType.do.do', {params: {
                typeId: this.typeId,
                pageNo: this.pageNo,
                pageSize: 10
            }})
            .then(res=>{
                    setTimeout(() => {
                        var data = res.page;
                        if (this.pageNo === 1 && !data.length) {
                            this.loading = -2;//没有查询结果
                        } else if (this.pageNo > 1 && !data.length) {
                            this.loading = -1;//没有更多了
                        } else {
                            var arr = [], formatLux=[];
                            if(this.typeId!=11){
                                arr = this.loadData;
                                this.loadData = arr.concat(data);
                                this.luxury = [];
                            }else{
                                arr = this.luxury;
                                this.loadData=[];
                                if(data.length>0){
                                    formatLux.push({
                                        max: data[0],
                                        min: data.slice(1,5)
                                    });
                                }
                                if(data.length>5){
                                    formatLux.push({
                                        max: data[5],
                                        min: data.slice(6,10)
                                    });
                                }
                                this.luxury=arr.concat(formatLux);
                            }
                            this.pageNo++;
                            this.loading = false;
                        }
                    }, 500);
            });
        },
        refresh(){
            this.loadData = [];
            this.luxury=[];
            this.loading = false;
            this.pageNo = 1;
            this.asyncData();
        },
   },
   beforeMount(){
       this.typeId = this.$route.query.typeId || 5;
       this.asyncData();
   }
}
</script>

<style>

.news-list{background-color:#fff;margin-top:10px;border-top:1px solid #dcdcdc;}
.news-list .title{color:#BA7C29;font-size:14px;border-left:2px solid #BA7C29;height:40px;line-height:40px;border-bottom:1px solid #ddd;padding-left:10px;}
.news-list .item{display:block;padding:15px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:1px solid #dcdcdc;}
.news-list .item:active{background-color:#f2f2f2;}
.news-list .img{width:100px;height:80px;background-color:#eee;-webkit-background-size:cover;background-size:cover;}
.news-list .text{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-left:15px;line-height:1;position:relative;padding-top:14px;}
.news-list .text h4{color:#544236;top:0;left:0;font-size:14px;height:1em;position:absolute;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:100%;}
.news-list .text p{font-size:12px;color:#8E8E8E;height:60px;overflow:hidden;line-height:20px;margin-top:8px;position:relative;text-align:justify;}
.news-list .text p:after{background:#fff;padding-left:10px;content:'详情 >';position:absolute;bottom:0;right:0;color:#D59F4F}

.img-play .max{display:block;-webkit-background-size:cover;background-size:cover;background-position:50% 50%;}
.img-play .min{display:-webkit-box;display:-webkit-flex;display:flex;border-bottom: 1px solid #dcdcdc;}
.img-play .min>a{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;padding:15px 0 5px;}
.img-play .min>a:active{background-color:#f2f2f2;}
.img-play .min .img{display:inline-block;width:80px;height:80px;-webkit-background-size:cover;background-size:cover;background-position:50% 50%;border:1px solid #eee;}
.img-play .min p{padding-top:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:80px;display:inline-block;}
.luxury-pannel{margin-top: 0;border-bottom: 10px solid #F2F2F2;}
</style>

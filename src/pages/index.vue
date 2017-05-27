<template>
<div class="container index-container">
    <div class="top-nav">
        <a href="#!/message/4" class="icon icon-msg"></a>
        <h1>钱生花</h1>
        <a href="#!/setting" class="icon icon-setting"></a>
    </div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, i) in data.carouselbanner" :key="i" :style="{backgroundImage:'url('+item.banner+')'}">
          <a v-if="item.link" :href="item.link"></a>
      </mt-swipe-item>
    </mt-swipe>

    <div class="imenu-list">
        <div class="item">
            <a :href="filterUrl(item.url)" v-for="item in data.menus1">
                <i :class="'icon '+filterIcon(item.img)"></i>
                <p>{{item.desc}}</p>
            </a>
        </div> 
        <div class="item">
            <a :href="filterUrl(item.url)" v-for="item in data.menus2">
                <i :class="'icon '+filterIcon(item.img)"></i>
                <p>{{item.desc}}</p>
            </a>
        </div>
        <div class="item">
            <a :href="filterUrl(item.url)" v-for="item in data.menus3">
                <i :class="'icon '+filterIcon(item.img)"></i>
                <p>{{item.desc}}</p>
            </a>
        </div>
    </div>

    <div class="wrapper-pannel" v-if="data.overview">
        <div class="title-bar">{{data.overview.nav}}<a href="#/plat" class="more">更多</a></div>
        <div class="plat-data">
                <a href="javascript:;">
                <i class="icon icon-users"></i>
                <h3>{{data.overviewUser.label}}</h3>
                <p>{{data.overviewUser.value}}位</p>
            </a>
            <a href="javascript:;">
                <i class="icon icon-income"></i>
                <h3>{{data.overviewIncome.label}}</h3>
                <p>{{data.overviewIncome.value}}万元</p>
            </a>
            <a href="javascript:;">
                <i class="icon icon-invest"></i>
                <h3>{{data.overviewInvest.label}}</h3>
                <p>{{data.overviewInvest.value}}万元</p>
            </a>
        </div>
    </div>

    <div class="wrapper-pannel" v-if="data.underlying">
        <div class="title-bar">{{data.underlying.nav}} <a href="#/debtList/remainTimeStart" class="more">更多</a></div>
        <div class="targets" v-for="el in data.underlying.content">
            <a class="name" :href="filterUrl(el.link)">
                <h3>{{el.title}}</h3>
                <p class="cGray">借款标的</p>
            </a>
            <div class="progress">
                <table>
                    <tr class="chGray">
                        <td>借款金额</td>
                        <td>借款期限</td>
                        <td>年化收益率</td>
                    </tr>
                    <tr class="cRed">
                        <td>{{el.amount}}</td>
                        <td>{{el.period}}</td>
                        <td>{{el.yearRate}}%</td>
                    </tr>
                </table>
                <div class="bar">
                    <i class="dot dot-blue"></i>
                    <div class="cur" :style="{width:el.progress}+'%'">
                        <i class="dot dot-blue dot-right"></i>
                    </div>
                    <i class="dot dot-right"></i>
                </div>
                <table>
                    <tr class="cRed">
                        <td>{{el.hasInvestAmount}}</td>
                        <td>{{el.investAmount}}</td>
                        <td>{{el.progress}}%</td>
                    </tr>
                    <tr class="cGray f12">
                        <td>已借款</td>
                        <td>还差金额</td>
                        <td>筹款进度</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <div class="wrapper-pannel" v-if="data.news">
        <div class="title-bar">社区服务<a href="http://capi.hehenian.com/page/shop/goodsList.html?siteId=10001&v=20160725" class="more">更多</a></div>
        <div class="acitvity-list clearfix">
            <div v-for="el in data.news.data">
                <h3><a :href="filterUrl(el.nav)">{{el.name}}</a></h3>
                <p>{{el.description}}</p>
                <div class="img">
                    <a :href="filterUrl(el.data[0].link)"><img :src="el.data[0].img"></a>
                </div>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
import 'mint-ui/lib/swipe/style.css';
import 'mint-ui/lib/swipe-item/style.css';
import Swipe from 'mint-ui/lib/swipe/';
import SwipeItem from 'mint-ui/lib/swipe-item/';
import { mapState, mapMutations } from 'vuex';

import IndexModule from '@/store/modules/index.js';

export default {
    components: {
        'mt-swipe':Swipe,
        'mt-swipe-item': SwipeItem
    },
    computed: {
        ...mapState('IndexModule',{
            'data': state => state.data
        })
    },
    methods: {
      filterUrl:function(url){
        if(!url){
            return 'javascript:;';
        }else if(url.indexOf('#!')>-1){
            return '#'+url.split('#!').pop();
        }else{
            return url;
        }
      },
      filterIcon:function(src){
        return src.split('/').pop().split('.')[0];
      }
    },
    beforeCreate() {
        this.$store.registerModule('IndexModule', IndexModule);
        this.$store.dispatch('IndexModule/syncDate');
    },
    destroyed () {
        this.$store.unregisterModule('IndexModule');
    }
}
</script>

<style>
.index-container{background: #eee;padding-bottom: 65px;}
.top-nav{height:44px;line-height:44px;position:relative;color:#000;text-align:center;font-size:18px;background:#fff;border-bottom:1px solid #DCDCDC;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 10px;}
.top-nav .icon{display:block;width:25px;height:25px;}
.top-nav .icon-msg{background-position:-50px 0;left:10px;}
.top-nav .icon-setting{background-position:-75px 0;}
.top-nav h1{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;}
.mint-swipe{height: 130px;}
.mint-swipe-item{background-size: cover;background-position: 50% 50%;}
.mint-swipe-item > a{display: block;height: 130px;}

.imenu-list{background-color:#fff;margin-top:10px;border-top:1px solid #DCDCDC;}
.imenu-list .item{display:-webkit-box;display:-webkit-flex;display:flex;}
.imenu-list .item>a{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;border-bottom:1px solid #DCDCDC;border-right:1px solid #DCDCDC;-webkit-box-align:center;-webkit-align-items:center;align-items:center;text-align:center;font-size:0;padding:10px 0;color:#444;}
.imenu-list .item>a:active{background-color:#f2f2f2;}
.imenu-list .item>a:last-child{border-right:none;}
.imenu-list .icon,.plat-data .icon,.safe-tip .icon{display:inline-block;width:40px;height:40px;background-image:url(http://static.hehenian.com/m/v4/images/index-icons.png);-webkit-background-size:120px auto;background-size:120px auto;}
.imenu-list .item p{font-size:12px;}
.imenu-list .icon-welfare{background-position:0 0;}
.imenu-list .icon-school{background-position:-40px 0;}
.imenu-list .icon-financial{background-position:-80px 0;}
.imenu-list .icon-risk{background-position:0 -40px;}
.imenu-list .icon-reading{background-position:-40px -40px;}
.imenu-list .icon-luxury{background-position:-80px -40px;}
.imenu-list .icon-balance{background-position:0 -80px;}
.imenu-list .icon-assets{background-position:-40px -80px;}
.imenu-list .icon-bill{background-position:-80px -80px;}

.plat-data{display: -webkit-box;display: -webkit-flex;display: flex;height: 116px;}
.plat-data a{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align: center;-webkit-box-align: center;-webkit-align-items: center;align-items: center;display: block;width: 100%;color: #6A3906;padding: 15px 0;}
.plat-data a:hover{background-color: #f2f2f2;}
.plat-data .icon{display: inline-block;width: 44px;height: 44px;}
.plat-data .icon-users{background-position: 0 -120px;}
.plat-data .icon-income{background-position: -44px -120px;}
.plat-data .icon-invest{background-position: 0 -164px;}
.plat-data h3{font-size: 14px;padding-bottom: 5px;}
.plat-data p{font-size: 12px;}

.title-bar{color:#BA7C29;font-size:14px;border-left:2px solid #BA7C29;height:40px;line-height:40px;border-bottom:1px solid #ddd;padding:0 10px;}
.title-bar .more{float:right;color:#BA7C29}
.wrapper-pannel{background-color:#fff;margin-top:10px;border-top:1px solid #DCDCDC;border-bottom:1px solid #DCDCDC;}


.targets{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:15px 0;height: 121px;}
.targets .name{width:72px;margin:0 10px;display:block;text-align:center;}
.targets .name:active{background:#f2f2f2;}
.targets .name h3{font-size:14px;}
.targets .name p{font-size:12px;}
.targets .cGray{color:#999;}
.progress .chGray{color:#929292;font-size:14px;}
.progress .f12{font-size:12px;}
.targets .progress{-webkit-box-flex:1;-webkit-flex:1;flex:1;}
.targets table{width:100%;}
.targets table td{width:33.33%;}
.targets .bar{height:2px;background-color:#ccc;margin:10px 25px 10px 0;position:relative;}
.targets .bar .cur{height:2px;background-color:#AFE5F9;position:relative;z-index:20;}
.targets .bar .dot{display:block;position:absolute;width:14px;height:14px;border-radius:7px;background:#ccc;border:2px solid #E7E7E7;top:-6px;z-index:21;}
.targets .bar .dot-blue{background:#4FC5F2;border:2px solid #AFE5F9;}
.targets .bar .dot-right{right:-5px;z-index:8;}
.acitvity-list h3{     overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;}
.acitvity-list>div{ height: 220px; overflow: hidden; display:block;width:50%;float:left;border-top:1px solid #E0E0E0;position: relative; padding:15px;box-sizing: border-box;-webkit-box-sixzing:border-box;}
.acitvity-list>div:nth-child(2n+1):after{content: '';display: block;width: 1px;height: 100%; background:#E0E0E0;right: 0px;top:0px;position: absolute;}
.acitvity-list>div:nth-child(1),
.acitvity-list>div:nth-child(2){border-top:none;}
.acitvity-list>div:active{background-color:#f2f2f2;}
.acitvity-list>div:last-child{border-right:none;}
.acitvity-list img{overflow: hidden; width:100%;min-height: 130px;max-height: 150px;}
.acitvity-list p{color:#929292;margin:3px 0 5px;font-size:12px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;}
</style>
<template>
    <div class="container">
        <mt-header title="借款散标">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">本金保障区</mt-tab-item>
            <mt-tab-item id="2">债权转让区</mt-tab-item>
        </mt-navbar>
        <div class="list-filter" v-show="selected==1">
            <div class="bd">
                <ul id="filterBtn">
                    <li :class="{'on':params.sortName=='remainTimeStart'}" @click="syncSort('remainTimeStart')">全部</li>
                    <li :class="{'on':params.sortName=='annualRate'}" @click="syncSort('annualRate')">利率
                        <i :class="[params.sortOrder]"></i>
                    </li>
                    <li :class="{'on':params.sortName=='deadline'}" @click="syncSort('deadline')">期限
                        <i :class="[params.sortOrder]"></i>
                    </li>
                    <li :class="{'on':params.sortName=='borrowAmount'}" @click="syncSort('borrowAmount')">金额
                        <i :class="[params.sortOrder]"></i>
                    </li>
                    <li :class="{'on':params.sortName=='schedules'}" @click="syncSort('schedules')">进度
                        <i :class="[params.sortOrder]"></i>
                    </li>
                </ul>
            </div>
        </div>
        <div :class="{'targets-list':selected==1,'transfer-list':selected==2}" v-infinite-scroll="asyncData" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <div v-for="el in loadData">
            <router-link class="item" :to="{path:'/debt/detail',query:{businessNo:el.businessNo}}" v-if="selected==1">
                <dl>
                    <dt>{{el.loanTitle}}</dt>
                    <dd>借款金额： {{el.borrowAmount}}元</dd>
                    <dd>借款期限： {{el.periods+(el.periodsCompany=='月'?'个月' : '天')}}</dd>
                    <dd>年化收益率： {{el.investAnnualRate}}%</dd>
                    <dd>
                        <span class="cGold">{{el.repayWay}}</span>
                    </dd>
                </dl>
                <div class="progress">
                    <div class="svg">
                        <svg width="60" height="60" viewBox="0 0 60 60">
                            <circle cx="30" cy="30" r="25" stroke-width="5" stroke="#D1D3D7" fill="none"></circle>
                            <circle cx="30" cy="30" r="25" stroke-width="5" stroke="#D6A151" fill="none" transform="matrix(0,-1,1,0,0,60)" :stroke-dasharray="3.14*2*25*el.borrowProgress/100+' 157'"></circle>
                            <text x="50%" y="50%" dy=".3em" font-size="14" text-anchor="middle" fill="#D6A151">{{el.borrowProgress}}%</text>
                        </svg>
                    </div>
                    <dl>
                        <dd>已成功借款：
                            <span class="cGold">{{el.investedAmount}}元</span>
                        </dd>
                        <dd>还差借款：
                            <span class="cGold">{{el.surplusAmount}}元</span>
                        </dd>
                    </dl>
                </div>
            </router-link>
            <div class="item" v-else-if="selected==2">
                <a v-if="el.tradeStatus==1" :to="{path:'/transfer/detail',query:{id:el.id}}" class="btn">转让中</a>
                <span v-else class="span_btn">{{getTransferStatus(el.tradeStatus)}}</span>
                <a href="javascript:;" class="link">
                    <h3 class="title">{{el.loanTitle}}</h3>
                    <table>
                        <tr class="first">
                            <td><p>￥{{el.tradeAmount}}</p>转让总额</td>
                            <td><p>{{el.rate}}%</p>到期收益率 </td>
                            <td><p>{{el.createTime}}</p>申请时间 </td>
                        </tr>
                        <tr class="last">
                            <td><p>￥{{el.tradeAmount}}</p> 债权总额 </td>
                            <td><p>{{el.rate}}%</p> 原始利率 </td>
                            <td><p>{{el.periods}}个月</p> 总期数 </td>
                        </tr>
                   </table>
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
import Navbar from 'mint-ui/lib/navbar/';
import TabItem from 'mint-ui/lib/tab-item/';
import InfiniteScroll from 'mint-ui/lib/infinite-scroll/';
import Spinner from 'mint-ui/lib/spinner/';


import 'mint-ui/lib/navbar/style.css';
import 'mint-ui/lib/tab-item/style.css';
import 'mint-ui/lib/spinner/style.css';
export default {
    data() {
        return {
            selected: '1',
            loadData: [],
            params:{
                pageNo:1,
                pageSize:10,
                sortName: 'remainTimeStart',
                sortOrder: 'desc'
            },
            loading: false
        }
    },
    watch: {
      'selected': function () {
          this.refresh();
      }
    },
    components: {
        'mt-navbar': Navbar,
        'mt-tab-item': TabItem,
        'mt-spinner': Spinner
    },
    methods: {
        asyncData(){
            let src = this.selected==1?'/loan/list.do':'/loan/debtList.do';
            this.loading = true;
            this.$axios.get(src, {params: this.params})
            .then(res=>{
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
            });
        },
        refresh(){
            this.loadData = [];
            this.loading = false;
            this.params.pageNo = 1;
            this.params.sortOrder = 'desc';
            this.asyncData();
        },
        getTransferStatus(status){
            if(status==1){
                return '转让中';
            } else if(status==2){
                return '已转让';
            }
            return '已过期';
        },
        syncSort(sortName){
            if(this.loading){
                return;
            }
            if(this.params.sortName==sortName){
                this.params.sortOrder = this.params.sortOrder!='asc'? 'asc': 'desc';
                this.loadData = [];
                this.loading = false;
                this.params.pageNo = 1;
                this.asyncData();
            }else{
                this.params.sortName=sortName;
                this.refresh();
            }
        }
    }
}
</script>
<style>
.list-filter{height:54px;margin-top: 10px;}
.list-filter .bd{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:54px;background-color:#fff;}
.list-filter .bd.fixed{position:fixed;width:100%;left:0;top:0;z-index:999;box-shadow:0 2px 2px rgba(0,0,0,.1);}
.list-filter ul{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;}
.list-filter li{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;font-size:14px;position:relative;}
.list-filter i{display:inline-block;width:1em;height:1em;position:relative;bottom:-2px;right:-4px;}
.list-filter i:before,
.list-filter i:after{content:'';display:inline-block;width:0;height:0;overflow:hidden;border-width:4px;position:absolute;}
.list-filter i:before{border-color:transparent transparent #838282;border-style:dashed dashed solid;top:-2px;left:0;}
.list-filter i:after{border-color:#838282 transparent transparent;border-style:solid dashed dashed;bottom:-2px;left:0;}
.list-filter li.on{color:#D7980B;}
.list-filter li.on i.asc:before{/*升序*/
border-color:transparent transparent #D7980B;}
.list-filter li.on i.desc:after{/*降序*/
border-color:#D7980B transparent transparent;}
.list-filter.border li:after{content:'';display:block;width:1px;height:2em;overflow:hidden;background-color:#E2E2E2;position:absolute;right:0;top:50%;margin-top:-1em;}
.list-filter.border li:last-child:after{display:none;}



.targets-list{padding-bottom:5px;}
.targets-list .item{display:block;background-color:#fff;border-top:1px solid #DCDCDC;border-bottom:1px solid #DCDCDC;padding:15px 15px 15px 30px;display:-webkit-box;display:-webkit-flex;display:flex;position:relative;-webkit-box-align:center;-webkit-align-items:center;align-items:center;overflow:hidden;margin-bottom:5px;}
.targets-list .item:active{background:#f2f2f2;}
.targets-list .item:before{content:'散标';display:block;position:absolute;font-size:12px;width:80px;height:27px;background:-webkit-linear-gradient(#CA8E41,#E1B160);background:linear-gradient(#CA8E41,#E1B160);color:#fff;text-align:center;line-height:30px;left:-28px;top:-8px;padding-top:10px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);}
.trasnferList .item:before{content: '债权'}
.targets-list dt{font-size:15px;padding-bottom:5px;}
.targets-list dd{font-size:14px;color:#6F6F6F}
@media (max-width: 320px) {
	.targets-list dd{font-size:12px;}
}
.targets-list dl{-webkit-box-flex:1;-webkit-flex:1;flex:1;line-height:1.8;}
.targets-list .svg{display:block;margin:10px auto 5px;height:60px;position:relative;}
.targets-list svg{position:absolute;right:10px;font-size:12px;}



/*债权转让区*/
.transfer-list{margin-top: 10px;}
.transfer-list h3{padding-bottom:10px;height:30px;}
.transfer-list .item{background:#fff;border-top:1px solid #DCDCDC;border-bottom:1px solid #DCDCDC;margin-bottom:5px;position: relative;}
.transfer-list table{width:100%;font-size:12px;color:#6F6F6F;text-align:center;}
.transfer-list .first td{padding-bottom:10px;border-bottom:1px solid #DCDCDC;border-right:1px solid #DCDCDC;}
.transfer-list .last td{padding-top:10px;border-right:1px solid #DCDCDC;}
.transfer-list table tr>td:last-child{border-right:none;}
.transfer-list table p{color:#CD9245}
.transfer-list .btn{display:block;width:4em;text-align:center;height:30px;line-height:30px;border:1px solid #CD9245;border-radius:4px;color:#CD9245;position:absolute;right:20px;top:10px;}
.transfer-list .span_btn{display:block;width:4em;text-align:center;height:30px;line-height:30px;border-radius:4px;color:#CD9245;position:absolute;right:20px;top:10px;}
.transfer-list .btn:active{background:#CD9245;color:#fff;}
.transfer-list .link{display: block;padding:20px;}
.transfer-list .link:active{background: #f2f2f2;}

</style>



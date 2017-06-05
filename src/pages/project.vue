<template>
    <div class="index-container">
        <mt-header title="项目列表">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="filter_items">
            <div class="filter_item" @click="timeToggle()">
                <span>项目期限</span>
                <span class="filter_label">{{timeText}}</span>
                <span class="fliter_text">选择</span>
            </div>
            <div class="filter_item" @click="statusToggle()">
                <span>项目状态</span>
                <span class="filter_label">{{statusText}}</span>
                <span class="fliter_text">选择</span>
            </div>
            <div class="filter_list">
                <div class="filter_bd">
                    <a href="javascript:;" @click="syncFilter('0')" :class="{'cur':sortName=='0'}">时间
                        <i :class="sortOrder"></i>
                    </a>
                    <a href="javascript:;" @click="syncFilter('1')" :class="{'cur':sortName=='1'}">投资期限
                        <i :class="sortOrder"></i>
                    </a>
                    <a href="javascript:;" @click="syncFilter('2')" :class="{'cur':sortName=='2'}">年化收益率
                        <i :class="sortOrder"></i>
                    </a>
                    <a href="javascript:;" @click="syncFilter('3')" :class="{'cur':sortName=='3'}">可投资额度
                        <i :class="sortOrder"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="product_list" v-infinite-scroll="syncDate" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
            <div v-for="item in loadData" class="product_item product_item_insert">
                <router-link :to="item.status==1?'project/'+item.projectId:''">
                    <div class="product_title" :class="{'product_title_aft':item.status!=1}">
                        <span class="debt_text">{{item.productName+item.period+'期'}}</span>
                        <span class="debt_num">已投:
                            <i class="debt_org">{{item.tradeCount}}</i>笔
                        </span>
                        <span class="debt_money">可投:
                            <i class="debt_org">{{parseMoneyHelper(item.surplusAmount)}}元</i>
                        </span>
                    </div>
                    <div class="product_inner">
                        <div class="inner_item">
                            <div class="inner_rate">
                                <p>{{item.rate}}<i>%</i></p>
                                <p>预期年化收益率</p>
                            </div>
                            <div class="inner_rate inner_rate2">
                                <p>{{item.period}}
                                    <i v-if="item.unit=='m'">个月 </i>
                                    <i v-else-if="item.unit=='d'">天 </i>
                                    <i v-else>年 </i>
                                </p>
                                <p>项目期限</p>
                            </div>
                            <div class="inner_info">
                                <p>{{item.pattern}}</p>
                                <p>投资次日计息</p>
                                <p>{{item.coefficient}}元起投</p>
                                <p>融资{{parseMoneyHelper(item.projectAmount)}}元</p>
                            </div>
                            <div class="inner_process">
                                <div class="svg">
                                    <svg width="80" height="80" viewBox="0 0 60 60">
                                        <circle cx="30" cy="30" r="25" stroke-width="5" stroke="#D1D3D7" fill="none"></circle>
                                        <circle cx="30" cy="30" r="25" stroke-width="5" stroke="#D6A151" fill="none" transform="matrix(0,-1,1,0,0,60)" :stroke-dasharray="3.14*2*25*item.finishRate/100+' 157'"></circle>
                                        <text x="50%" y="50%" dy=".3em" font-size="14" text-anchor="middle" fill="#D6A151">{{item.finishRate}}%</text>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
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
    
        <mt-popup v-model="timeFilterVisible" position="bottom">
            <mt-picker :slots="timeDataArr" :visible-item-count="5" :show-toolbar="true" title="上下滑动选择投资期限" :ok="timeFilterOk">
            </mt-picker>
        </mt-popup>
    
        <mt-popup v-model="statusFilterVisible" position="bottom">
            <mt-picker :slots="statusDataArr" :visible-item-count="5" :show-toolbar="true" title="上下滑动选择投资状态" :ok="statusFilterOk">
            </mt-picker>
        </mt-popup>
    
    </div>
</template>
<script>
import Project from '@/store/modules/project';
import { mapState, mapMutations,mapActions } from 'vuex';
import InfiniteScroll from 'mint-ui/lib/infinite-scroll/';
import Spinner from 'mint-ui/lib/spinner/';

import Picker from 'mint-ui/lib/picker/';
import Popup from 'mint-ui/lib/popup/';
import 'mint-ui/lib/picker/style.css';
import 'mint-ui/lib/popup/style.css';
import 'mint-ui/lib/spinner/style.css';

export default {
    data() {
        return {
            timeFilterVisible: false,
            statusFilterVisible: false,
            timeValue: 0,
            statusValue: 0,
            timeText: '全部',
            statusText: '全部',
            timeData: {
                '全部': 0,
                '24个月': 24,
                '12个月': 12,
                '6个月': 6,
                '3个月': 3,
                '2个月': 2,
                '1个月': 1
            },
            statusData: {
                '全部': 0,
                '融资中': 1,
                '已完成': 2
            },
            sortName:'creatTime',
            sortOrder: 'desc'
        }
    },
    computed: {
        timeDataArr() {
            return [{
                flex: 1,
                values: Object.keys(this.timeData)
            }];
        },
        statusDataArr() {
            return [{
                flex: 1,
                values: Object.keys(this.statusData)
            }]
        },
        filterRequest(){
            return {
                pageSize:5,
                pageNo:1,
                sortName: this.sortName,
                status: this.statusValue||'',
                period: this.timeValue||'',
                sortOrder: this.sortOrder
            }
        },
        ...mapState('Project',[
            'loadData',
            'loading'
        ])
    },
    watch: {
        'timeFilterVisible': function (val) {
            this.$store.state.mainTabbarVisible = !val;
        },
        'statusFilterVisible': function (val) {
            this.$store.state.mainTabbarVisible = !val;
        }
    },
    methods: {
        ...mapActions('Project',[
            'syncDate'
        ]),
        ...mapMutations('Project',[
            'setParams',
            'clearData'
        ]),
        timeToggle() {
            this.timeFilterVisible = !this.timeFilterVisible;
        },
        statusToggle() {
            this.statusFilterVisible = !this.statusFilterVisible;
        },
        timeFilterOk(values) {
            this.timeToggle();
            this.timeText = values[0];
            this.timeValue = this.timeData[this.timeText];
        },
        statusFilterOk(values) {
            this.statusToggle();
            this.statusText = values[0];
            this.statusValue = this.statusData[this.statusText];
        },
        parseMoneyHelper(str){
            if( parseFloat(str) > 9999 ) {
                return (parseInt(str/10000).toFixed(2)+'').replace(/\.00/,'') + '万';
            }
            return str;  
        },
        syncFilter(sortName){
            var sort;
            if(this.sortName != sortName){
                sort = 'desc';
            }else{
                sort =  this.sortOrder=='asc'?'desc':'asc'
            }

            this.filterRequest.sortName = sortName;
            this.filterRequest.sortOrder = sort;
            this.filterRequest.status = this.statusValue||'';
            this.filterRequest.period = this.timeValue||'';

            this.sortName = sortName;
            this.sortOrder = sort;

            this.refresh();
        },
        refresh(){
            this.setParams(this.filterRequest);
            this.clearData();
            this.syncDate();
        }
    },
    components: {
        'mt-popup': Popup,
        'mt-picker': Picker,
        'mt-spinner': Spinner
    },
    beforeMount () {
         this.$store.registerModule('Project', Project);
         this.$store.commit('Project/setParams',this.filterRequest);
    },
    destroyed() {
        this.$store.unregisterModule('Project');
    }
}
</script>

<style>
.filter_items {
    background: #fff;
}

.filter_item:after,
.product_title:after {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    font-size: 0;
    border-top: 1px solid #AEAEAE;
    border-right: 1px solid #AEAEAE;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    margin-top: -5px;
    top: 50%;
    right: 15px;
    -webkit-transition: all .3s;
    transition: all .3s;
}

.product_title_aft:after {
    display: none;
}

.filter_item {
    position: relative;
    padding: 15px 0px;
    border-bottom: 1px solid #cccccc;
    font-size: 14px;
    padding-left: 15px;
}

.filter_label {
    margin-left: 30px;
    color: #ef702c;
}

.fliter_text {
    float: right;
    color: #e09423;
    margin-right: 30px;
}

.filter_list {
    border-bottom: 1px solid #cccccc;
    padding: 15px 0px;
    font-size: 14px;
    
}

.filter_bd {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    background-color: #fff;
}

.filter_bd a {
    text-align: center;
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
    font-size: 14px;
    position: relative;
}

.filter_bd a i {
    display: inline-block;
    width: 1em;
    height: 1em;
    position: relative;
    bottom: -2px;
    right: -2px;
}

.filter_bd a i:before,
.filter_bd a i:after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    overflow: hidden;
    border-width: 4px;
    position: absolute;
}

.filter_bd a i:before {
    border-color: transparent transparent #838282;
    border-style: dashed dashed solid;
    top: -2px;
    left: 0;
}

.filter_bd a i:after {
    left: 0px;
    border-color: #838282 transparent transparent;
    border-style: solid dashed dashed;
    bottom: -2px;
}

.filter_bd a.cur {
    color: #e09423;
}

.filter_bd a.cur i.desc:after {
    border-color: #b7761c transparent transparent;
}

.filter_bd a.cur i.asc:before {
    border-color: transparent transparent #b7761c;
}

.product_list {position: relative; margin-top: 10px;}
	.product_title {color: #757575; line-height: 24px;position: relative; padding:15px 0px;padding-left: 15px; border-top: 1px solid #ccc;border-bottom: 1px solid #ccc; }
		.debt_money { float: right;margin-right: 15px;font-size: 13px;  }
		.debt_num { float: right;margin-right: 30px;font-size: 13px; }
		.debt_text { color: #e09423;font-size: 15px; }
		.debt_org { color: #ef702c; }
	.product_inner { border-bottom: 1px solid #ccc; }
	.product_item { margin-bottom: 5px; background: #fff;  }
  .product_item > a{display: block;}
	.product_item:last-child { margin-bottom: 0px; }
	.inner_item > div { -webkit-box-flex: 1;-webkit-flex: 1;flex: 1; }
	.inner_item {padding: 20px 0px; white-space:break-all;display: -webkit-box;display: -webkit-flex;display: flex;position: relative;}
	.inner_process { position: relative;    display: block;display: -webkit-box;display: -webkit-flex;display: flex;-webkit-box-align: center;-webkit-align-items: center;align-items: center; }
	.circleProgress_wrapper {margin: 0 auto;position: relative; width: 60px;height: 60px;border: 5px solid #e0e0e0; border-radius: 60px; }
		.cl_wrapper{width: 30px;height: 60px;position: absolute;top:-5px;overflow: hidden;}
		.cl_wrapper_right{right:-5px;}
		.cl_wrapper_left{left:-5px;}
		.circleProgress{ width: 60px;height: 60px;border:5px solid transparent;border-radius: 50%;position: absolute;top:0;}
		.rightcircle{ border-top:5px solid #e09423;border-right:5px solid #e09423;right:0;-webkit-transform: rotate(-135deg);-webkit-transition: transform 1s;}
		.leftcircle {   border-bottom:5px solid #e09423;border-left:5px solid #e09423;left:0;-webkit-transform: rotate(-135deg); -webkit-transition: transform 1s;-webkit-transition-delay:.9s;}
		.progress_num {display: block;width: 60px;text-align: center; position: absolute;left:50%;top: 50%;transform: translate(-50%, -50%);color: #e09423; -webkit-transform: translate(-50%, -50%); }
		.progress_num_end { color: #9e9e9e;font-size: 13px; }
		.inner_rate { padding-left: 15px; }
		.inner_rate.inner_rate2 {box-sizing: border-box; text-align: left; padding-left: 15px;}
		.inner_rate p:first-child { font-size: 30px; color: #e5a035;}
		.inner_rate p:last-child { color: #757575;font-size: 12px; }
		.inner_rate p:first-child i { font-size: 15px; color:#e5a035;}
		.inner_info { margin-left: -10px; }
		.inner_info p { color: #5d5c5c;line-height: 22px;font-size: 13px; }
		.inner_info p:nth-of-type(1) { color: #ef702c; }

.mint-popup {
    width: 100%;
}

.picker-toolbar {
    padding-left: 10px;
    line-height: 40px;
    background-color: #B68E50;
    color: #fff;
}

.picker-slot-wrapper,
.picker-item {
    backface-visibility: hidden;
}

.page-infinite-loading{
            text-align: center;
        height: 50px;
        line-height: 50px;
        background-color:#fff;
        
}
.page-infinite-loading div{
            display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
</style>

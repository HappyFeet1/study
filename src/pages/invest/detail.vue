<template>
<div class="container">
    <mt-header :title="'投资详情-'+view.product_name">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
    </mt-header>
    <div class="invest-detail">
        <h2 class="cGold">订 单 号：{{view.trade_id}}</h2>
        <ul>
            <li>产品名称：{{view.product_name}}-{{view.period}}月</li>
            <li>购买时间：{{view.create_time||(view.create_time.time|date('yyyy-MM-dd hh:mm:ss'))}}</li>
            <li>购买金额：{{view.trade_amount}}元</li>
            <li>年化利率：{{view.rate*100|fixed2}}%</li>
        </ul>
    
        <!-- 小钱库 -->
        <div class="account-pannel" v-if="view.trade_status=='xqk'">
            <div class="btns">
                <a href="http://m.hehenian.com/finance/prepay.do?pid=228">购 买</a>
                <a href="http://m.hehenian.com/profile/redeemPagePhone.do?channel=0&subChannel=9">赎 回</a>
            </div>
        </div>
    
        <div class="link-item" id="statusTarget">
           
        </div>
    
        <div class="link-item">
            <a :href="'http://m.hehenian.com/product/queryAgreement.do?fileName='+view.agreementFileName">
                <p>购买协议：</p>
                <span class="cGray">点击查看</span>
            </a>
            <router-link :to="{path:'/invest/fundFlow',query:{tradeId:view.trade_id}}">
                <p>资金流向：</p>
                <span class="cGray">点击查看</span>
            </router-link>
        </div>
    </div>
    <script id="statusTpl" type="text/template">
        <#if('SUCCESS' == status){#>
            <#if(obj.canRedeem==1) {#>
                <#if((obj.channel==0&&obj.sub_channel==2)||(obj.channel==1&&obj.sub_channel==4)||(obj.channel==8&&obj.sub_channel==2)||(obj.channel == 3 && obj.sub_channel == 6)||obj.sub_channel == 5||(obj.channel==11&&(obj.sub_channel==2))){#>
                    <#if(obj.purchasestatus==1||obj.purchasestatus==2){#>
                        <a href="javascript:;" class="j-changeAutoPurchase" data-status="<#=obj.purchasestatus#>" data-trade_id="<#=obj.trade_id#>">
                            <p>投资状态：</p>
                            <#if(obj.purchasestatus==1){#>
                                <span class="cRed"><i class="cGray">投资中</i><br><b>已关闭自动续投</b></span>
                            <#}else if(obj.purchasestatus==2){#>
                                <span class="cGreen"><i class="cGray">投资中</i><br><b>已开启自动续投</b></span>
                            <#}#>
                        </a>
						<#if(obj.sub_channel==6&&obj.channel==3){#>
							<a href="http://m.hehenian.com/profile/redeemPagePhone.do?tradeId=<#=obj.trade_id#>">
                              <p>投资操作：</p>
                              <span class="cBlue">提前赎回</span>
                           </a>	
						<#}#>
                    <#}else{#>
                        <a href="http://m.hehenian.com/profile/redeemPagePhone.do?tradeId=<#=obj.trade_id#>">
                            <p>投资状态：</p>
                            <span class="cBlue"><i class="cGray">投资中</i><br>提前赎回</span>
                        </a>
                    <#}#>
                <#}else{#>
                    <a href="http://m.hehenian.com/profile/redeemPagePhone.do?tradeId=<#=obj.trade_id#>">
                        <p>投资状态：</p>
                        <span class="cBlue"><i class="cGray">投资中</i><br>提前赎回</span>
                    </a>
                <#}#>
            <#}else if(obj.canRedeem == 2){#>
                 <a href="javascript:;" class="no-arrow">
                    <p>投资状态：</p>
                    <span class="cGray"><i class="cGray">投资结束</i><br>自动赎回</span>
                </a>
            <#}else{#>
                <#if ((obj.channel == 0 && obj.sub_channel == 2) || (obj.channel == 1 && obj.sub_channel == 4) || (obj.channel == 8 && obj.sub_channel == 2) ||(obj.channel == 3 && obj.sub_channel == 6)||obj.sub_channel == 5||(obj.channel==11&&(obj.sub_channel==2))) {#>
                    <#if(obj.purchasestatus==1||obj.purchasestatus==2){#>
                        <a href="javascript:;" class="j-changeAutoPurchase" status="<#=obj.purchasestatus#>" tradeId="<#=obj.trade_id#>">
                            <p>投资状态：</p>
                            <#if(obj.purchasestatus==1){#>
                                <span class="cRed"><i class="cGray">投资中</i><br><b>已关闭自动续投</b></span>
                            <#}else if(obj.purchasestatus==2){#>
                                <span class="cGreen"><i class="cGray">投资中</i><br><b>已开启自动续投</b></span>
                            <#}#>
                        </a>
                    <#}else if(obj.sub_channel==1){#>
                        <a href="javascript:;" class="no-arrow">
                            <p>投资状态：</p>
                            <span class="cDGray"><i class="cGray">投资中</i></span>
                        </a>
                    <#}else{#>
                        <a href="javascript:;" class="no-arrow">
                            <p>投资状态：</p>
                            <span class="cGray"><i>投资中</i><br>锁定期</span>
                        </a>
                    <#}#>
                <#}else{#>
                    <a href="javascript:;" class="no-arrow">
                        <p>投资状态：</p>
                        <span class="cGray">投资锁定期<#=obj.sub_channel#></span>
                    </a>
                <#}#>
            <#}#>
        <#} else if ('PREREDEEM' == status) {#>
            <a href="javascript:;" class="no-arrow">
                <p>投资状态：</p>
                <span class="Gray">提前赎回处理中</span>
            </a>
        <#} else if('REDEEM' == status) {#>
            <#if(obj.autoRedeem=='1'){#>
                <a href="javascript:;" class="no-arrow">
                    <p>投资状态：</p>
                    <span class="cGreen">自动赎回成功</span>
                </a>
            <#}else{#>
                <a href="javascript:;" class="no-arrow">
                    <p>投资状态：</p>
                    <span class="cGreen">提前赎回成功</span>
                </a>
            <#}#>
        <#}else if('xqk' == status){#>
            <a href="http://m.hehenian.com/profile/xqkTradeRecord.do?tradeType=PROFIT&channel=0&subChannel=9">
                <p>每日收益：</p>
                <span class="cGray">点击查看</span>
            </a>
            <a href="http://m.hehenian.com/profile/xqkTradeRecord.do?tradeType=REDEEM&channel=0&subChannel=9">
                <p>赎回记录：</p>
                <span class="cGray">点击查看</span>
            </a>
            <a href="http://m.hehenian.com/profile/markProofOfPurchase.do?tradeId=<#=obj.trade_id#>">
                <p>购买凭证：</p>
                <span class="cGray">点击查看</span>
            </a>
        <#}else{#>
            <a href="javascript:;" class="no-arrow">
                <p>投资状态：</p>
                <span class="cGray">投资失败</span>
            </a>
        <#}#>
    </script>
</div>
</template>
<script>
import artTemplate from 'static/js/template.js';

export default {
    data(){
        return {
            view:{
                create_time:{time:''}
            }
        }
    },
    methods:{
        asyncData(){
            var tradeId = this.$route.query.tradeId,
            data = sessionStorage.getItem('investDetail');
            if (!data) {
                this.$toast('操作异常，请尝试重新操作！');
                return;
            }
            this.view = JSON.parse(data);
            var html = artTemplate('statusTpl', {
                obj    : this.view,
                status : this.view.trade_status
            });
            document.getElementById('statusTarget').innerHTML = html;
            //下面接口确实 canRedeem 等字段
            // this.$indicator.open();
            // this.$axios.get('/profile/queryTradeDetail.do', {params:{tradeId: this.$route.query.tradeId}})
            // .then(res=>{
            //     this.$indicator.close();
            //     if(res.code===0){
            //         this.view = res.data;
            //         var html = artTemplate('statusTpl', {
            //             obj    : res.data,
            //             status : res.data.trade_status
            //         });
            //         document.getElementById('statusTarget').innerHTML = html;
            //     }else{
            //         this.$toast('服务器出错！');
            //     }
            // })
        },
        changeAutoPurchase(tradeId, flag, target){
                this.$modal({
                    title: '自动续投设置',
                    content: '请确认是否'+(flag==1?'关闭':'开启')+'自动续投？',
                    okText: '确定',
                    cancelText: '取消',
                    ok: function() {
                        $.post('/profile/changeAutoPurchase.do', {
                            flag    : flag,
                            tradeId : tradeId
                        }, function(json) {
                            returnSuccess(json, flag, target);
                        }, 'json');
                    },
                    cancel: function() {

                    }
                });
        },
        returnSuccess(json, flag, target) {
            if (json.result == '0') {
                this.$toast("操作失败，请联系客服人员！");
            } else if (json.result == '1') {
                this.view.purchasestatus = flag;
                sessionStorage.setItem('investDetail', JSON.stringify(this.view));
                var html = artTemplate('statusTpl', {
                    obj    : this.view,
                    status : this.view.trade_status
                });
                document.getElementById('statusTarget').innerHTML = html;
            }
        }
    },
    mounted(){
        this.asyncData();

        document.getElementById('statusTarget').addEventListener('click', (e)=>{
                if(this.className=='j-changeAutoPurchase'){
                    let target = e.srcElement;
                    let tradeId = target.tradeId,
                    status = parseInt(target.status) == 1 ? 2 : 1; 
                    this.changeAutoPurchase(tradeId, status, target);
                }
        });
    }
}
</script>
<style>
    .invest-detail{background: #fff;color: #111;margin-top: 10px;}
    .invest-detail h2{border-bottom: 1px solid #DCDCDC;padding: 15px 10px;}
    .invest-detail ul{padding:  10px;}
    .invest-detail ul li{padding: 5px 0;}
    .invest-detail .link-item{margin-left: 10px;}
    .invest-detail .link-item a{display: block;display: -webkit-box;display: -webkit-flex;display: flex;border-top: 1px solid #dcdcdc;position: relative;color: #111;-webkit-box-align: center;-webkit-align-items: center;align-items: center;position: relative;height: 50px;line-height: 1;}
    .invest-detail .link-item a:after{content:'';display: block;width: 10px;height: 10px;position: absolute;border-top:1px solid #ccc;border-right:1px solid #ccc;top:50%;right:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg);margin-top: -6px;}
    .invest-detail .link-item a.no-arrow:after{display: none;}
    .invest-detail .link-item p{-webkit-box-flex:1;-webkit-flex:1;flex:1;}
    .invest-detail .link-item span{display: block;margin-right: 30px;text-align: center;}
    .account-pannel{border: none;padding-bottom: 8px;padding-top: 10px;border-top: 10px solid #EEE;}
    .account-pannel .btns{display:-webkit-box;display:-webkit-flex;display:flex;padding:0;}
    .account-pannel .btns a{height:46px;line-height:46px;border-radius:23px;background-color:#DC9F2B;-webkit-box-flex:1;-webkit-flex:1;flex:1;margin:0 17px;color:#fff;text-align: center;}
    .account-pannel .btns a:active{background-color:#CE7C00;}
</style>

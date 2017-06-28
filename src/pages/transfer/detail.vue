<template>
    <div class="container">
        <mt-header title="债权转让详情">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="targets-list trasnferList" style="padding-bottom:0; margin-top:10px;">
        <div class="item-v">
            <div class="item" style="margin-top:0">
                <dl>
                    <dd>剩余本金（元）： {{info.receivablePrincipal}}元</dd>
                    <dd>应收利息（元）： {{info.receivableInterest}}</dd>
                    <dd>年化收益率： {{info.loanRate}}%</dd>
                    <dd>转让价格（元）：{{info.tradeAmount}}</dd>
                    <dd>债权转让状态：{{getDebtStatus(info.tradeStatus)}}</dd>
                    <dd>剩余期限：{{info.loanPeriod}}天</dd>
                </dl>
            </div>
            <div class="time">
                <p>
                    剩余期限：<span class="cGold">{{getTime(info.remainingTime)}}</span>
                </p>
                <p>
                    下一还款日：<span class="cGold">{{info.nextPaymentTime}}</span>
                </p>
            </div>
        </div>
    </div>
    <div class="cell-container" style="margin-top:10px;">
        <mt-cell title="借款人基本信息" to="/transfer/baseInfo" is-link>
            </mt-cell>
        <mt-cell title="审核信息" to="/transfer/verifyInfo" is-link>
        </mt-cell>
        <mt-cell title="投资记录" :to="{path:'/transfer/repaymentInfo',query:{businessNo:businessNo}}" is-link>
        </mt-cell>
    </div>
    </div>
</template>
<script>
import  Cell from 'mint-ui/lib/cell/';
import 'mint-ui/lib/cell/style.css';
export default {
  data(){
      return {
          info:{},
          businessNo:''
      };
  },
  methods:{
      getDebtStatus(status){
          if (status == 1) {
              return '转让中';
          } else if (status == 2) {
              return '已转让';
          }
          return '已过期';
      },
      asyncData(){
          this.$axios.get('/loan/debtDetail.do', {params:{ id: this.$route.query.id}})
          .then(res=>{
              if(res.code===-1||!Object.keys(res).length){
                  this.$toast('查询无结果！');
                  return;
              }
              sessionStorage.setItem('$$transferDetailCache', JSON.stringify(res));
              this.info = res.debtInfo || {};
              this.businessNo = res.loanInfo.businessNo;
          })
      },
      getTime(t){
          if(t<1){return '已经结束';}
        var day = Math.floor(t/24/3600),
            hours = Math.floor((t-day*24*60*60)/60/60),
            minute = Math.floor((t-day*24*60*60-hours*60*60)/60);
            return day+'天'+hours+'时'+minute+'分';
      }
  },
  beforeMount(){
      this.asyncData();
  },
  components:{
      'mt-cell':Cell
  }
}
</script>
<style>
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
.targets-list .item-v .item{border-bottom:none;}
.targets-list .item-v{font-size:12px;background:#fff;border-bottom:1px solid #DCDCDC;}
.targets-list .item-v .time{padding:10px 0;margin-left:30px;border-top:1px solid #DCDCDC;display: -webkit-box;display: -webkit-flex;display: flex;}
.targets-list .item-v .time>p{-webkit-box-flex:1;-webkit-flex:1;flex:1;}

</style>


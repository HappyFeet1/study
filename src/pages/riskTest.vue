<template>
  <div class="container"> 
    <mt-header title="风险评测">
        <a href="javascript:;" @click="$router.back()" slot="left">
            <mt-button icon="back">返回</mt-button>
        </a>
    </mt-header>  
    <div class="risk-test" :style="{top:hideHeader?0:'40px'}">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="welcome">
                    <div class="risk-btn" @click="next()">开始测试</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subject">
                   <dl>
                        <dt>单选题</dt>
                        <dt>1、您的年龄：</dt>
                        <dd><label><input type="radio" v-model="m1" value="1">A、55岁以上</label></dd>
                        <dd><label><input type="radio" v-model="m1" value="2">B、45-55岁</label></dd>
                        <dd><label><input type="radio" v-model="m1" value="5">C、30-45岁</label></dd>
                        <dd><label><input type="radio" v-model="m1" value="6">D、30岁以下</label></dd>
                    </dl>
                    <div class="risk-btn risk-btn2" :class="{show:m1}" @click="next()">下一题</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subject">
                   <dl>
                        <dt>单选题</dt>
		                <dt>2、您的投资年限：</dt>
		                <dd><label><input type="radio" v-model="m2" value="1">A、1年以内</label></dd>
		                <dd><label><input type="radio" v-model="m2" value="2">B、1-5年</label></dd>
		                <dd><label><input type="radio" v-model="m2" value="5">C、5-10年</label></dd>
		                <dd><label><input type="radio" v-model="m2" value="6">D、10年以上</label></dd>
                    </dl>
                    <div class="risk-btn risk-btn2" :class="{show:m2}" @click="next()">下一题</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subject">
                   <dl>
                        <dt>单选题</dt>
						<dt>3、您的投资经验可以被概括为：</dt>
		                <dd><label><input type="radio" v-model="m3" value="1">A、无:除银行活期和定期储蓄存款外，基本没有其他投资经验</label></dd>
		                <dd><label><input type="radio" v-model="m3" value="2">B、有限：有过购买国债，货币型基金等保本型金融产品投资经验</label></dd>
		                <dd><label><input type="radio" v-model="m3" value="5">C、一般：具有一定的证券投资经验，需要进一步的指导</label></dd>
		                <dd><label><input type="radio" v-model="m3" value="6">D、丰富：是一位积极和有经验的证券投资者，并倾向于自己作出投资决定</label></dd>
                    </dl>
                    <div class="risk-btn risk-btn2" :class="{show:m3}" @click="next()">下一题</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subject">
                   <dl>
                        <dt>单选题</dt>
	                    <dt>4、您曾经或正在做的投资产品（若有多项限选风险最大的一项）：</dt>
		                <dd><label><input type="radio" v-model="m4" value="1">A、无</label></dd>
		                <dd><label><input type="radio" v-model="m4" value="2">B、债券、基金</label></dd>
		                <dd><label><input type="radio" v-model="m4" value="5">C、股票</label></dd>
		                <dd><label><input type="radio" v-model="m4" value="6">D、期货、权证</label></dd>
                    </dl>
                    <div class="risk-btn risk-btn2" :class="{show:m4}" @click="next()">下一题</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subject">
                   <dl>
                        <dt>单选题</dt>
						<dt>5、今后5年内您的预期收入？</dt>
		                <dd><label><input type="radio" v-model="m5" value="1">A、预期收入将不断减少</label></dd>
		                <dd><label><input type="radio" v-model="m5" value="2">B、预期收入将保持稳定</label></dd>
		                <dd><label><input type="radio" v-model="m5" value="5">C、预期收入将逐渐增加</label></dd>
                    </dl>
                    <div class="risk-btn risk-btn2" :class="{show:m5}" @click="next()">下一题</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subject">
                   <dl style="font-size:12px;">
                        <dt>单选题</dt>
						<dt>6、以下哪一种类型最好地描述了您的投资目标以及您对市场波动的适应度？</dt>
		                <dd><label><input type="radio" v-model="m6" value="1">A、无风险：我希望本金绝对安全，我对于短期市场波动感到不适应，愿意得到无风险收益</label></dd>
		                <dd><label><input type="radio" v-model="m6" value="2">B、低风险：我希望本金绝对安全，能接受2年内较小的波动，愿意尝试得到一定程度上大于定期存款的回报并承担部分收益减少的风险</label></dd>
		                <dd><label><input type="radio" v-model="m6" value="5">C、中风险：我倾向于平衡的方式，偏好投资于兼具成长性及收益性的产品。我能接受负面波动，从而在2年或2年以上的投资期内获得远高于活期账户、定期存款的收益</label></dd>
		                <dd><label><input type="radio" v-model="m6" value="6">D、高风险：我希望我的投资增长，并尽可能地获得最高回报，我可以接受短期负面波动，愿意承担全部收益包括本金可能损失的风险</label></dd>
                    </dl>
                    <div class="risk-btn risk-btn2" :class="{show:m6}" @click="next()">下一题</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subject">
                   <dl>
                        <dt>单选题</dt>
						<dt>7、如您有机会通过承担额外风险（包括本金可能受到损失）来明显增加潜在回报，那么您：</dt>
		                <dd><label><input type="radio" v-model="m7" value="1">A、不愿意承担任何额外风险</label></dd>
		                <dd><label><input type="radio" v-model="m7" value="2">B、愿意动用部分资金承担较小的额外风险</label></dd>
		                <dd><label><input type="radio" v-model="m7" value="5">C、愿意动用部分资金承担较大的额外风险</label></dd>
                    </dl>
                    <div class="risk-btn risk-btn2" :class="{show:m7}" @click="next()">下一题</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subject">
                   <dl>
                        <dt>单选题</dt>
						<dt>8、您本次准备投资的资金，占您的总资产（除自用和经营性财产外）？</dt>
		                <dd><label><input type="radio" v-model="m8" value="1">A、小于10％</label></dd>
		                <dd><label><input type="radio" v-model="m8" value="2">B、10％～30％</label></dd>
		                <dd><label><input type="radio" v-model="m8" value="5">C、30％～50％D、大于50％</label></dd>
                    </dl>
                    <div class="risk-btn risk-btn2" :class="{show:m8}" @click="next()">下一题</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subject">
                   <dl>
                        <dt>单选题</dt>
						<dt>9、您是否有过投资失败的经历，如有遭受的损失是多少？</dt>
		                <dd><label><input type="radio" v-model="m9" value="1">A、最大本金亏损5%以内</label></dd>
		                <dd><label><input type="radio" v-model="m9" value="2">B、能最大本金亏损5%-20%</label></dd>
		                <dd><label><input type="radio" v-model="m9" value="5">C、最大本金亏损20%-50%</label></dd>
		                <dd><label><input type="radio" v-model="m9" value="6">D、最大本金亏损50%以上</label></dd>
                    </dl>
                    <div class="risk-btn risk-btn2" :class="{show:m9}" @click="next()">下一题</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subject">
                   <dl>
                        <dt>单选题</dt>
						<dt>10、 对于投资资产价值的波动，您认为：</dt>
		                <dd><label><input type="radio" v-model="m10" value="1">A:关心资产保值多过增值</label></dd>
		                <dd><label><input type="radio" v-model="m10" value="2">B:能接受轻微波动</label></dd>
		                <dd><label><input type="radio" v-model="m10" value="5">C:担心但还能接受亏损</label></dd>
		                <dd><label><input type="radio" v-model="m10" value="6">D:再大波动都能接受</label></dd>
                    </dl>
                    <div class="risk-btn risk-btn2" :class="{show:m10}" @click="next(1)">查看结果</div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="subjectr">
                   <div class="risk-result">
                   	<dl id="riskResult">
                   		
                   	</dl>
                   </div>
                    <div class="risk-btn risk-btn2" :class="{show:m10}" @click="share()">分享好友测试</div>
                </div>
            </div>
        </div>
    </div>	
        <script type="text/tpl" id="result1">
        <dt>您的测试结果为<span>“保守型”</span>:</dt>
            <dd>此类投资人不愿意接受暂时的投资损失或是极小的资产波动，甚至对于投资产品的任何下跌都
                不愿意接受，他们更加关注本金的安全，往往属于风险厌恶型的投资者，首要投资目标是保持投资的稳定性与资产的保值，
                并在此基础上尽可能使资产一定程度的增值，不愿意承受或能承受少许本金的损失和波动。这类投资者需要注意为达到上
                述目标回报率可能很低，以换取本金免于受损和较高的流动性，最适合的理财方式就是储蓄。</dd>
    </script>
    <script type="text/tpl" id="result2">
        <dt>您的测试结果为<span>“稳健型”</span>:</dt>
            <dd>此类投资者风险偏好较低，但愿意用较小的风险来获得确定的收益。此类投资者愿意承受或能承受少许本金的损失和波动。比较适合低风险的理财产品，如P2P理财、国债、基金、债券等。</dd>
    </script>
    <script type="text/tpl" id="result3">
        <dt>您的测试结果为<span>“平衡型”</span>:</dt>
            <dd>此类投资人愿意承担一定程度的风险，强调投资风险和资产升值之间的平衡，主要投资目标是资产的升值，为实现目标往往愿意承担相当程度的风险，比较适合组合投资，以P2P理财、货币基金等为主的固定收益型产品和以外汇、黄金、大宗商品等的浮动收益型产品相组合。前者风险小，但收益率相对较低；后者风险大，但收益率要较前者高。两者互补，既可提高收益，又可降低风险。</dd>
    </script>
    <script type="text/tpl" id="result4">
        <dt>您的测试结果为<span>“积极型”</span>:</dt>
            <dd>此类投资人为了获得高回报的投资收益，能够承受投资产品价格的剧烈的波动，主要投资目标是实现资产升值、取得超额收益，为实现目标往往愿意承担相当程度的风险，此类投资者可以承受相当大的资产波动风险和本金亏损风险。可尝试股票+P2P理财+货币基金+信托组合。高风险和低风险两两对冲。此类投资者能够承担相当大的投资风险和本金亏损风险。不过建议此类投资人，不能一味追求高收益，要注意投资资金最好不要超过总资产的10%。</dd>
    </script>
    <script type="text/tpl" id="result5">
        <dt>您的测试结果为<span>“激进型”</span>:</dt>
            <dd>此类投资人能够承受投资产品价格的剧烈波动，也可以承担这种波动所带来的结果，投资目标主要是取得超额收益，为实现投资目标愿意冒更大的风险，此类投资者能够承担相当大的投资风险和更大的本金亏损风险。可适当提高高风险理财产品的投资比例。</dd>
    </script>   
  </div>
</template>
<script>
import loadScript from 'static/js/loadScript.js';
import 'static/js/swiper/dist/css/swiper.min.css';
let swiper;
let weixinShare = function (wx, data) {
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，企业号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: [
            'checkJsApi',
            'openLocation',
            'getLocation',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        wx.onMenuShareTimeline({//分享到朋友圈
            title: share.title, // 分享标题
            link: share.link, // 分享链接
            imgUrl: share.pic,
            desc: share.content
        });
        wx.onMenuShareAppMessage({//分享给朋友
            title: share.title, // 分享标题
            desc: share.content,
            link: share.link, // 分享链接
            imgUrl: share.pic // 分享图标
        });
    });
};
export default {
    data() {
        return {
            m1: '',
            m2: '',
            m3: '',
            m4: '',
            m5: '',
            m6: '',
            m7: '',
            m8: '',
            m9: '',
            m10: '',
            hideHeader: this.$store.state.isApp || this.$store.state.isWeiXin
        }
    },
    methods: {
        getId(el){
            return document.getElementById(el);
        },
        next: function (ok) {
            if (ok === 1) {
                var value = this.m1 + this.m2 + this.m3 + this.m4 + this.m5 + this.m6 + this.m7 + this.m8 + this.m9 + this.m10,
                    res;
                if (value < 14) {
                    res = this.getId('result1').innerHTML;
                } else if (value >= 14 && value < 28) {
                    res = this.getId('result2').innerHTML;
                } else if (value >= 28 && value < 46) {
                    res = this.getId('result3').innerHTML;
                } else if (value >= 46 && value < 60) {
                    res = this.getId('result4').innerHTML;
                } else if (value >= 60) {
                    res = this.getId('result5').innerHTML;
                }
                this.getId('riskResult').innerHTML = res;
            }
            swiper.slideNext();
        },
        share: function (share) {
            share = share || {
                title: '钱生花',
                content: '钱生花是花样年集团倾力打造的互联网金融P2P信贷平台，为有小额贷款,薪金贷,业主贷,生意贷,等需求的借款人和有理财需求的出借人提供高安全、高收益的互联网理财服务。',
                link: 'http://m.hehenian.com',
                picUrl: 'http://static.hehenian.com/p/images/app_qr.png'
            };
            if (this.isApp) {
                this.$utils.connectWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('setTopBarBtn', { label: '分享', click: 'setPosition', url: pageLink }, function (responseData) {
                    });
                    bridge.registerHandler('setPosition', function (data, responseCallback) {
                        bridge.callHandler('sharePrefectureInfo', {
                            title: share.title, // 分享标题
                            content: share.content,
                            link: pageLink, // 分享链接
                            picUrl: share.pic,
                        }, function (responseData) { });
                    });
                });
            } else if (this.isWeiXin) {
               this.$axios.get('/activity/getWeiXinInfo.do',{params:{url: encodeURIComponent(location.href)}})
                .then(data=>{
                    if (data.code === 0) {
                        data = data.data;
                        if (window.wx) {
                            weixinShare(window.wx, data);
                        } else {
                            loadScript('static/js/jweixin-1.2.0.js', function () {
                                weixinShare(window.wx, data);
                            });
                        }
                    }
                });
            }
        },
        initSwiperScript(){
            if(window.Swiper){
                this.initSwiper();
            }else{
                loadScript('static/js/swiper/dist/js/swiper.min.js', ()=>{
                    this.initSwiper();
                });
            }
        },
        initSwiper(){
           swiper = new Swiper('.risk-test', {
                    direction: 'vertical',
                    paginationClickable: true,
                    direction: 'vertical',
                    effect: 'coverflow',
                    threshold: 800
            });
        }
    },
    mounted(){
        this.share();
        this.initSwiperScript();
    }
}
</script>
<style>
        .risk-test{position: absolute;width: 100%;bottom: 0;background-color: #000;background-image: url(http://static.hehenian.com/m/v4/images/riskTest_bg.jpg?v=da6f8d3);-webkit-background-size: cover; background-size: cover;overflow: hidden;z-index: 9999;} 
        .swiper-wrapper{position: absolute;width: 100%;height: 100%;top: 0;left: 0;background: none !important;display: block;}
        .swiper-slide{position: relative;width: 100%;height: 100%;}
        .welcome{height: 100%;position: absolute;width: 100%}
        .welcome{background-image: url(http://static.hehenian.com/m/v4/images/risk_test_1.png?v=92f91ca);-webkit-background-size: 290px auto;
        background-size: 290px auto;background-position: 50% 30%;background-repeat: no-repeat;}
        .risk-btn{border: 1px solid #fff;height: 50px;line-height: 50px;position: absolute;bottom: 20px;right: 20px;left: 20px;color: #fff;font-size: 16px;text-align: center;border-radius: 10px;font-weight: bold;}
        .risk-test .subject{color: #fff;padding: 0 40px;position: absolute;width: 100%;height: 100%;display: -webkit-box;display: -webkit-flex;display: flex;-webkit-box-align: center;-webkit-align-items: center;align-items: center;-webkit-box-pack: center;-webkit-justify-content: center;justify-content: center;}
        .risk-test .subject dl{margin-top: -30%;}
        .risk-test .subject dt:nth-child(1){text-align: center;font-size: 18px;padding-bottom: 30px;}
        .risk-test .subject dt:nth-child(2){padding-bottom: 10px;font-size: 18px;text-indent: -1em;}
        .risk-test .subject input[type="radio"]{width: 18px;height: 18px;background-image: url(http://static.hehenian.com/m/v4/images/risk_radio.png?v=31b43f5);-webkit-background-size: 18px auto;background-size: 18px auto;position: relative;left: -10px;bottom: -4px;}
        .risk-test .subject input[type="radio"]:checked{background-position: 0 -18px;}
        .risk-test .subject dd{padding-left: 20px;text-indent: -18px;padding-bottom: 10px;}
        .risk-btn2{background-color: rgba(255,255,255,.1);opacity: 0;pointer-events: none;-webkit-transition: all .3s;transition: all .3s;}
		.risk-btn2.show{opacity: 1;pointer-events: auto;}
		.risk-result{background-color: rgba(255,255,255,.8);border-radius: 20px;padding: 20px;margin: 20px;color: #4E321A;font-size: 14px;position: relative;margin-top: -20%;}
		.risk-result dt{font-size: 18px;padding-bottom: 10px;}
		.risk-result dt span{color: #FFEA00;}
		.subjectr{color: #fff;position: absolute;width: 100%;height: 100%;display: -webkit-box;display: -webkit-flex;display: flex;-webkit-box-align: center;-webkit-align-items: center;align-items: center;-webkit-box-pack: center;-webkit-justify-content: center;justify-content: center;text-align: justify;}
		.isApp .risk-test,
		.isWeiXin .risk-test{top: 0 !important;}
		.fix-nav{opacity: 0;pointer-events: none;}
</style>

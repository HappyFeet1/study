<template>
    <div class="container">
        <div class="vip-article-body" :style="{'background-image':'url('+backgroundTop2+')','background-color':backgroundColor2}">
            <mt-header title="VIP活动">
                <a href="javascript:;" @click="$router.back()" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </a>
            </mt-header>
            <div class="vip-wrapper" id="article" :style="{'background-image':'url('+backgroundTop+')'}">
                <div class="vip-wrapper-in">
                    <div class="vip-article">
                        <div v-html="article.content"></div>
                    </div>
                    <div class="quik-link">
                        <h3>钱生花活动小喇叭</h3>
                        <ul>
                            <li v-html="prevUrl" @click="review">
                            </li>
                            <li v-html="nextUrl" @click="review">
                            </li>
                        </ul>
                    </div>
                    <div class="copyright">所有解释权归深圳市彩付宝科技有限公司所有</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import loadScript from 'static/js/loadScript.js';
import { mapState } from 'vuex';
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
}
export default {
    data() {
        return {
            id: '',
            loaded: false,
            article: {},
            prevUrl: '',
            nextUrl: '',
            backgroundTop: '',
            backgroundColor: '',
            backgroundTop2: '',
            backgroundColor2: '',
        }
    },
    computed: {
        ...mapState([
            'isWeiXin',
            'isApp'
        ])
    },
    methods: {
        review:function(){
            setTimeout(()=>{
                location.reload();
            },300)
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
                    bridge.callHandler('setTopBarBtn', { label: '分享', click: 'setPosition', url: location.href }, function (responseData) {
                    });
                    bridge.registerHandler('setPosition', function (data, responseCallback) {
                        bridge.callHandler('sharePrefectureInfo', {
                            title: share.title, // 分享标题
                            content: share.content,
                            link: location.href, // 分享链接
                            picUrl: share.pic,
                        }, function (responseData) { });
                    });
                });
            } else if (this.isWeiXin) {
                this.$axios.get('/activity/getWeiXinInfo.do',{params:{url: location.href}})
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
        }
    },
    created() {
        this.$axios.get('/api/articleDetail.do', { params:{id: this.$route.query.id, typeId:this.$route.query.typeId||18, url:encodeURIComponent('#/vip/activityDetail')} })
        .then(data=>{
                var format = function (str) {
                    str = decodeURIComponent(str || '');
                    return str;
                }
                this.article = data.articleDo;
                this.prevUrl = '·'+(format(data.prevUrl) || '前面没有文章了');
                this.nextUrl = '·'+(format(data.nextUrl) || '后面没有文章了');

                var coverImage;
                try {
                    coverImage = data.articleDo.coverImage.split('|')[0].split(',');
                } catch (e) {
                    coverImage = new Array(4);
                }
                this.backgroundTop = coverImage[1];
                this.backgroundColor = '#fff';
                this.backgroundTop2  = coverImage[2];
                this.backgroundColor2  = coverImage[3];

                var innerWidth = window.innerWidth;
                setTimeout(()=>{
                    // $('.vip-article').find('img').css({ width: '100%', height: 'auto' });
                    document.querySelectorAll('#article img').forEach((el)=>{
                        el.style.width='100%';
                        el.style.height='auto';
                    })
                    // setInterval(function(){
                    this.share({
                        title: data.articleDo.title,
                        link: data.articleDo.url,
                        pic: coverImage[0],
                        content: data.articleDo.summary
                    });
                    // },2000)
                }, 100)
        });
    }
}
</script>

<style>
.vip-wrapper {
    padding-top: 38%;
    /* background-image: url('http://static.hehenian.com/m/v4/images/vip/vip_top_bg.jpg?v=c276b13'); */
    -webkit-background-size: 100% auto;
    background-size: 100% auto;
    background-position: 50% 0;
    background-repeat: no-repeat;
    padding-bottom: 20px;
}
html {
    position: relative;
    min-height: 100%;
}
.vip-article-body {
    /* background-image: url('http://static.hehenian.com/m/v4/images/vip/vip_bottom_bg.jpg?v=e531462'); */
    -webkit-background-size: 100% auto;
    background-size: 100% auto;
    background-position: 50% 100%;
    background-repeat: no-repeat;
    background-color: #F7F0EA;
    min-height: 100%;
}
.vip-article {
    background: #fff;
    margin: 0 10px;
    box-shadow: 3px 4px 5px rgba(85, 56, 17, .19);
    min-height: 200px;
    padding: 10px;
}
.copyright {
    font-size: 12px;
    text-align: center;
    color: #999;
    padding-top: 20px;
}
.quik-link h3 {
    height: 20px;
    margin: 30px 20px 0;
    background-image: url('http://static.hehenian.com/m/v4/images/vip/vip_foot_icon.png?v=6f8e857');
    -webkit-background-size: 21px auto;
    background-size: 21px auto;
    background-repeat: no-repeat;
    background-position: 0 50%;
    font-size: 14px;
    color: #5C3C12;
    padding-left: 30px;
}
.quik-link li {
    margin: 10px 20px 0 45px;
    height: 1.5em;
    line-height: 1.5em;
    overflow: hidden;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
}
.quik-link li a {
    color: #111
}
</style>

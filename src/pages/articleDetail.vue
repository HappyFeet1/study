<template>
    <div class="container">
        <mt-header :title="article.articleType.name">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="article-pannel">
            <p class="art_title">{{article.title}}</p>
            <div v-html="article.content" id="article"></div>
        </div>
    </div>
</template>
<script>
import loadScript from 'static/js/loadScript.js';
import { mapState } from 'vuex';
const pageLink = encodeURIComponent(location.href);
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
let getText=function(elem){
    if (3 == elem.firstChild.nodeType) return elem.firstChild.nodeValue;
    var els = elem.getElementsByTagName('*'),
        i = 0,
        len = els.length,
        text = '';
    for (; i < len; i++) {
        if (els[i].firstChild&&3 == els[i].firstChild.nodeType) {
            text += els[i].firstChild.nodeValue;
        }
    }
    return text;
};
export default {
    data() {
        return {
            article:{
                articleType:{}
            }
        }
    },
    methods: {
        asyncData() {
            this.$axios.get('/api/articleDetail.do', { params: { id: this.$route.query.id} })
            .then(data => {
                this.article = data.articleDo;
                    setTimeout(()=> {
                        this.share({
                            title: data.articleDo.title,
                            link: data.articleDo.url,
                            pic: data.articleDo.coverImage,
                            content: getText(document.getElementById('article')).substring(0,100)
                        });

                        this.$utils.each(document.getElementById('article').getElementsByTagName('img'), function(el){
                            el.style.width='100%';
                            el.style.height='auto';
                        })
                    },1000);
            });
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
        }
    },
    beforeMount() {
        this.asyncData();
    }
}
</script>

<style>
.article-pannel{padding:15px;color:#767070;padding-top:10px;background: #fff;}
.art_title{color:#444444;font-size:16px;font-weight:bold;width:60%;margin:0 auto;padding-bottom:10px;text-align:center;}
.article-pannel img{display:block;width:100%;margin:5px 0px;}
</style>

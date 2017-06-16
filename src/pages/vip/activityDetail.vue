<template>
    <div class="container">
        <mt-header title="VIP活动">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="vip-wrapper" :style="{'background-image':'url('+backgroundTop+')'}">
            <div class="vip-wrapper-in">
                <div class="vip-article">
                    <div v-html="article.content"></div>
                </div>
                <div class="quik-link">
                    <h3>钱生花活动小喇叭</h3>
                    <ul>
                        <li>·
                            <div v-html="prevUrl"></div>
                        </li>
                        <li>·
                            <div v-html="nextUrl"></div>
                        </li>
                    </ul>
                </div>
                <div class="copyright">所有解释权归深圳市彩付宝科技有限公司所有</div>
            </div>
        </div>
    </div>
</template>
<script>
import loadScript from 'static/js/loadScript.js';
export default {
    data() {
        return {
            id: '',
            loaded: false,
            article: {},
            prevUrl: '',
            nextUrl: '',
            backgroundTop: '',
            backgroundColor: ''
        }
    },
    methods: {

    },
    beforeMount() {

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
}
html {
    position: relative;
    min-height: 100%;
}
body {
    padding-bottom: 10%;
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

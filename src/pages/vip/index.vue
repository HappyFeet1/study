<template>
    <div class="container">
        <mt-header title="VIP会员体系">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="vip-banner">
            <div class="vip-avator">
                <img :src="data.avatar || 'http://static.hehenian.com/m/v2/images/avator.png?v=a955da7'">
                <i :class="'i-'+data.vipCode"></i>
            </div>
            <h3 class="vip-user">
                Hi，{{data.userName||'钱生花'}}
            </h3>
            <p class="text">
                在投产品金额：
                <span>{{(data.amount||0) | formatNumber}}</span> 元
                <br>
            </p>
            <a href="http://m.hehenian.com/product/plist.do?channel=0&subChannel=0" class="up-btn">{{data.vipCode
                <4? '马上去升级': '继续投资'}}</a>
                    <ul class="vip-level" :class="'vip-level-'+data.vipCode">
                        <li>
                            <div class="icon icon-1">
                                <i></i>
                            </div>
                            <h3>白银会员</h3>
                            <p>在投金额:
                                <br>≥ 500,000</p>
                        </li>
                        <li>
                            <div class="icon icon-2">
                                <i></i>
                            </div>
                            <h3>黄金会员</h3>
                            <p>在投金额:
                                <br>≥ 1,000,000</p>
                        </li>
                        <li>
                            <div class="icon icon-3">
                                <i></i>
                            </div>
                            <h3>铂金会员</h3>
                            <p>在投金额:
                                <br>≥ 5,000,000</p>
                        </li>
                        <li>
                            <div class="icon icon-4">
                                <i></i>
                            </div>
                            <h3>钻石会员</h3>
                            <p>在投金额:
                                <br>≥ 10,000,000</p>
                        </li>
                    </ul>
        </div>
        <div class="user-rights">
            <h3>{{data.vipCode?(vipName[data.vipCode-1]+'特权'):'非VIP会员'}}
                <router-link v-show="$store.state.isWeiXin" class="icon" to="/vip/issue"></router-link>
            </h3>
            <ul>
                <li :class="{light:data.vipCode>0}">
                    <router-link to="/vip/welcome">
                        <p>
                            <img src="http://static.hehenian.com/m/v4/images/vip/right_1.jpg?v=e57b912" alt="" width="60" height="60">
                        </p>
                        <h4>会员欢迎大礼包</h4>
                    </router-link>
                </li>
                <li :class="{light:data.vipCode>0}">
                    <router-link to="/vip/birthday">
                        <p>
                            <img src="http://static.hehenian.com/m/v4/images/vip/right_2.jpg?v=029a589" alt="" width="60" height="60">
                        </p>
                        <h4>生日礼包</h4>
                    </router-link>
                </li>
                <li :class="{light:data.vipCode>1}">
                    <router-link to="/vip/surprise">
                        <p>
                            <img src="http://static.hehenian.com/m/v4/images/vip/right_3.jpg?v=7905542" alt="" width="60" height="60">
                        </p>
                        <h4>投资惊喜大礼包</h4>
                    </router-link>
                </li>
            </ul>
            <ul>
                <li :class="{light:data.vipCode>2}">
                    <router-link to="/vip/service">
                        <p>
                            <img src="http://static.hehenian.com/m/v4/images/vip/right_4.jpg?v=fed5810" alt="" width="60" height="60">
                        </p>
                        <h4>专属客服服务</h4>
                    </router-link>
                </li>
                <li :class="{light:data.vipCode>2}">
                    <router-link to="/vip/club">
                        <p>
                            <img src="http://static.hehenian.com/m/v4/images/vip/right_5.jpg?v=4a9072e" alt="" width="60" height="60">
                        </p>
                        <h4>VIP俱乐部活动</h4>
                    </router-link>
                </li>
                <li :class="{light:data.vipCode>3}">
                    <router-link to="/vip/law">
                        <p>
                            <img src="http://static.hehenian.com/m/v4/images/vip/right_6.jpg?v=99fdb79" alt="" width="60" height="60">
                        </p>
                        <h4>法律咨询服务</h4>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: {}
        }
    },
    methods: {
        syncData: function () {
            this.$axios.get('/api/vip.do')
                .then(({ data }) => {
                    if (data.code === 0) {
                        this.data = data.data;
                    } else {
                        this.$toast('服务器出差了，刷新重新试~')
                    }
                })
        }
    },
    beforeMount() {
        this.syncData();
    }
}
</script>
<style>
.vip-banner {
    height: 356px;
    background-image: url(http://static.hehenian.com/m/v4/images/vip/banner_bg.png);
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    padding-top: 30px;
    position: relative;
}
.vip-avator {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: 3px solid #fff;
    background: #fff;
    margin: 0 auto;
    position: relative;
}
.vip-avator img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.vip-avator i {
    display: inline-block;
    width: 17px;
    height: 17px;
    position: absolute;
    right: -4px;
    bottom: -4px;
    background-image: url(http://static.hehenian.com/m/v4/images/vip/icon_level.png);
    -webkit-background-size: 70px auto;
    background-size: 70px auto;
}
.vip-avator .i-0 {
    display: none;
}
.vip-avator .i-1 {
    background-position: 0 0;
}
.vip-avator .i-2 {
    background-position: -18px 0;
}
.vip-avator .i-3 {
    background-position: -36px 0;
}
.vip-avator .i-4 {
    background-position: -54px 0;
}
.vip-user {
    font-size: 16px;
    text-align: center;
    color: #fff;
    padding-top: 20px;
    font-weight: 400;
}
.vip-banner .text {
    text-align: center;
    color: #714A09;
    font-size: 14px;
    padding-top: 8px;
}
.vip-banner .text span {
    color: #fff;
}
.vip-banner .up-btn {
    display: block;
    width: 172px;
    height: 38px;
    line-height: 36px;
    text-align: center;
    border-radius: 5px;
    background-color: #fff;
    font-size: 14px;
    color: #F96820;
    background-image: -webkit-linear-gradient(bottom, #f8d893, #fffbf4);
    border: 1px solid #BD8E30;
    margin: 14px auto 0;
}
.vip-banner .up-btn:hover {
    background-image: -webkit-linear-gradient(bottom, #FCD176, #fffbf4);
}
.vip-level {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
}
.vip-level li {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
    padding-top: 15px;
    position: relative;
    height: 126px;
}
.vip-level li:before {
    content: '';
    display: block;
    height: 2px;
    background: #fff;
    width: 100%;
    position: absolute;
    left: -50%;
    top: 35px;
    z-index: 1;
}
.vip-banner li:after {
    content: '';
    position: absolute;
    border-color: transparent transparent #fff transparent;
    border-style: dashed dashed solid dashed;
    bottom: 0;
    border-width: 8px;
    margin-left: -8px;
    left: 50%;
    display: none;
}
.vip-level-1 li:nth-child(1):after,
.vip-level-2 li:nth-child(2):after,
.vip-level-3 li:nth-child(3):after,
.vip-level-4 li:nth-child(4):after {
    display: block;
}
.vip-level li:first-child:before {
    display: none;
}
.vip-level .icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #fff;
    background: none;
    padding-top: 3px;
    background-color: #D19A36;
    position: relative;
    z-index: 2;
    -webkit-background-size: cover;
    background-size: cover;
}
.vip-level i {
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 18px;
    background-image: url(http://static.hehenian.com/m/v4/images/vip/icon_level2.png);
    -webkit-background-size: 32px auto;
    background-size: 32px auto;
    margin: 0 auto;
}
.vip-level .icon-1 i {
    background-position: 0 0;
}
.vip-level .icon-2 i {
    background-position: 0 -32px;
}
.vip-level .icon-3 i {
    background-position: 0 -64px;
}
.vip-level .icon-4 i {
    background-position: 0 -96px;
}
.vip-level-1 .icon-1,
.vip-level-2 .icon-2,
.vip-level-3 .icon-3,
.vip-level-4 .icon-4 {
    background-image: url(http://static.hehenian.com/m/v4/images/vip/level_icon_bg.png);
}
.vip-level-2 li:nth-child(2):before,
.vip-level-3 li:nth-child(2):before,
.vip-level-3 li:nth-child(3):before,
.vip-level-4 li:nth-child(2):before,
.vip-level-4 li:nth-child(3):before,
.vip-level-4 li:nth-child(4):before {
    background: #FFCA56;
}
.vip-level-2 .icon-1,
.vip-level-3 .icon-1,
.vip-level-3 .icon-2,
.vip-level-4 .icon-1,
.vip-level-4 .icon-2,
.vip-level-4 .icon-3 {
    border: 1px solid #FFCA56;
}
.vip-level h3 {
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    padding-top: 5px;
}
.vip-level p {
    font-size: 12px;
    text-align: center;
    color: #FFE171;
    -webkit-transform: scale(.9);
    transform: scale(.9);
}
.user-rights {
    padding-bottom: 20px;
    background: #fff;
}
.user-rights h3 {
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
    position: relative;
}
.user-rights h3 a.icon {
    display: block;
    position: absolute;
    right: 16px;
    top: 16px;
    width: 25px;
    height: 25px;
    background-position: -25px -250px;
}
.user-rights ul {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.user-rights li {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
    padding-bottom: 20px;
}
.user-rights li>a {
    display: block;
}
.user-rights p {
    display: inline-block;
    width: 60px;
    height: 60px;
    background: #222;
    border-radius: 50%;
}
.user-rights p img {
    opacity: 0.2;
}
.user-rights .light img {
    opacity: 1;
}
.user-rights li h4 {
    font-size: 14px;
    font-weight: 400;
    padding-top: 10px;
}
</style>

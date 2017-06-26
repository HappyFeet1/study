<template>
<div class="container">
    <mt-header title="会员体系介绍">
        <a href="javascript:;" @click="$router.back()" slot="left">
            <mt-button icon="back">返回</mt-button>
        </a>
    </mt-header>    
    <div class="vip-article">
        <article>
            <h2>什么是钱生花VIP会员体系</h2>
            <p class="t2em pb10">钱生花会员体系是为了更好地服务、回馈钱生花用户而建立的。根据用户升级后单笔投资金额（不包括收益部分）将钱生花用户分为4个会员等级。分别为白银、黄金、铂金、钻石4个等级的会员，不同用户尊享不同的特权。</p>
            <h2>如何成为钱生花VIP会员？</h2>
            <p class="pb10">1、VIP资格获取：普通用户满足单笔投资金额500，000元及以上的条件，投资次日即可获得白银VIP会员。VIP会员有效期内任一投资有效订单（有效订单即会员期内投资本金大于10万的未赎回订单），则VIP会员起始日期将自动默认为最新投资订单次日至产品赎回之日。</p>
            <p class="pb10">2、VIP升级条件：VIP会员在有效期内增加续投订单，我们将根据会员期间累计订单投资总额，升级VIP等级。所有会员期内续投订单的VIP会员，在有效期内专享升级服务；会员升级条件如下所示：</p>
            <p style="padding-bottom:.5em"><strong>白银会员期内：</strong><br><span class="cGray">累计投资1,000,000及以上，将升级为黄金会员</span></p>
            <p style="padding-bottom:.5em"><strong>黄金会员期内：</strong><br><span class="cGray">累计投资5,000,000及以上，将升级为铂金会员</span></p>
            <p style="padding-bottom:.5em"><strong>铂金会员期内：</strong><br><span class="cGray">累计投资10,000,000及以上，将升级为钻石会员</span></p>
            <p class="pb10"><strong>钻石会员期内：</strong><br><span class="cGray">累计投资≥10,000,000，将根据有效期内投资期限最长的订单延续钻石会员</span></p>
            <h2>钱生花VIP会员拥有什么特权？</h2>
            <p class="t2em pb10">钱生花VIP会员特权给您顶级尊贵体验，为您全方面量身定做专属特权，VIP会员特权包括会员欢迎礼，到期提醒服务，投资惊喜大礼包，专属客服服务，VIP俱乐部活动，法律咨询服务等，不同等级VIP会员，特权分配不一样。</p>
        </article>
    </div>
</div>
</template>
<style>
.vip-article article { padding: 15px; font-size: 14px; background: #fff;}
.vip-article h2 { color: #111; font-weight: 600; padding-bottom: 15px; position: relative; }
.vip-article h2:before { content: ''; display: inline-block; position: relative; width: 8px; height: 8px; border-radius: 4px; overflow: hidden; background-image: -webkit-linear-gradient(top, #F6C75F, #DA990A); margin-right: 5px; top: -1px; }
.vip-article .t2em { text-indent: 2em; }
.vip-article .cGold { padding: 15px 0; }
.vip-article p { text-align: justify; }
.vip-article .pb10 { padding-bottom: 15px; }
.vip-article .tip { color: #E54C08; padding-bottom: 20px; }
.vip-article footer { background: #F2F2F2; padding: 20px 15px; color: #7e7e7e; }
.vip-article footer h3 { text-indent: -9999px; height: 16px; background-image: url(http://static.hehenina.com/m/v4/images/vip/article_ft.png); background-repeat: no-repeat; -webkit-background-size: contain; background-size: contain; background-position: 50% 50%; }
.vip-article footer p { text-indent: 2em; padding-top: 10px; font-size: 12px; }
</style>

<template>
    <div class="container">
        <mt-header title="专属客服服务">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="vip-article">
            <ul class="vip-title-bar">
                <li>特权名称</li>
                <li>专属客服服务</li>
            </ul>
            <article>
                <h2>特权说明</h2>
                <p class="t2em">桃花潭水深千尺，不及会员信我情。</p>
                <p class="t2em pb10">针对铂金及以上VIP会员钱生花推出的专享服务通道，专属客户经理根据会员需求，提供最新特惠活动预告、投资产品到期提醒、新理财产品上线通知、钱生花理财相关事项咨询服务及每周专门定制有营养的理财资讯，全力帮助钱生花VIP铂金会员解读投资环境和风向。</p>
                <h2>权利说明</h2>
                <p class="pb10">1、此VIP待遇适用于铂金及以上等级的所有会员;</p>
                <p class="tip">重要提示：钱生花保留调整权益内容和方式的权利</p>
            </article>
            <footer>
                <h3>免责声明</h3>
                <p>钱生花VIP会员体系根据市场变化，会员需求等因素，不定期对本页面权益进行调整，并于钱生花网站或其他相关渠道公告后生效。</p>
                <p>本页面内容仅供参考，并非所有的VIP会员都可以获得所有权益，您是否符合条件享受权益，以钱生花对该服务的具体规定为准。钱生花享有权益条款的最终解释权。</p>
            </footer>
        </div>
    </div>
</template>
<style>
@import './style.css';
</style>
<template>
    <div class="container">
        <mt-header title="VIP俱乐部活动">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
    
        <router-link to="/vip/activity">
            <img src="http://static.hehenian.com/m/v4/images/vip/banner_club.jpg?v=c2899d4" width="100%">
        </router-link>
        <div class="vip-article">
            <ul class="vip-title-bar">
                <li>特权名称</li>
                <li>VIP俱乐部活动</li>
            </ul>
            <article>
                <h2>特权说明</h2>
                <p class="t2em">做自己梦想中的主人，不做别人奇迹的听众。</p>
                <p class="t2em pb10">我们奔放洋气有深度，我们简约时尚国际范。精彩缤纷的VIP俱乐部，不仅邀您与高端会员畅谈生财之道、生活智慧，更有一大波狂欢派对带着你和家人感受尊贵非凡的体验。</p>
                <h2>权利说明</h2>
                <p class="pb10">1、适用于铂金及以上等级所有会员；</p>
                <p class="pb10">2、具体活动将在官网及APP更新公布，届时可前往报名参加。</p>
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
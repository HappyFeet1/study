import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/main';

Vue.use(Router);


let router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Home,
      children: [
        { path: '', component: resolve => require(['@/pages/index'], resolve) },
        { path: '/project', name: 'project', component: resolve => require(['@/pages/project/index'], resolve) },
        { path: '/mine', name: 'mine', component: resolve => require(['@/pages/mine'], resolve) },
      ]
    },

    { path: '/project/info', component: resolve => require(['@/pages/project/info'], resolve) },
    { path: '/project/detail', component: resolve => require(['@/pages/project/detail'], resolve) },
    { path: '/project/more', component: resolve => require(['@/pages/project/more'], resolve) },

    { path: '/login', component: resolve => require(['@/pages/login'], resolve) },
    { path: '/message', component: resolve => require(['@/pages/message'], resolve) },
    { path: '/setting', component: resolve => require(['@/pages/setting'], resolve) },
    { path: '/plat', component: resolve => require(['@/pages/plat'], resolve) },
    { path: '/riskTest', component: resolve => require(['@/pages/riskTest'], resolve) },
    { path: '/balance', component: resolve => require(['@/pages/balance'], resolve) },

    { path: '/debtList', component: resolve => require(['@/pages/debtList'], resolve) },
    { path: '/debtList/debtDetail', component: resolve => require(['@/pages/debtDetail'], resolve) },
    { path: '/debtList/borrowInfo', component: resolve => require(['@/pages/debtBorrowInfo'], resolve) },
    { path: '/debtList/verifyInfo', component: resolve => require(['@/pages/debtVerifyInfo'], resolve) },
    { path: '/debtList/bidInfo', component: resolve => require(['@/pages/debtDidInfo'], resolve) },
    { path: '/debtList/repaymentInfo', component: resolve => require(['@/pages/debtRepaymentInfo'], resolve) },
    { path: '/debtList/debtHelp', component: resolve => require(['@/pages/debtHelp'], resolve) },
    { path: '/debtList/debtBuy', component: resolve => require(['@/pages/debtBuy'], resolve) },

    { path: '/overview', component: resolve => require(['@/pages/overview'], resolve) },

    { path: '/vip', component: resolve => require(['@/pages/vip/index'], resolve) },
    { path: '/vip/welcome', component: resolve => require.ensure([], () => resolve(require('@/pages/vip/welcome')), 'group-vip') },
    { path: '/vip/birthday', component: resolve => require.ensure([], () => resolve(require('@/pages/vip/birthday')), 'group-vip') },
    { path: '/vip/surprise', component: resolve => require.ensure([], () => resolve(require('@/pages/vip/surprise')), 'group-vip') },
    { path: '/vip/service', component: resolve => require.ensure([], () => resolve(require('@/pages/vip/service')), 'group-vip') },
    { path: '/vip/club', component: resolve => require.ensure([], () => resolve(require('@/pages/vip/club')), 'group-vip') },
    { path: '/vip/law', component: resolve => require.ensure([], () => resolve(require('@/pages/vip/law')), 'group-vip') },

    { path: '/vip/activity',component: resolve => require(['@/pages/vip/activity'], resolve) },
    { path: '/vip/activityDetail',component: resolve => require(['@/pages/vip/activityDetail'], resolve) },
    { path: '/vip/issue',component: resolve => require(['@/pages/vip/issue'], resolve) },

    { path: '/articleList',component: resolve => require(['@/pages/articleList'], resolve) },
    { path: '/articleDetail',component: resolve => require(['@/pages/articleDetail'], resolve) },
    

    { path: '/help',component: resolve => require(['@/pages/help/'], resolve) },
    { path: '/help/3safe',component: resolve => require(['@/pages/help/3safe'], resolve) },
    { path: '/help/debtSafe',component: resolve => require(['@/pages/help/debtSafe'], resolve) },
    { path: '/help/about',component: resolve => require(['@/pages/help/about'], resolve) },
    { path: '/help/feedback',component: resolve => require(['@/pages/help/feedback'], resolve) },
    { path: '/help/center',component: resolve => require(['@/pages/help/center'], resolve) },
    { path: '/help/center-beginner',component: resolve => require(['@/pages/help/center-beginner'], resolve) },
    { path: '/help/center-account',component: resolve => require(['@/pages/help/center-account'], resolve) },
    { path: '/help/center-financing',component: resolve => require(['@/pages/help/center-financing'], resolve) },
    { path: '/help/center-increase',component: resolve => require(['@/pages/help/center-increase'], resolve) },
    { path: '/help/center-security',component: resolve => require(['@/pages/help/center-security'], resolve) },
    { path: '/help/center-others',component: resolve => require(['@/pages/help/center-others'], resolve) },
    
    { path: '/invest/detail',component: resolve => require(['@/pages/invest/detail'], resolve) },
    { path: '/invest/fundFlow',component: resolve => require(['@/pages/invest/fundFlow'], resolve) },
    
    //hack avalon router
    { path: '*', beforeEnter:()=>{
      if(window.location.hash.indexOf('#/!')>-1){
        router.push({
          path: window.location.hash.replace('#/!','')
        });
      }else{
        router.push({
          path: '/404'
        });
      }
    }}

  ]
});


export default router;

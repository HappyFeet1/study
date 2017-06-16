import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/main';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Home,
      children: [
        { path: '', component: resolve => require(['@/pages/index'], resolve) },
        { path: '/project', name: 'project', component: resolve => require(['@/pages/project'], resolve) },
        { path: '/mine', name: 'mine', component: resolve => require(['@/pages/mine'], resolve) },
      ]
    },
    { path: '/login', component: resolve => require(['@/pages/login'], resolve) },
    { path: '/message', component: resolve => require(['@/pages/message'], resolve) },
    { path: '/setting', component: resolve => require(['@/pages/setting'], resolve) },
    { path: '/plat', component: resolve => require(['@/pages/plat'], resolve) },

    { path: '/debtList', component: resolve => require(['@/pages/debtList'], resolve) },
    { path: '/debtList/debtDetail', component: resolve => require(['@/pages/debtDetail'], resolve) },
    { path: '/debtList/borrowInfo', component: resolve => require(['@/pages/debtBorrowInfo'], resolve) },
    { path: '/debtList/verifyInfo', component: resolve => require(['@/pages/debtVerifyInfo'], resolve) },
    { path: '/debtList/bidInfo', component: resolve => require(['@/pages/debtDidInfo'], resolve) },
    { path: '/debtList/repaymentInfo', component: resolve => require(['@/pages/debtRepaymentInfo'], resolve) },
    { path: '/debtList/debtHelp', component: resolve => require(['@/pages/debtHelp'], resolve) },

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


  ]
});
export default router;

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
      children:[
        {path:'',component: resolve => require(['@/pages/index'],resolve)},
        {path:'/project', name:'project', component: resolve => require(['@/pages/project'],resolve)},
        {path:'/mine', name:'mine', component: resolve => require(['@/pages/mine'],resolve)},
      ]
    },
    {path:'/login', name:'login', component: resolve => require(['@/pages/login'],resolve)},
    {path:'/message', name:'message', component: resolve => require(['@/pages/message'],resolve)},
    {path:'/setting', name:'setting', component: resolve => require(['@/pages/setting'],resolve)},
    {path:'/plat', name:'plat', component: resolve => require(['@/pages/plat'],resolve)},
    {path:'/debtList', name:'debtList', component: resolve => require(['@/pages/debtList'],resolve)},
    {path:'/debtList/debtDetail', name:'debtDetail', component: resolve => require(['@/pages/debtDetail'],resolve)},
    {path:'/debtList/borrowInfo', name:'borrowInfo', component: resolve => require(['@/pages/debtBorrowInfo'],resolve)},
    {path:'/debtList/verifyInfo', name:'verifyInfo', component: resolve => require(['@/pages/debtVerifyInfo'],resolve)},
    {path:'/debtList/bidInfo', name:'bidInfo', component: resolve => require(['@/pages/debtDidInfo'],resolve)},
    {path:'/debtList/repaymentInfo', name:'repaymentInfo', component: resolve => require(['@/pages/debtRepaymentInfo'],resolve)},
    {path:'/debtList/debtHelp', name:'debtHelp', component: resolve => require(['@/pages/debtHelp'],resolve)},
  ]
});
export default router;

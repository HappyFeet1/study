import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'route-active',
  routes: [
    { path: '/', name: 'Hello', component: Hello },
    { path: '/button', component: resolve => require(['@/components/demo/Button'], resolve)},
    { path: '/toast', component: resolve => require(['@/components/demo/Toast'], resolve)},
    { path: '/modal', component: resolve => require(['@/components/demo/Modal'], resolve)},
    { path: '/actionsheet', component: resolve => require(['@/components/demo/ActionSheet'], resolve)},
    { path: '/badge', component: resolve => require(['@/components/demo/Badge'], resolve)},
    { path: '/cell-swipe', component: resolve => require(['@/components/demo/CellSwipe'], resolve)},
    { path: '/checklist', component: resolve => require(['@/components/demo/CheckList'], resolve)},
    { path: '/picker', component: resolve => require(['@/components/demo/Picker'], resolve)},
    { path: '/datetime-picker', component: resolve => require(['@/components/demo/DateTime-Picker'], resolve)},
    { path: '/field', component: resolve => require(['@/components/demo/Field'], resolve)},
    { path: '/index-list', component: resolve => require(['@/components/demo/IndexList'], resolve)},
    { path: '/indicator', component: resolve => require(['@/components/demo/Indicator'], resolve)},
    { path: '/infinite-scroll', component: resolve => require(['@/components/demo/InfiniteScroll'], resolve)},
    { path: '/lazy-load', component: resolve => require(['@/components/demo/LazyLoad'], resolve)},
    { path: '/loadmore', component: resolve => require(['@/components/demo/Loadmore'], resolve)},
    { path: '/navbar', component: resolve => require(['@/components/demo/Navbar'], resolve)},
    { path: '/progress', component: resolve => require(['@/components/demo/Progress'], resolve)},
    { path: '/radio', component: resolve => require(['@/components/demo/Radio'], resolve)},
    { path: '/range', component: resolve => require(['@/components/demo/Range'], resolve)},
    { path: '/search', component: resolve => require(['@/components/demo/Search'], resolve)},
    { path: '/swipe', component: resolve => require(['@/components/demo/Swipe'], resolve)},
    { path: '/switch', component: resolve => require(['@/components/demo/Switch'], resolve)},
    { path: '/tabbar', component: resolve => require(['@/components/demo/Tabbar'], resolve)},
  ],
})

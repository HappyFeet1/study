import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';

Vue.use(Router);


const Default = { template: '<div class="default">default</div>' }
const Foo = { template: '<div class="foo">foo</div>' }
const Bar = { template: '<div class="bar">bar</div>' }

export default new Router({
  linkActiveClass: 'route-active',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    { path: '/default', component: Default },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/button', component: resolve => require(['@/components/demo/Button'], resolve)},
    { path: '/toast', component: resolve => require(['@/components/demo/Toast'], resolve)},
    { path: '/modal', component: resolve => require(['@/components/demo/modal'], resolve)},
  ],
  
})

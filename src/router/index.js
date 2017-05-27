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
        {path:'/product', name:'product', component: resolve => require(['@/pages/product'],resolve)},
        {path:'/mine', name:'mine', component: resolve => require(['@/pages/mine'],resolve)},
      ]
    }
  ]
});
export default router;

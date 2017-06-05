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
  ]
});
export default router;

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';

import store from './store/';
import '../static/main.css';

// axios.defaults.baseURL = 'http://m.hehenian.com';
Vue.config.productionTip = false;
Vue.$axios = Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  //定义一个可以记录路由路径变化的数据，这里用在vuex，其实也可以用sessionStorage,或者在window.routeChain等变量
  //不一定要用到vuex
  let routeLength = store.state.routeChain.length;
  if (routeLength === 0) {
    store.commit('setPageDirection', 'fade');
    if (to.path === from.path && to.path === '/') {
      //当直接打开根路由的时候
      store.commit('addRouteChain', to);
    } else {
      //直接分根路由的时候其实生成了两个路径，from其实就是根路由
      store.commit('addRouteChain', from);
      store.commit('addRouteChain', to);
    }
  } else if (routeLength === 1) {
    store.commit('setPageDirection', 'slide-left');
    store.commit('addRouteChain', to);
  } else {
    let lastBeforeRoute = store.state.routeChain[routeLength - 2];
    if (lastBeforeRoute.path === to.path) {
      store.commit('popRouteChain');
      store.commit('setPageDirection', 'slide-right');
    } else {
      store.commit('addRouteChain', to);
      store.commit('setPageDirection', 'slide-left');
    }
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

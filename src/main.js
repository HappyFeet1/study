// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue       from 'vue';
import App       from './App';
import router    from './router';
import axios     from 'axios';

import store     from './store/';
import utils     from '../static/js/utils';

import modal     from '@/components/modal/';
import toast     from 'mint-ui/lib/toast/';
import indicator from 'mint-ui/lib/indicator/';

import '../static/main.css';
import 'mint-ui/lib/toast/style.css';
import 'mint-ui/lib/indicator/style.css';

axios.defaults.baseURL = (process.env.NODE_ENV === 'development') ? '' : 'http://m.hehenian.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

let serializer = (obj = {}) => {
  var param = [];
  for (let key in obj) {
    param.push(key + '=' + obj[key]);
  }
  return param.join('&');
}
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  config.data = serializer(config.data);
  return config;
}, function (error) {
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.status === 200) {
    return response.data;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


Vue.$axios     = Vue.prototype.$axios     = axios;
Vue.$modal     = Vue.prototype.$modal     = modal;
Vue.$toast     = Vue.prototype.$toast     = toast;
Vue.$indicator = Vue.prototype.$indicator = indicator;
Vue.$utils     = Vue.prototype.$utils     = utils;

Vue.config.productionTip = false;
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = true

router.beforeEach((to, from, next) => {
  //定义一个可以记录路由路径变化的数据，这里用在vuex，其实也可以用sessionStorage,或者在window.routeChain等变量
  //不一定要用到vuex
  let routeLength = store.state.routeChain.length;
  if (routeLength === 0 || store.state.addCount == 0) {
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

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { sync } from 'vuex-router-sync';
import router from './router';

import store from './store/';

import MtButton from '@/ui/button/';
import MtPopup from '@/ui/popup/';
import Toast from '@/ui/toast/';
import iModal from '@/ui/modal/';
import Cell from '@/ui/cell/';
import Header from '@/ui/header/';

import '../static/style.css';

Vue.component(MtButton.name, MtButton);
Vue.component(MtPopup.name, MtPopup);
Vue.component(Cell.name, Cell);
Vue.component(Header.name, Header);


Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$modal = Vue.prototype.$modal = iModal;


sync(store, router);//把路由状态放到store中
Vue.config.productionTip = false;

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
        let lastBeforeRoute = store.state.routeChain[routeLength-2];
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
    components: { App },
    created() {

    }
});

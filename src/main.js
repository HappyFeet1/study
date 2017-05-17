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

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    created() {
        document.addEventListener('mousedown', (e) => {
            let state = this.$store.state;
            const target = e.target;
            console.log((target.nodeName));
            if (target.nodeName === 'A' &&
                /^#?\/[\w\d\/-_]+$/.test(target.getAttribute('href')) && !/\s?\b(route-active)\s?/.test(target.className)) { //点击路由链接说明激活路由
                state.pageDirection = 'slide-left';
            }
        }, true);
    }
});

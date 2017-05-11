// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { sync } from 'vuex-router-sync';
import router from './router';



import store from './store/';

import MtButton from './components/ui/button/button';
import './components/ui/button/style.css';
Vue.component(MtButton.name, MtButton);

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
            if (target.nodeName === 'A' &&
                target.getAttribute('href').substring(0, 2) === '#/' && !/\s?\b(route-active)\s?/.test(target.className)) { //点击路由链接说明激活路由
                state.pageDirection = 'slide-left';
            }
        })
    }
});

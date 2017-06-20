import Vue from 'vue';
import Vuex from 'vuex';

import utils from '../../static/js/utils';
const userAgent = decodeURIComponent(window.navigator.userAgent.replace(/%/g, '')).toLowerCase();
let localSessionRouteChain = sessionStorage.getItem('$$routeChain') || [];

try {
    localSessionRouteChain = location.hash !== '#/' ? JSON.parse(localSessionRouteChain) : [];
} catch (error) {
    localSessionRouteChain = [];
}

export default new Vuex.Store({
    state: {
        mainTabbarVisible: true,
        channel: parseInt(utils.getCookie('channel') || 0),
        pageDirection: 'fade',
        routeChain: localSessionRouteChain,
        selected: 'index',
        isApp: (userAgent.match(/qianshenghua/i) == 'qianshenghua' || userAgent.match(/peanut/i) == 'peanut'),
        isWeiXin: (userAgent.match(/MicroMessenger/i) == 'micromessenger'),
        addCount: 0
    },
    mutations: {
        addRouteChain(state, route) {
            if (state.addCount === 0 && localSessionRouteChain.length > 0) {//排除刷新的时候
                state.addCount = 1;
            } else {
                state.routeChain.push({ path: route.path });
                sessionStorage.setItem('$$routeChain', JSON.stringify(state.routeChain));
                state.addCount++;
            }
        },
        popRouteChain(state) {
            state.routeChain.pop();
            sessionStorage.setItem('$$routeChain', JSON.stringify(state.routeChain));
        },
        setPageDirection(state, dir) {
            state.pageDirection = dir;
        }
    }
});
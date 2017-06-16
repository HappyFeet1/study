import Vue from 'vue';
import Vuex from 'vuex';

import utils from '../../static/js/utils';
const userAgent = decodeURIComponent(window.navigator.userAgent.replace(/%/g, '')).toLowerCase();
let localSessionRouteChain = sessionStorage.getItem('$$routeChain');
let addCount = 0;

try {
    localSessionRouteChain = location.hash!=='#/'?JSON.parse(localSessionRouteChain):[];
} catch (error) {
    localSessionRouteChain = [];
}

export default new Vuex.Store({
    state: {
        mainTabbarVisible: true,
        channel: parseInt(utils.getCookie('channel')||0),
        pageDirection: 'fade',
        routeChain: localSessionRouteChain,
        selected: 'index',
        isApp: (userAgent.match(/qianshenghua/i) == 'qianshenghua' || userAgent.match(/peanut/i) == 'peanut' || userAgent.match(/peanut/i) == 'peanut'),
        isWeiXin: (userAgent.match(/MicroMessenger/i) == 'micromessenger')
    },
    mutations: {
        addRouteChain(state, route) {
            if(addCount!==0&&localSessionRouteChain.length!==0){//排除刷新的时候
                state.routeChain.push({path:route.path});
                sessionStorage.setItem('$$routeChain', JSON.stringify(state.routeChain));
            }
            addCount++;
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
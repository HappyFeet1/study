import Vue from 'vue';
import Vuex from 'vuex';

import utils from '../../static/js/utils';
const userAgent = decodeURIComponent(window.navigator.userAgent.replace(/%/g,'')).toLowerCase();

export default new Vuex.Store({
    state: {
        mainTabbarVisible:true,
        channel: parseInt(utils.getCookie('channel')),
        pageDirection: 'fade',
        routeChain:[],
        selected: 'index',
        isApp : (userAgent.match(/qianshenghua/i) == 'qianshenghua' || userAgent.match(/peanut/i) == 'peanut' || userAgent.match(/peanut/i) == 'peanut'),
        isWeiXin: (userAgent.match(/MicroMessenger/i) == 'micromessenger')
    },
    mutations: {
        addRouteChain(state, route){
            state.routeChain.push(route);
        },
        popRouteChain(state){
            state.routeChain.pop();
        },
        setPageDirection(state, dir){
            state.pageDirection = dir;
        }
    }
});
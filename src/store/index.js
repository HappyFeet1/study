import Vue from 'vue';
import Vuex from 'vuex';

import utils from '../../static/js/utils';

export default new Vuex.Store({
    state: {
        channel: parseInt(utils.getCookie('channel')),
        pageDirection: 'fade',
        routeChain:[]
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
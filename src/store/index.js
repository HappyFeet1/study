import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 1,
        pageDirection: 'slide-left'
    },
    mutations: {
        plus: (state) => state.count++,
        reduce: (state) => state.count--,
        afterEnter: (state) => {
            state.pageDirection = 'slide-right';
        }
    }
});
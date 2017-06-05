import axios from 'axios';
export default {
    namespaced: true,
    state: {
        loadData: [],
        params:{},
        loading: false
    },
    mutations: { //必须同步执行
        setData: function (state, data) {
            var arr = state.loadData;
            state.loadData = arr.concat(data);
        },
        clearData:function(state){
            state.loadData = [];
        },
        setLoading:function(state, type){
            state.loading = type;
        },
        setParams:function(state, params){
            state.params = params;
        }
    },
    actions: { //可以异步
        syncDate: function ({ state , commit }) {
            commit('setLoading', true);
            axios.get('/api/queryProjectList.do', {params:state.params})
                .then(res => {
                    setTimeout(()=>{
                        commit('setLoading', false);                    
                        commit('setData', res.data.data);
                    },0)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
}
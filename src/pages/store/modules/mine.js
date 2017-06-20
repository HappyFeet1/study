import axios from 'axios';
export default {
    namespaced: true,
    state: {
        data: {
            redeemData:{},
            income:''
        }
    },
    mutations: { //必须同步执行
        setDate: function (state, data) {
            state.data = {
                totalAssets: data.totalAssets,
                totalInteres: data.totalInteres,
                yesterdayInteres: data.yesterdayInteres,
                balance: data.balance,
                chinaPNRBalance: data.chinaPNRBalance,
                redeemData: data.redeemData || {},
                income: data.income
            }
        }
    },
    actions: { //可以异步
        syncDate: function ({ commit }) {
            axios.get('/api/mineAccount.do')
                .then(res => {
                    commit('setDate', res.data.data);
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
}
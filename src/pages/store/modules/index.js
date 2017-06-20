import axios from 'axios';
export default {
    namespaced: true,
    state: {
        data: {
           
        }
    },
    mutations: { //必须同步执行
        setDate: function (state, data) {
            state.data = {
                carouselbanner: data.carouselbanner,
                menus1: data.menus.splice(0, 3),
                menus2: data.menus.splice(0, 3),
                menus3: data.menus.splice(0, 3),
                overview: data.overviews,
                overviewUser: data.overviews.content[0],
                overviewIncome: data.overviews.content[0],
                overviewInvest: data.overviews.content[0],
                underlying : data.underlying,
                news: data.news
            }
        }
    },
    actions: { //可以异步
        syncDate: function ({ commit }) {
            axios.get('/api/appHomePage.do')
                .then(data => {
                    commit('setDate', data.data);
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
}
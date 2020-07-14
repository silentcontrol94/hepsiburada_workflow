import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);


export const store = new Vuex.Store({
    state : {
        linksLog : [],
    },
    getters : {
        getLinksLog(state){
            return state.linksLog
        }
    },
    mutations : {

    },
    actions : {

    }
})

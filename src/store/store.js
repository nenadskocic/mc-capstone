import Vue from 'vue';
import Vuex from 'vuex';
import loginAuth from './modules/loginAuth';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        loginAuth,
    }
});
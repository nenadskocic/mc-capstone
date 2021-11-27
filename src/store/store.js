import Vue from 'vue';
import Vuex from 'vuex';
import userAuthModule from './modules/userAuthModule';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userAuthModule,
    }
});
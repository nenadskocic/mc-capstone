import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import driver from './modules/driver';
import truck from './modules/truck';
import trailer from './modules/trailer';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        driver,
        truck,
        trailer,
    }
});
/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import driver from './modules/driver';
import truck from './modules/truck';
import trailer from './modules/trailer';
import client from './modules/client';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        driver,
        truck,
        trailer,
        client,
    }
});
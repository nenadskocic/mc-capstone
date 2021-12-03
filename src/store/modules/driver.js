/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
import axios from 'axios'

const resource_uri = "http://localhost:3000/driver_info";

export default {
    state: {
        drivers: []
    },
    getters: {
        allDrivers: (state) => state.drivers
    },
    actions: {
        async fetchDrivers({ commit }) {
            const res = await axios.get(resource_uri);
            commit('SET_DRIVERS', res.data)
        },
        async addDriver({ commit }, driver) {
            const res = await axios.post(resource_uri, driver);
            commit('ADD_DRIVER', res.data);
        },
        async updateDriver({ commit }, driver) {
            const res = await axios.put(`${resource_uri}/${driver.user_id}`, driver);
            commit('UPDATE_DRIVER', res.data);
        },
        async deleteDriver({ commit }, driver) {
            await axios.delete(`${resource_uri}/${driver.user_id}`);
            commit('DELETE_DRIVER', driver.user_id);
        },
    },
    mutations: {
        SET_DRIVERS: (state, drivers) => (state.drivers = drivers),
        ADD_DRIVER: (state, driver) => {
            state.drivers.push(driver);
        },
        UPDATE_DRIVER: (state, editedDriver) => {
            const index = state.drivers.findIndex(u => u.user_id === editedDriver.user_id);
            
            if(index !== -1) {1
                state.drivers.splice(index, 1, editedDriver);
            }    
        },
        DELETE_DRIVER: (state, user_id) => {
            let drivers = state.drivers.filter(u => u.user_id != user_id)
            state.drivers = drivers;
        }

    }
}
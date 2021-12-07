/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
import axios from 'axios'

const resource_uri = "http://159.65.218.19:3000/user";

export default {
    state: {
        users: []
    },
    getters: {
        allUsers: (state) => state.users
    },
    actions: {
        async fetchUsers({ commit }) {
            const res = await axios.get(resource_uri);
            commit('SET_USERS', res.data)
        },
        async addUser({ commit }, user) {
            const res = await axios.post(resource_uri, user);
            commit('ADD_USER', res.data);
        },
        async updateUser({ commit }, user) {
            const res = await axios.put(`${resource_uri}/${user.id}`, user);
            commit('UPDATE_USER', res.data);
        },
        async deleteUser({ commit }, user) {
            await axios.delete(`${resource_uri}/${user.id}`);
            commit('DELETE_USER', user.id);
        },
    },
    mutations: {
        SET_USERS: (state, users) => (state.users = users),
        ADD_USER: (state, user) => {
            state.users.push(user);
        },
        UPDATE_USER: (state, editedUser) => {
            const index = state.users.findIndex(u => u.id === editedUser.id);
            
            if(index !== -1) {1
                state.users.splice(index, 1, editedUser);
            }    
        },
        DELETE_USER: (state, id) => {
            let users = state.users.filter(u => u.id != id)
            state.users = users;
        }

    }
}
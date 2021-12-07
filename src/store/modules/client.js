/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
import axios from 'axios'

const resource_uri = "http://localhost:3000/client_info";

export default {
    state: {
        clients: []
    },
    getters: {
        allClients: (state) => state.clients
    },
    actions: {
        async fetchClients({ commit }) {
            const res = await axios.get(resource_uri);
            commit('SET_CLIENTS', res.data)
        },
        async addDriver({ commit }, client) {
            const res = await axios.post(resource_uri, client);
            commit('ADD_CLIENT', res.data);
        },
        async updateClient({ commit }, client) {
            const res = await axios.put(`${resource_uri}/${client.client_id}`, client);
            commit('UPDATE_CLIENT', res.data);
        },
        async deleteClient({ commit }, client) {
            await axios.delete(`${resource_uri}/${client.client_id}`);
            commit('DELETE_CLIENT', client.client_id);
        },
    },
    mutations: {
        SET_CLIENTS: (state, clients) => (state.clients = clients),
        ADD_CLIENT: (state, client) => {
            state.clients.push(client);
        },
        UPDATE_CLIENT: (state, editedClient) => {
            const index = state.clients.findIndex(u => u.client_id === editedClient.client_id);
            
            if(index !== -1) {1
                state.clients.splice(index, 1, editedClient);
            }    
        },
        DELETE_CLIENT: (state, client_id) => {
            let clients = state.clients.filter(u => u.client_id != client_id)
            state.clients = clients;
        }
    }
}
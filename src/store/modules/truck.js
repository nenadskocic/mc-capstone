import axios from 'axios'

const resource_uri = "http://localhost:3000/truck";

export default {
    state: {
        trucks: []
    },
    getters: {
        allTrucks: (state) => state.trucks
    },
    actions: {
        async fetchTrucks({ commit }) {
            const res = await axios.get(resource_uri);
            commit('SET_TRUCKS', res.data)
        },
        async addDriver({ commit }, truck) {
            const res = await axios.post(resource_uri, truck);
            commit('ADD_TRUCK', res.data);
        },
        async updateTruck({ commit }, truck) {
            const res = await axios.put(`${resource_uri}/${truck.truck_id}`, truck);
            commit('UPDATE_TRUCK', res.data);
        },
        async deleteTruck({ commit }, truck) {
            await axios.delete(`${resource_uri}/${truck.truck_id}`);
            commit('DELETE_TRUCK', truck.user_id);
        },
    },
    mutations: {
        SET_TRUCKS: (state, trucks) => (state.trucks = trucks),
        ADD_TRUCK: (state, truck) => {
            state.trucks.push(truck);
        },
        UPDATE_TRUCK: (state, editedTruck) => {
            const index = state.trucks.findIndex(u => u.id === editedTruck.truck_id);
            
            if(index !== -1) {1
                state.trucks.splice(index, 1, editedTruck);
            }    
        },
        DELETE_TRUCK: (state, truck_id) => {
            let trucks = state.trucks.filter(u => u.truck_id != truck_id)
            state.trucks = trucks;
        }

    }
}
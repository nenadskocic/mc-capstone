import axios from 'axios'

const resource_uri = "http://localhost:3000/trailer";

export default {
    state: {
        trailers: []
    },
    getters: {
        allTrailers: (state) => state.trailers
    },
    actions: {
        async fetchTrailers({ commit }) {
            const res = await axios.get(resource_uri);
            commit('SET_TRAILERS', res.data)
        },
        async addTrailer({ commit }, trailer) {
            const res = await axios.post(resource_uri, trailer);
            commit('ADD_TRAILER', res.data);
        },
        async updateTrailer({ commit }, trailer) {
            const res = await axios.put(`${resource_uri}/${trailer.trailer_id}`, trailer);
            commit('UPDATE_TRAILER', res.data);
        },
        async deleteTrailer({ commit }, trailer) {
            await axios.delete(`${resource_uri}/${trailer.trailer_id}`);
            commit('DELETE_TRAILER', trailer.trailer_id);
        },
    },
    mutations: {
        SET_TRAILERS: (state, trailers) => (state.trailers = trailers),
        ADD_TRAILER: (state, trailer) => {
            state.trailers.push(trailer);
        },
        UPDATE_TRAILER: (state, editedTrailer) => {
            const index = state.trailers.findIndex(u => u.trailer_id === editedTrailer.trailer_id);
            
            if(index !== -1) {1
                state.trailers.splice(index, 1, editedTrailer);
            }    
        },
        DELETE_TRAILER: (state, trailer_id) => {
            let trailers = state.trailers.filter(u => u.trailer_id != trailer_id)
            state.trailers = trailers;
        }

    }
}
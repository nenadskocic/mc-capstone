/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
 import axios from 'axios'

 const resource_uri = "http://localhost:3000/orders";
 
 export default {
     state: {
         orders: []
     },
     getters: {
         allOrders: (state) => state.orders
     },
     actions: {
         async fetchOrders({ commit }) {
             const res = await axios.get(resource_uri);
             commit('SET_ORDERS', res.data)
         },
     },
     mutations: {
         SET_ORDERS: (state, orders) => (state.orders = orders),
     }
 }
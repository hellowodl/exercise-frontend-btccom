import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'
import uniqBy from 'lodash/uniqBy'

import matches from './matches/index'
import buy from './orders/buy'
import sell from './orders/sell'

Vue.use(Vuex)

export default new Store({
  state: {
    lastId: 0,
    orders: []
  },
  actions: {
    async loadOrders ({ commit, state, dispatch }) {
      const orders = (await axios.get(`http://localhost:5001/listOrders?start=${state.lastId}&size=1000000`)).data
      const lastIdInOrders = orders[orders.length - 1].id

      if (lastIdInOrders === state.lastId + 1) { return }

      commit('setLastId', lastIdInOrders - 1)
      commit('addOrders', orders)

      dispatch('matches/run')
    },
    updateOrDeleteOrder ({ commit }, order) {
      if (order.quantity === 0) {
        commit('deleteOrder', order)
      } else {
        commit('updateOrder', order)
      }
    }
  },
  mutations: {
    setLastId (state, id) {
      state.lastId = id
    },
    addOrders (state, orders) {
      state.orders = uniqBy([...state.orders, ...orders], i => i.id)
    },
    deleteOrder (state, order) {
      state.orders = state.orders.filter(i => i.id !== order.id)
    },
    updateOrder (state, order) {
      state.orders = state.orders.map((i) => i.id === order.id ? order : i)
    }
  },
  modules: {
    matches,
    buy,
    sell
  }
})

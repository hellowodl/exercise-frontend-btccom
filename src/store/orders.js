import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'
import uniqBy from 'lodash/uniqBy'

Vue.use(Vuex)

const ASC_PRICE = (a, b) => a.price - b.price || b.id - a.id
const DESC_PRICE = (a, b) => b.price - a.price || b.id - a.id

const DESC_DATE = (a, b) => a.time - b.time

const BUY = (i) => i.type === 'buy'
const SELL = (i) => i.type === 'sell'

export default new Store({
  state: {
    lastId: 0,
    orders: [],
    matches: []
  },
  getters: {
    matches: state => state.matches.sort(DESC_DATE).slice(-30),
    sellOrdersView: state => state.orders.filter(SELL).sort(ASC_PRICE).slice(-20),
    buyOrdersView: state => state.orders.filter(BUY).sort(DESC_PRICE).slice(-20),
    sellOrders: state => state.orders.filter(SELL).sort(ASC_PRICE),
    buyOrders: state => state.orders.filter(BUY).sort(DESC_PRICE)
  },
  actions: {
    match ({ dispatch, getters }) {
      getters.buyOrders.every((buy, bIndex, buyOrders) => {
        getters.sellOrders.every((sell, sIndex, sellOrders) => {
          if (sell.price > buy.price || buy.quantity === 0) { return false }

          if (sell.quantity === 0) { return true }

          dispatch('matchOrder', { buy, sell, buyOrders, sellOrders, sIndex, bIndex })

          return true
        })
        return true
      })
    },
    matchOrder ({ dispatch, commit }, { buy, sell, buyOrders, sellOrders, sIndex, bIndex }) {
      const avgPrice = (buy.price + sell.price) / 2
      const quantity = Math.abs(buy.quantity - sell.quantity)

      commit('ADD_MATCH', {
        time: new Date(),
        timeString: new Date().toLocaleString(),
        price: avgPrice,
        quantity: quantity,
        sellOrder: sell,
        buyOrder: buy
      })

      const sellQuantity = sell.quantity > buy.quantity ? sell.quantity - buy.quantity : 0
      const buyQuantity = sell.quantity < buy.quantity ? buy.quantity - sell.quantity : 0

      sell.quantity = sellQuantity
      buy.quantity = buyQuantity

      sellOrders[sIndex] = sell
      buyOrders[bIndex] = buy

      dispatch('updateOrDeleteOrder', buy)
      dispatch('updateOrDeleteOrder', sell)
    },
    async loadOrders ({ commit, state, dispatch }) {
      setTimeout(() => dispatch('loadOrders'), 3000)

      const orders = (await axios.get(`http://localhost:5001/listOrders?start=${state.lastId}&size=1000000`)).data
      const lastIdInOrders = orders[orders.length - 1].id

      if (lastIdInOrders === state.lastId + 1) { return }

      commit('SET_LAST_ID', lastIdInOrders - 1)
      commit('ADD_ORDERS', orders)

      dispatch('match')
    },
    updateOrDeleteOrder ({ commit }, order) {
      if (order.quantity === 0) {
        commit('DELETE_ORDER', order)
      } else {
        commit('UPDATE_ORDER', order)
      }
    }
  },
  mutations: {
    SET_LAST_ID (state, id) {
      state.lastId = id
    },
    ADD_ORDERS (state, orders) {
      state.orders = uniqBy([...state.orders, ...orders], i => i.id)
    },
    DELETE_ORDER (state, order) {
      state.orders = state.orders.filter(i => i.id !== order.id)
    },
    UPDATE_ORDER (state, order) {
      state.orders = state.orders.map((i) => i.id === order.id ? order : i)
    },
    ADD_MATCH (state, match) {
      state.matches.push(match)
    }

  }
})

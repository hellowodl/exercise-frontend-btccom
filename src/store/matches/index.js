import { DESC_DATE } from '../filters'

export default {
  namespaced: true,

  state: {
    matches: []
  },
  getters: {
    getView: state => state.matches.sort(DESC_DATE).slice(-30)
  },
  actions: {
    run ({ rootGetters, dispatch }) {
      rootGetters['buy/getAll'].every((buy, bIndex, buyOrders) => {
        rootGetters['sell/getAll'].every((sell, sIndex, sellOrders) => {
          if (sell.price > buy.price || buy.quantity === 0) { return false }

          if (sell.quantity === 0) { return true }

          dispatch('matchedOrder', { buy, sell, buyOrders, sellOrders, sIndex, bIndex })

          return true
        })
        return true
      })
    },
    matchedOrder ({ dispatch, commit, root }, { buy, sell, buyOrders, sellOrders, sIndex, bIndex }) {
      const avgPrice = (buy.price + sell.price) / 2
      const quantity = Math.abs(buy.quantity - sell.quantity)

      commit('addMatch', {
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

      dispatch('updateOrDeleteOrder', buy, { root: true })
      dispatch('updateOrDeleteOrder', sell, { root: true })
    }
  },
  mutations: {
    addMatch (state, match) {
      state.matches.push(match)
    }
  }
}

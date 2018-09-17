import { BUY, DESC_PRICE } from '../filters'

export default {
  namespaced: true,

  getters: {
    getView (sibbe, is, rootState) {
      return rootState.orders.filter(BUY).sort(DESC_PRICE).slice(-20)
    },
    getAll (sibbe, is, rootState) {
      return rootState.orders.filter(BUY).sort(DESC_PRICE)
    }
  }
}

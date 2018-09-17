import { SELL, ASC_PRICE } from '../filters'

export default {
  namespaced: true,

  getters: {
    getView (sibbe, is, rootState) {
      return rootState.orders.filter(SELL).sort(ASC_PRICE).slice(-20)
    },
    getAll (sibbe, is, rootState) {
      return rootState.orders.filter(SELL).sort(ASC_PRICE)
    }
  }
}

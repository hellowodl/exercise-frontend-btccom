<template>
  <div class="hello">
    <order-table
      title="Buy Orders"
      v-bind:orders="buyOrders"
      v-bind:color="color.buyTable"
    />
    <order-table
      title="Sell Orders"
      v-bind:orders="sellOrders"
      v-bind:color="color.sellTable"
    />
    <matches-table />
  </div>
</template>

<script>
import MatchesTable from './matches/Table'
import OrderTable from './orders/Table'
import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      color: {
        buyTable: '#FF5252',
        sellTable: '#00bcd4'
      }
    }
  },
  components: {
    MatchesTable,
    OrderTable
  },
  computed: {
    ...mapGetters({
      sellOrders: 'buy/getView',
      buyOrders: 'sell/getView'
    })
  }
}
</script>

<style>
  th {
    padding: 5px 0 0 0;
  }
</style>

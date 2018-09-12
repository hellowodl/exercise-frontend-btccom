<template>
  <div class="hello">
    <order-table :orders="buyOrdersView" title="Buy Orders"/>
    <order-table :orders="sellOrdersView" title="Sell Orders"/>
    <matches />
  </div>
</template>

<script>
import Matches from './Matches'
import OrderTable from './orderTable'
import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  components: {
    Matches,
    OrderTable
  },
  computed: {
    ...mapGetters(['buyOrdersView', 'sellOrdersView'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

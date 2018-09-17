<template>
  <div class="orders table">
    <h2>{{ title }}</h2>
    <vue-good-table
        :columns="columns"
        :rows="orders"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'volume-bar'">
          <volume-bar v-bind:volume="props.formattedRow['quantity']" v-bind:max-volume="maxVolume" v-bind:color="color"/>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

    </vue-good-table>
  </div>
</template>

<script>
import VolumeBar from './components/VolumeBar'

export default {
  name: 'OrderTable',
  props: ['orders', 'title', 'color'],
  computed: {
    maxVolume () {
      const volumeArray = this.orders.map((i) => i.quantity)

      return Math.max(...volumeArray, 1)
    }
  },
  data () {
    return {
      columns: [
        {label: 'ID', field: 'id'},
        {label: 'Price', field: 'price'},
        {label: 'Volume', field: 'quantity'},
        {label: 'Volume Bar', field: 'volume-bar'}
      ]
    }
  },
  components: {
    VolumeBar
  }
}
</script>

<style scoped>
  td {
    transition: all 1s;
    transition-timing-function: ease-in-out;
  }
</style>

<template>
  <div class="hello">
    <v-data-table
      :headers="headers"
      :items="buyOrders"
      :pagination.sync="paginationBuy"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.type }}</td>
        <td class="text-xs-right">{{ props.item.quantity }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
      </template>
    </v-data-table>
  </div>
</template>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      paginationSell: { sortBy: 'price' },
      paginationBuy: { sortBy: '-price' },
      headers: [
        { text: 'ID', value: 'id', align: 'center', width: '25%' },
        { text: 'Type', value: 'type', align: 'center', width: '25%' },
        { text: 'Quantity', value: 'quantity', align: 'center', width: '25%' },
        { text: 'Price', value: 'price', align: 'center', width: '25%' }
      ],
      orders: []
    }
  },
  mounted () {
    this.getOrders()
  },
  methods: {
    async getOrders () {
      const res = (await axios.get('http://localhost:5001/listOrders?start=10&size=100')).data

      this.orders = res
    }
  },
  computed: {
    sellOrders: function () {
      return this.orders.filter(i => i.type === 'sell').sort((a, b) => a.price + b.price).slice(-10)
    },
    buyOrders: function () {
      return this.orders.filter(i => i.type === 'sell').sort((a, b) => a.price + b.price).slice(-10)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

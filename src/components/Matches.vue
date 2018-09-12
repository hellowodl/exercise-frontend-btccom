<template>
  <div class="matches table" >
    <h2>Matches</h2>
    <vue-good-table
        :columns="columns"
        :rows="matches"
        @on-row-click="onRowClick"
    />

    <vodal :show="showModal" animation="zoom" @hide="showModal = false" height="275">
      <div class="modal-data">
          <h4>Match Data</h4>
          <div>
            <label>Time</label>
            {{ modalData.timeString }}
          </div>
          <div>
            <label>Quantity</label>
            {{ modalData.quantity }}
          </div>
          <div>
            <label>Price</label>
            {{ modalData.price }}
          </div>
          <div>
            <label>Quantity</label>
            {{ modalData.quantity }}
          </div>
          <div id="sell-order" class="order-pane">
            <h4>Buy Data</h4>
            <div>
                <label>ID</label>
                {{ modalData.buyOrder.id }}
            </div>
            <div>
                <label>Price</label>
                {{ modalData.buyOrder.price }}
            </div>

          </div>
          <div id="buy-order" class="order-pane">
            <h4>Sell Data</h4>
            <div>
                <label>ID</label>
                {{ modalData.sellOrder.id }}
            </div>
            <div>
                <label>Price</label>
                {{ modalData.sellOrder.price }}
            </div>

          </div>
      </div>
    </vodal>
  </div>
</template>

<script>
import Vodal from 'vodal'

import 'vodal/common.css'
import 'vodal/rotate.css'

export default {
  name: 'Matches',
  data () {
    return {
      showModal: false,
      modalData: {
        timeString: '',
        price: '',
        quantity: 0,
        sellOrder: {
          id: 0,
          price: 0,
          quantity: 0
        },
        buyOrder: {
          id: 0,
          price: 0,
          quantity: 0
        }
      },
      columns: [
        {label: 'Time', field: 'timeString'},
        {label: 'Quantity', field: 'quantity'},
        {label: 'Price', field: 'price'}
      ]
    }
  },
  methods: {
    onRowClick ({ row }) {
      this.modalData = row
      this.showModal = true
    }
  },
  computed: {
    matches () {
      return this.$store.getters.matches
    }
  },
  components: {
    Vodal
  }
}
</script>

<style scoped>
    .order-pane {
        position: relative;
        width: 50%;
        float: left;
    }

    label {
        font-weight: bold;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->

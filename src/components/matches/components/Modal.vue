<template>
  <vodal :show="showModal" animation="zoom" @hide="showModal = false" :height="275">
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
</template>

<script>
import Vodal from 'vodal'

import 'vodal/common.css'
import 'vodal/rotate.css'

export default {
  props: ['modalData', 'showModal'],
  name: 'Modal',
  components: { Vodal }
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

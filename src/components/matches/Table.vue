<template>
  <div class="matches table">
    <h2>Matches</h2>
    <vue-good-table
        :columns="columns"
        :rows="matches"
        @on-row-click="onRowClick"
    />
    <modal
      :show-modal="showModal"
      :modal-data="modalData"
    ></modal>
  </div>
</template>

<script>
import Modal from './components/Modal'

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
  computed: {
    matches () {
      return this.$store.getters['matches/getView']
    }
  },
  methods: {
    onRowClick ({ row }) {
      this.modalData = row
      this.showModal = true
    }
  },
  components: { Modal }
}
</script>

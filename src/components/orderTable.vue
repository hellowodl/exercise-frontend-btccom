<template>
  <div class="orders table">
    <h2>{{ title }}</h2>
    <vue-good-table
        :columns="columns"
        :rows="orders"
        @on-row-click="onRowClick"
    />
  </div>
</template>

<script>
export default {
  name: 'OrderTable',
  props: ['orders', 'title'],
  data () {
    return {
      columns: [
        {label: 'ID', field: 'id'},
        {label: 'Price', field: 'price'},
        {label: 'Quantity', field: 'quantity'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

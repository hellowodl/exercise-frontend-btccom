<template>
  <div id="app">
    <Main/>
  </div>
</template>

<script>
import Main from './components/Main'

export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('loadOrders')
    setInterval(() => this.$store.dispatch('loadOrders'), 3000)
  },
  components: {
    Main
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.orders {
  position: relative;
  float: left;
  width: 45%;
  margin: 2.5% 2.5%;
}
.matches {
  margin: 2.5% 2.5%;
}
</style>

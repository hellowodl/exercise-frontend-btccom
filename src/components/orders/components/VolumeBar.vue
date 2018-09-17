<template>
    <div class="volume-bar" v-bind:style="style">

    </div>
</template>

<script>
export default {
  props: ['volume', 'maxVolume', 'color'],
  name: 'VolumeBar',
  computed: {
    percentage () {
      return (this.volume / this.maxVolume) * 100
    },
    style () {
      return {
        width: `${this.percentage}%`,
        'background-color': this.color
      }
    }
  }
}
</script>

<style scoped>
  @keyframes example {
    from {
      width: 0px;
      background-color: white;
    }
  }

  .volume-bar {
    height: 14px;
    border-radius: 3px;
    animation-name: example;
    animation-duration: 1.3s;
  }
</style>

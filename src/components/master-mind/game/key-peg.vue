<template>
  <figure class='sphere' :style='cssStyle' :title='title' />
</template>

<script>
// CSS for the circle piece, default to black/empty
export default {
  name: 'KeyPeg',
  props: {
    value: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    title () {
      if (this.value === 1) {
         return 'Right peg color, wrong place'
      }
      if (this.value === 2) {
         return 'Right peg color, right place'
      }
      return ''
    },
    cssStyle () {
      let color = '#565656'
      if (this.value === 1) {
         color = 'red'
      }
      if (this.value === 2) {
         color = 'white'
      }
      return {
        background: `radial-gradient(circle at 5px 5px, ${color}, #000)`
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sphere {
  border-radius: 50%;
  transform: translate(0, 0);
  height: 16px;
  width: 16px;
  margin: 12px 5px;
}
</style>

<template>
  <figure class='sphere' :style='cssStyle' />
</template>

<script>
export default {
  name: 'Piece',
  props: {
    piece: {
      type: Object,
      required: true
    }
  },
  computed: {
    cssStyle () {
      const color = this.piece.color || '#565656'
      return {
        background: `radial-gradient(circle at 10px 10px, ${color}, #000)`
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
  height: 30px;
  width: 30px;
  margin: 5px;
}
</style>

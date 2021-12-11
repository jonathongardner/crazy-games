<template>
  <piece :piece='piece' draggable='true' @dragstart='drag' />
</template>

<script>
import Piece from './piece.vue'
export default {
  name: 'Option',
  components: { Piece },
  props: {
    piece: {
      type: Object,
      required: true
    }
  },
  methods: {
    drag (event) {
      event.dataTransfer.setData('piece', JSON.stringify(this.piece))
      event.dataTransfer.dropEffect = 'copy'
      event.dataTransfer.effectAllowed = 'move'
    }
  },
}
</script>

<style scoped lang="scss">
.options {
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
}
</style>

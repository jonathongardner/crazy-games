<template>
  <piece :piece='piece' @drop='drop' @dragenter.prevent @dragover.prevent :draggable='editable' @dragstart='drag' />
</template>

<script>
import Piece from './piece.vue'

export default {
  name: 'Pick',
  components: { Piece },
  props: {
    pick: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    piece () {
      console.log(this.pick.piece)
      return this.pick.piece || {}
    }
  },
  methods: {
    drag(event) {
      event.dataTransfer.setData('piece', JSON.stringify(this.piece))
      // event.dataTransfer.dropEffect = 'copy'
      event.dataTransfer.effectAllowed = 'move'
    },
    drop (event) {
      const piece = JSON.parse(event.dataTransfer.getData('piece'))
      this.$emit('update:pick', { ...this.pick, piece })
    },
  }
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
.empty {
  background: radial-gradient(circle at 15px 10px, #565656, #000);
}
</style>

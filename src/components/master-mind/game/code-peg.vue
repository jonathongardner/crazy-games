<template>
  <figure class='sphere' :style='cssStyle' @drop='drop' @dragenter.prevent @dragover.prevent @dragend='dragend' :draggable='editable' @dragstart='drag'/>
</template>

<script>
// CSS for the circle piece, default to black/empty
export default {
  name: 'CodePeg',
  props: {
    codePeg: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cssStyle () {
      const color = this.codePeg || '#565656'
      return {
        background: `radial-gradient(circle at 10px 10px, ${color}, #000)`
      }
    }
  },
  methods: {
    drop (event) {
      if (this.editable) {
        const codePeg = event.dataTransfer.getData('codePeg')
        // console.log('drop: ' + this.codePeg + ' -> ' + codePeg + '   ' + this.editable)
        this.$emit('update:codePeg', codePeg)
      }
    },
    drag (event) {
      event.dataTransfer.dropEffect = 'copy'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('codePeg', this.codePeg)
      // console.log('drag: ' + this.codePeg)
    },
    dragend () {
      if (this.editable) {
        // console.log('dragend: ' + this.codePeg)
        this.$emit('update:codePeg', '')
      }
    }
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
</style>

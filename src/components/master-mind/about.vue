<template>
  <div>
    <button class='button' @click='openMM'>
      About
    </button>
    <my-modal v-model:show='open'>
      <template v-slot:section>
        This is a test this is only a test
      </template>
    </my-modal>
  </div>
</template>

<script>
import MyModal from '@/components/my-modal'

export default {
  name: 'MMAbout',
  components: { MyModal },
  data() {
    return {
      open: false
    }
  },
  methods: {
    openMM () {
      this.open = true
    },
    drag (event) {
      event.dataTransfer.dropEffect = 'copy'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('codePeg', this.codePeg)
      // console.log('drag: ' + this.codePeg)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

<template>
  <div>
    <button class='button' @click='openMM'>
      Settings
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
  name: 'MMSettings',
  components: { MyModal },
  props: {
    options: {
      type: Array,
      required: true,
    },
    numberOfSlots: {
      type: Number,
      required: true,
    },
    numberOfRows: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    openMM () {
      this.open = true
    },
    update () {

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

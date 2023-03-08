<template>
  <my-modal @close='close'>
    <template v-slot:header>
      <p class="modal-card-title">ChooChoo Settings</p>
    </template>
    <template v-slot:section>
      <div>Settings</div>
    </template>
    <template v-slot:footer>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-success" :disabled='cantSave' @click='save'>Save</button>
        </div>
        <div class="control">
          <button class="button is-danger" @click='cancel'>Cancel</button>
        </div>
        <div class="control">
          <button class="button is-warning" @click='backToDefaults'>Defaults</button>
        </div>
      </div>
    </template>
  </my-modal>
</template>

<script>
import MyModal from '@/components/my-modal'

export default {
  name: 'ChooChooSettings',
  components: { MyModal },
  data() {
    return {}
  },
  computed: {},
  methods: {
    backToDefaults () {
    },
    save () {
      this.$router.push({ name: 'choo-choo', params: { reload: true } })
    },
    cancel () {
      if (this.someChanged) {
        this.options = this.originalOptions
        this.numberOfSlots = this.originalNumberOfSlots
        this.numberOfRows = this.originalNumberOfRows
      } else {
        this.$router.push({ name: 'choo-choo' })
      }
    },
    close () {
      this.$router.push({ name: 'choo-choo' })
    },
  }
}
</script>

<style lang='scss' scoped>
</style>

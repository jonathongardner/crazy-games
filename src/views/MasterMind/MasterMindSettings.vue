<template>
  <my-modal @close='close'>
    <template v-slot:header>
      <p class="modal-card-title">Mastermind Settings</p>
    </template>
    <template v-slot:section>
      <my-input label='Number of Turns' name='numberOfRows' v-model:value='numberOfRows' :min='1' type='number'/>
      <my-input label='Number of Slots' name='numberOfSlots' v-model:value='numberOfSlots' :min='1' type='number'/>
      <peg-select v-model:options='options' />
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
import { defaultMasterMind, saveMasterMind, loadMasterMind } from '@/helpers/settings.js'
import MyInput from '@/components/form/my-input'
import PegSelect from '@/components/form/peg-select'
import MyModal from '@/components/my-modal'

export default {
  name: 'MasterMindSettings',
  components: { MyInput, PegSelect, MyModal },
  data() {
    const { options, numberOfSlots, numberOfRows } = loadMasterMind()

    return {
      originalOptions: options,
      originalNumberOfSlots: numberOfSlots,
      originalNumberOfRows: numberOfRows,
      options,
      numberOfSlots,
      numberOfRows
    }
  },
  computed: {
    someChanged () {
      return this.originalOptions !== this.options ||
        this.originalNumberOfSlots !== this.numberOfSlots ||
        this.originalNumberOfRows !== this.numberOfRows
    },
    cantSave () {
      const hasValues = this.options.length > 1 &&
        this.numberOfSlots > 0 &&
        this.numberOfRows > 0

      return !(this.someChanged && hasValues)
    }
  },
  methods: {
    backToDefaults () {
      const { options, numberOfSlots, numberOfRows } = defaultMasterMind()
      this.options = options
      this.numberOfSlots = numberOfSlots
      this.numberOfRows = numberOfRows
    },
    save () {
      if (this.cantSave) {
        return
      }
      saveMasterMind({
        options: this.options,
        numberOfSlots: this.numberOfSlots,
        numberOfRows: this.numberOfRows
      })
      // param value needs to change to reload route so cant just use boolean
      const reload = (new Date()).getTime()
      this.$router.push({ name: 'master-mind', params: { reload } })
    },
    cancel () {
      if (this.someChanged) {
        this.options = this.originalOptions
        this.numberOfSlots = this.originalNumberOfSlots
        this.numberOfRows = this.originalNumberOfRows
      } else {
        this.$router.push({ name: 'master-mind' })
      }
    },
    close () {
      this.$router.push({ name: 'master-mind' })
    },
  }
}
</script>

<style lang='scss' scoped>
</style>

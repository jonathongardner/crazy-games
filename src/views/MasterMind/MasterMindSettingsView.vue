<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import MyInput from '@/components/form/MyInput.vue'
import PegSelect from '@/components/form/PegSelect.vue'
import MyModal from '@/components/MyModal.vue'
import { defaultMasterMind, loadMasterMind, saveMasterMind } from '@/helpers/settings'

const router = useRouter()
const loaded = loadMasterMind()
const originalOptions = [...loaded.options]
const originalNumberOfSlots = loaded.numberOfSlots
const originalNumberOfRows = loaded.numberOfRows
const options = ref([...loaded.options])
const numberOfSlots = ref(loaded.numberOfSlots)
const numberOfRows = ref(loaded.numberOfRows)

const someChanged = computed(
  () =>
    JSON.stringify(originalOptions) !== JSON.stringify(options.value) ||
    originalNumberOfSlots !== numberOfSlots.value ||
    originalNumberOfRows !== numberOfRows.value,
)
const cantSave = computed(
  () =>
    !someChanged.value ||
    options.value.length < 2 ||
    numberOfSlots.value < 1 ||
    numberOfRows.value < 1 ||
    new Set(options.value).size !== options.value.length,
)

function backToDefaults(): void {
  const defaults = defaultMasterMind()
  options.value = defaults.options
  numberOfSlots.value = defaults.numberOfSlots
  numberOfRows.value = defaults.numberOfRows
}

function save(): void {
  if (cantSave.value) return
  saveMasterMind({
    options: options.value,
    numberOfSlots: numberOfSlots.value,
    numberOfRows: numberOfRows.value,
  })
  void router.push({ name: 'master-mind', query: { reload: String(Date.now()) } })
}

function cancel(): void {
  if (someChanged.value) {
    options.value = [...originalOptions]
    numberOfSlots.value = originalNumberOfSlots
    numberOfRows.value = originalNumberOfRows
    return
  }
  close()
}

function close(): void {
  void router.push({ name: 'master-mind' })
}
</script>

<template>
  <MyModal @close="close">
    <template #header><p class="modal-card-title">Mastermind Settings</p></template>
    <template #section>
      <MyInput v-model:value="numberOfRows" label="Number of Turns" name="numberOfRows" :min="1" type="number" />
      <MyInput v-model:value="numberOfSlots" label="Number of Slots" name="numberOfSlots" :min="1" type="number" />
      <PegSelect v-model:options="options" />
    </template>
    <template #footer>
      <div class="field is-grouped">
        <div class="control"><button class="button is-success" :disabled="cantSave" @click="save">Save</button></div>
        <div class="control"><button class="button is-danger" @click="cancel">Cancel</button></div>
        <div class="control"><button class="button is-warning" @click="backToDefaults">Defaults</button></div>
      </div>
    </template>
  </MyModal>
</template>

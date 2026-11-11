<script setup lang="ts">
import { computed } from 'vue'

import { debounce, randomColor } from '@/helpers/methods'

const props = defineProps<{ options: string[] }>()
const emit = defineEmits<{ 'update:options': [options: string[]] }>()
const showError = computed(() => new Set(props.options).size !== props.options.length)

const updateSize = debounce((event: Event) => {
  const input = event.currentTarget as HTMLInputElement
  if (!input.value) return

  const size = Math.max(2, Number.parseInt(input.value, 10))
  const options = props.options.slice(0, size)
  while (options.length < size) options.push(randomColor())
  emit('update:options', options)
})

function update(index: number, event: Event): void {
  const value = (event.currentTarget as HTMLInputElement).value
  emit(
    'update:options',
    props.options.map((option, optionIndex) => (index === optionIndex ? value : option)),
  )
}
</script>

<template>
  <div class="field">
    <label class="label" for="peg-count">Pegs</label>
    <div class="control">
      <input
        id="peg-count"
        class="input"
        :value="options.length"
        :min="2"
        :step="1"
        type="number"
        placeholder="Number of pegs"
        @input="updateSize"
      />
    </div>
    <div class="control">
      <input
        v-for="(option, index) in options"
        :key="index"
        class="color-input input"
        type="color"
        :value="option"
        :aria-label="`Peg color ${index + 1}`"
        @input="update(index, $event)"
      />
    </div>
    <p v-if="showError" class="help is-danger">Warning: duplicate colors</p>
  </div>
</template>

<style scoped>
.color-input {
  width: 100px;
  padding: 2px;
  margin: 5px;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value: string | number
    errors?: string[]
    placeholder?: string
    autocomplete?: string
    name?: string
    label?: string
    type?: string
    min?: string | number
    max?: string | number
    disabled?: boolean
    step?: string | number
    required?: boolean
  }>(),
  {
    errors: () => [],
    placeholder: '',
    autocomplete: '',
    name: '',
    label: '',
    type: 'text',
    min: undefined,
    max: undefined,
    disabled: false,
    step: '',
    required: false,
  },
)

const emit = defineEmits<{ 'update:value': [value: string | number] }>()
const inputName = computed(() => props.name || props.label)
const inputPlaceholder = computed(() => props.placeholder || props.label)
const showError = computed(() => props.errors.length > 0)
const error = computed(() => props.errors.join(', '))

function updateValue(event: Event): void {
  const value = (event.currentTarget as HTMLInputElement).value
  emit('update:value', props.type === 'number' ? Number(value) : value)
}
</script>

<template>
  <div class="field">
    <label v-if="label" class="label" :for="inputName">{{ label }}</label>
    <div class="control my-input" :class="{ 'has-icons-right': showError }">
      <input
        :id="inputName"
        class="input"
        :class="{ 'is-danger': showError }"
        :type="type"
        :min="min"
        :max="max"
        :disabled="disabled"
        :name="inputName"
        :placeholder="inputPlaceholder"
        :value="value"
        :step="step"
        :autocomplete="autocomplete"
        :required="required"
        @input="updateValue"
      />
      <span v-if="showError" class="icon is-small is-right" aria-hidden="true">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <slot></slot>
    <p v-if="showError" class="help is-danger">{{ error }}</p>
  </div>
</template>

<style scoped>
.my-input {
  flex: 1;
}
</style>

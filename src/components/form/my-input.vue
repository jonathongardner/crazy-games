<template>
  <div class="field">
    <label v-if='showLabel' class="label">{{ label }}</label>
    <div class="control my-input" :class="{'has-icons-right': showError}">
      <input class="input" :class="{'is-danger': showError}"
        :type='type' :min='min' :max='max' :disabled='disabled' :name='nam'
        :placeholder="pholder" :value='value' @input='input' :step='step'
        :autocomplete="autocomplete" :required='required'>
      <span v-if='showError' class="icon is-small is-right">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <slot></slot>
    <p v-if='showError' class="help is-danger">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    value: {
      required: true
    },
    errors: {
      type: Array,
      default() {
        return []
      },
    },
    placeholder: {
      type: String,
      default: null,
    },
    autocomplete: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    min: {
      type: [String, Number],
    },
    max: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    step: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    nam() {
      return this.name || this.label || ''
    },
    pholder() {
      return this.placeholder || this.label || ''
    },
    showError() {
      return !!this.errors.length
    },
    showLabel() {
      return !!this.label
    },
    error() {
      return this.errors.join(', ')
    }
  },
  methods: {
    input({ srcElement: { value } }) {
      if (this.type === 'number') {
        value = parseFloat(value)
      }
      // const toReturn = typeof this.value === 'number' ? parseFloat(value) : value
      this.$emit('update:value', value)
    }
  }
}
</script>

<style scoped lang='scss'>
.my-input {
  flex: 1;
}
</style>

<template>
  <div class="field">
    <label class="label">Pegs</label>
    <div class="control">
      <input class="input" :value='options.length' :min='2' :step='1' @input='updateSize' type='number' placeholder="number of pegs"/>
    </div>
    <div class="control">
      <input class="color-input input" type='color' v-for='(option, index) in options' :value='option' @input='(v) => update(index, v.srcElement.value)' :key='index' />
    </div>
    <p v-if='showError' class="help is-danger">Warning: duplicate colors</p>
  </div>
</template>

<script>
import { randomColor, debounce } from '@/helpers/methods.js'

export default {
  name: 'PegSelect',
  props: {
    options: {
      type: Array,
      rquired: true
    }
  },
  computed: {
    showError () {
      const setOption = new Set(this.options)
      // check for duplicates
      return setOption.size !== this.options.length
    }
  },
  methods: {
    updateSize ({ srcElement: { value } }) {
      if (value) {
        let size = parseInt(value)
        if (size < 2) {
          size = 2
        }
        const options = this.options.slice(0, size)
        while(options.length < size) {
          options.push(randomColor())
        }
        this.$emit('update:options', options)
      }
    },
    update (index, value) {
      const options = this.options.map((v, i) => i === index ? value : v)
      this.$emit('update:options', options)
    }
  },
  created () {
    this.updateSize = debounce(this.updateSize).bind(this)
  }
}
</script>

<style scoped lang="scss">
.color-input {
  width: 100px;
  padding: 2px;
  margin: 5px;
}
</style>

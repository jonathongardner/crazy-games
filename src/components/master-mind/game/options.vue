<template>
  <div class='options'>
    <code-peg v-for='(option, index) in options' :codePeg='option' :key='index' />
  </div>
</template>

<script>
import CodePeg from './code-peg.vue'
export default {
  name: 'Options',
  components: { CodePeg },
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.options {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  //justify-content: space-between;
}
</style>

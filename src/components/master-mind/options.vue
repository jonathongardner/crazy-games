<template>
  <div class='options'>
    <opt v-for='(option, index) in options' :piece='option' :key='index' />
  </div>
</template>

<script>
import Opt from './option.vue'
export default {
  name: 'Options',
  components: { Opt },
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
  //justify-content: space-between;
}
</style>

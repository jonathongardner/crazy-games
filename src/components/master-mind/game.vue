<template>
  <div class='game'>
    <div class='sides' />
    <options class='sides' :options='options' />
    <round :choices='4' :editable='true' />
  </div>
</template>

<script>
import Options from './options.vue'
import Round from './round.vue'

export default {
  name: 'Game',
  components: { Options, Round },
  data () {
    return {
      options: [
        { color: '#5cabff' },
        { color: '#42f5e0' },
        { color: '#fcba03' },
        { color: '#60f542' },
        { color: '#c77b7d' },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.game {
  display: flex;
  flex-direction: row;
}
.sides {
  width: 150px;
}
</style>

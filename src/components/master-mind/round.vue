<template>
  <div class='options'>
    <template v-for='(pick, index) in picks' :key='index'>
      <pick :pick='pick' @update:pick='update' :editable='true'/>
    </template>
  </div>
</template>

<script>
import Pick from './pick.vue'
export default {
  name: 'Round',
  components: { Pick },
  props: {
    choices: {
      type: Number,
      required: true
    },
    editable: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      picks: Array.from(Array(this.choices)).map((_, id) => ({ id, piece: {} }))
    }
  },
  methods: {
    update (pick) {
      this.picks = this.picks.filter(p => p.id === pick.id ? pick : p)
    },
  }
}
</script>

<style scoped lang="scss">
.options {
  display: flex;
}
</style>

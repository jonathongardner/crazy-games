<template>
  <div class="round">
    <template v-for='(c, index) in turn.correct' :key='index'>
      <key-peg :value='c' />
    </template>
    <template v-for='pick in turn.userPick' :key='pick.id'>
      <code-peg v-model:codePeg='pick.codePeg' :editable='editable' />
    </template>
    <button class="button is-rounded is-outlined" type='button' @click='submit' :disabled='!canSubmit'>
      <span class="icon is-small">
        <i v-if='editable' class="fas fa-check"></i>
      </span>
    </button>
  </div>
</template>

<script>
import KeyPeg from './key-peg.vue'
import CodePeg from './code-peg.vue'

export default {
  name: 'Turn',
  components: { CodePeg, KeyPeg },
  props: {
    turn: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    canSubmit () {
      return this.editable && this.turn.userPick.every(d => d.codePeg)
    },
  },
  methods: {
    submit () {
      if (this.canSubmit) {
        this.$emit('submit')
      }
    }
  },
}
</script>

<style scoped lang="scss">
.round {
  display: flex;
  padding: 5px;
  justify-content: center;
}
</style>

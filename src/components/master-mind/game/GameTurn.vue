<script setup lang="ts">
import { computed } from 'vue'

import type { TurnState } from '@/types/mastermind'

import CodePeg from './CodePeg.vue'
import KeyPeg from './KeyPeg.vue'

const props = defineProps<{ turn: TurnState; editable: boolean }>()
const emit = defineEmits<{ submit: [] }>()
const canSubmit = computed(
  () => props.editable && props.turn.userPick.every((pick) => Boolean(pick.codePeg)),
)

function submit(): void {
  if (canSubmit.value) emit('submit')
}
</script>

<template>
  <div class="round">
    <KeyPeg v-for="(result, index) in turn.correct" :key="`key-${index}`" :value="result" />
    <CodePeg
      v-for="pick in turn.userPick"
      :key="pick.id"
      v-model:code-peg="pick.codePeg"
      :editable="editable"
    />
    <button
      class="button is-rounded is-outlined"
      type="button"
      :disabled="!canSubmit"
      aria-label="Submit guess"
      @click="submit"
    >
      <span class="icon is-small" aria-hidden="true">
        <i v-if="editable" class="fas fa-check"></i>
      </span>
    </button>
  </div>
</template>

<style scoped>
.round {
  display: flex;
  justify-content: center;
  padding: 5px;
}
</style>

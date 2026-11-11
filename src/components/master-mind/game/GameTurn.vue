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
  <div class="round" :class="{ 'is-active': editable }">
    <div class="key-pegs">
      <KeyPeg v-for="(result, index) in turn.correct" :key="`key-${index}`" :value="result" />
    </div>
    <div class="code-pegs">
      <CodePeg
        v-for="pick in turn.userPick"
        :key="pick.id"
        v-model:code-peg="pick.codePeg"
        :editable="editable"
      />
    </div>
    <button
      class="submit-guess"
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
  display: grid;
  grid-template-columns: minmax(3rem, 0.7fr) minmax(8rem, 2fr) 2.7rem;
  gap: 0.5rem;
  align-items: center;
  min-height: 3.55rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid transparent;
  border-radius: 0.9rem;
  opacity: 0.55;
  transition: 160ms ease;
}

.round.is-active {
  border-color: rgb(45 212 191 / 25%);
  background: rgb(45 212 191 / 6%);
  box-shadow: inset 3px 0 var(--accent-teal);
  opacity: 1;
}

.key-pegs,
.code-pegs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.submit-guess {
  display: grid;
  width: 2.4rem;
  height: 2.4rem;
  place-items: center;
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  color: #6e7c96;
  background: rgb(255 255 255 / 4%);
  cursor: pointer;
  transition: 160ms ease;
}

.submit-guess:not(:disabled) {
  border-color: transparent;
  color: #07121f;
  background: var(--accent-teal);
  box-shadow: 0 0.5rem 1.2rem rgb(45 212 191 / 22%);
}

.submit-guess:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

@media (max-width: 520px) {
  .round {
    grid-template-columns: minmax(2rem, 0.5fr) minmax(7rem, 2fr) 2.4rem;
    gap: 0.2rem;
    padding-inline: 0.25rem;
  }
}
</style>

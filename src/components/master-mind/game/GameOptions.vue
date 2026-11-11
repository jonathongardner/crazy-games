<script setup lang="ts">
import CodePeg from './CodePeg.vue'

defineProps<{ options: string[] }>()
</script>

<template>
  <div class="options" aria-label="Available pegs">
    <CodePeg v-for="(option, index) in options" :key="index" :code-peg="option" />
  </div>
</template>

<style scoped>
.options {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  padding: 0.55rem;
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
  background: rgb(4 9 22 / 35%);
}

@media (max-width: 660px) {
  .options {
    flex-flow: row wrap;
  }
}
</style>

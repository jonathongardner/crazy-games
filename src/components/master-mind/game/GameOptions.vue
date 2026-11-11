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
}
</style>

<script setup lang="ts">
import { computed } from 'vue'

import type { ComparisonResult } from '@/types/mastermind'

const props = withDefaults(defineProps<{ value?: ComparisonResult }>(), { value: 0 })
const title = computed(() => {
  if (props.value === 1) return 'Right peg color, wrong place'
  if (props.value === 2) return 'Right peg color, right place'
  return ''
})
const cssStyle = computed(() => {
  const color = props.value === 1 ? '#fb7185' : props.value === 2 ? '#ffffff' : '#303b54'
  return { background: `radial-gradient(circle at 5px 5px, ${color}, #000)` }
})
</script>

<template>
  <figure class="sphere" :style="cssStyle" :title="title"></figure>
</template>

<style scoped>
.sphere {
  width: 0.72rem;
  height: 0.72rem;
  margin: 0.18rem;
  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 50%;
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 35%);
}
</style>

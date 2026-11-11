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
  const color = props.value === 1 ? 'red' : props.value === 2 ? 'white' : '#565656'
  return { background: `radial-gradient(circle at 5px 5px, ${color}, #000)` }
})
</script>

<template>
  <figure class="sphere" :style="cssStyle" :title="title"></figure>
</template>

<style scoped>
.sphere {
  width: 16px;
  height: 16px;
  margin: 12px 5px;
  border-radius: 50%;
  transform: translate(0, 0);
}
</style>

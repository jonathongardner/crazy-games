<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ codePeg: string; editable?: boolean }>(), {
  editable: true,
})
const emit = defineEmits<{ 'update:codePeg': [value: string] }>()
const cssStyle = computed(() => {
  const color = props.codePeg || '#565656'
  return { background: `radial-gradient(circle at 10px 10px, ${color}, #000)` }
})

function drop(event: DragEvent): void {
  if (!props.editable) return
  emit('update:codePeg', event.dataTransfer?.getData('codePeg') ?? '')
}

function drag(event: DragEvent): void {
  if (!event.dataTransfer) return
  event.dataTransfer.dropEffect = 'copy'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('codePeg', props.codePeg)
}

function dragEnd(): void {
  if (props.editable) emit('update:codePeg', '')
}
</script>

<template>
  <figure
    class="sphere"
    :style="cssStyle"
    :draggable="editable"
    :aria-label="codePeg ? `Peg ${codePeg}` : 'Empty peg'"
    @drop="drop"
    @dragenter.prevent
    @dragover.prevent
    @dragend="dragEnd"
    @dragstart="drag"
  ></figure>
</template>

<style scoped>
.sphere {
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 50%;
  transform: translate(0, 0);
}
</style>

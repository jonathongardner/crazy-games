<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ codePeg: string; editable?: boolean }>(), {
  editable: true,
})
const emit = defineEmits<{ 'update:codePeg': [value: string] }>()
const cssStyle = computed(() => {
  const color = props.codePeg || '#33405a'
  return {
    '--peg-color': color,
    background: `radial-gradient(circle at 32% 28%, color-mix(in srgb, ${color}, white 36%), ${color} 45%, color-mix(in srgb, ${color}, black 55%))`,
  }
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
  width: clamp(1.75rem, 5vw, 2.35rem);
  height: clamp(1.75rem, 5vw, 2.35rem);
  margin: 0.24rem;
  border: 2px solid rgb(255 255 255 / 13%);
  border-radius: 50%;
  box-shadow: inset -0.3rem -0.4rem 0.7rem rgb(0 0 0 / 32%), 0 0.3rem 0.65rem rgb(0 0 0 / 30%);
  cursor: grab;
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.sphere:hover[draggable="true"] {
  box-shadow: inset -0.3rem -0.4rem 0.7rem rgb(0 0 0 / 24%), 0 0.55rem 1rem rgb(0 0 0 / 34%);
  transform: translateY(-2px) scale(1.04);
}

.sphere:active {
  cursor: grabbing;
}
</style>

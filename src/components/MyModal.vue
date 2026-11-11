<script setup lang="ts">
withDefaults(defineProps<{ show?: boolean }>(), { show: true })

const emit = defineEmits<{
  click: []
  close: []
  'update:show': [value: boolean]
}>()

function closeModal(): void {
  emit('close')
  emit('update:show', false)
}
</script>

<template>
  <div class="modal" :class="{ 'is-active': show }" @click.stop="emit('click')">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card" role="dialog" aria-modal="true">
      <header class="modal-card-head">
        <slot name="header" />
        <button class="delete" aria-label="Close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body has-text-black"><slot name="section" /></section>
      <footer class="modal-card-foot my-footer"><slot name="footer" /></footer>
    </div>
  </div>
</template>

<style scoped>
.my-footer {
  justify-content: flex-end;
}
</style>

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
.modal-background {
  background: rgb(3 7 18 / 78%);
  backdrop-filter: blur(8px);
}

.modal-card {
  width: min(calc(100% - 2rem), 38rem);
  max-height: calc(100vh - 2rem);
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 1.35rem;
  box-shadow: 0 2.5rem 7rem rgb(0 0 0 / 55%);
}

.modal-card-head {
  border-bottom: 1px solid #e5e9f0;
  background: #f7f9fc;
}

.modal-card-body {
  padding: clamp(1.25rem, 4vw, 2rem);
  background: white;
}

.modal-card-foot {
  border-top: 1px solid #e5e9f0;
  background: #f7f9fc;
}

.modal-card :deep(.modal-card-title) {
  color: #17213a;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.modal-card :deep(.content h1) {
  color: #17213a;
  font-size: 1.15rem;
}

.modal-card :deep(.content p) {
  color: #53617a;
  line-height: 1.75;
}

.my-footer {
  justify-content: flex-end;
}

@media (max-width: 520px) {
  .modal-card-foot :deep(.field) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }

  .modal-card-foot :deep(.control:first-child) {
    grid-column: 1 / -1;
  }

  .modal-card-foot :deep(.button) {
    width: 100%;
  }
}
</style>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

function dismiss(): void {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <aside v-if="offlineReady || needRefresh" class="pwa-prompt notification" role="status">
    <p>{{ needRefresh ? 'A new version is ready.' : 'Crazy Games is ready to work offline.' }}</p>
    <div class="buttons">
      <button v-if="needRefresh" class="button is-small is-link" @click="updateServiceWorker(true)">
        Refresh
      </button>
      <button class="button is-small" @click="dismiss">{{ needRefresh ? 'Later' : 'OK' }}</button>
    </div>
  </aside>
</template>

<style scoped>
.pwa-prompt {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 50;
  max-width: 22rem;
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
  color: white;
  background: rgb(21 29 53 / 94%);
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 38%);
  backdrop-filter: blur(18px);
}

.buttons {
  margin-top: 0.75rem;
  margin-bottom: 0;
}
</style>

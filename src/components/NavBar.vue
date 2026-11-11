<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed(() => route.name === 'home')
const parentRoute = computed(() => String(route.name ?? '').split('.')[0] ?? '')
const settingsRoute = computed(() => `${parentRoute.value}.settings`)
const aboutRoute = computed(() => `${parentRoute.value}.about`)
</script>

<template>
  <nav class="nav" aria-label="Primary navigation">
    <RouterLink
      :to="{ name: 'home' }"
      class="nav-button"
      :style="{ visibility: isHome ? 'hidden' : undefined }"
      aria-label="Home"
    >
      <span class="icon has-text-white" aria-hidden="true"><i class="fas fa-home"></i></span>
    </RouterLink>
    <RouterLink
      v-if="route.meta.settings"
      :to="{ name: settingsRoute }"
      class="nav-button is-pulled-right"
      aria-label="Settings"
    >
      <span class="icon has-text-white" aria-hidden="true"><i class="fas fa-cog"></i></span>
    </RouterLink>
    <RouterLink
      v-if="route.meta.about"
      :to="{ name: aboutRoute }"
      class="nav-button is-pulled-right"
      aria-label="About this game"
    >
      <span class="icon has-text-white" aria-hidden="true"><i class="fas fa-question"></i></span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.nav-button {
  margin: 5px;
}
</style>

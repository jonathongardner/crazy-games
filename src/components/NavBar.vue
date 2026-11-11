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
    <RouterLink :to="{ name: 'home' }" class="brand" aria-label="Crazy Games home">
      <span class="brand-mark" aria-hidden="true"><i class="fas fa-dice-d20"></i></span>
      <span><strong>Crazy</strong> Games</span>
    </RouterLink>
    <div class="nav-actions">
      <RouterLink
        v-if="!isHome"
        :to="{ name: 'home' }"
        class="nav-button"
        aria-label="Home"
      >
        <span class="icon" aria-hidden="true"><i class="fas fa-home"></i></span>
      </RouterLink>
      <RouterLink
        v-if="route.meta.settings"
        :to="{ name: settingsRoute }"
        class="nav-button"
        aria-label="Settings"
      >
        <span class="icon" aria-hidden="true"><i class="fas fa-sliders"></i></span>
      </RouterLink>
      <RouterLink
        v-if="route.meta.about"
        :to="{ name: aboutRoute }"
        class="nav-button"
        aria-label="About this game"
      >
        <span class="icon" aria-hidden="true"><i class="fas fa-circle-info"></i></span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(100% - 2rem, 74rem);
  min-height: 4.25rem;
  margin: 1rem auto 0;
  padding: 0.55rem 0.65rem 0.55rem 1rem;
  border: 1px solid var(--border-subtle);
  border-radius: 1.1rem;
  background: rgb(10 16 32 / 72%);
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%);
  backdrop-filter: blur(18px);
}

.brand {
  display: inline-flex;
  gap: 0.7rem;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.92rem;
  letter-spacing: 0.04em;
}

.brand strong {
  color: white;
}

.brand-mark {
  display: grid;
  width: 2.2rem;
  height: 2.2rem;
  place-items: center;
  border-radius: 0.7rem;
  color: #08111f;
  background: linear-gradient(135deg, var(--accent-teal), #67e8f9);
  box-shadow: 0 0.5rem 1.4rem rgb(45 212 191 / 24%);
}

.nav-actions {
  display: flex;
  gap: 0.35rem;
}

.nav-button {
  display: grid;
  width: 2.6rem;
  height: 2.6rem;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 0.8rem;
  color: var(--text-secondary);
  transition: 160ms ease;
}

.nav-button:hover,
.nav-button.router-link-active {
  border-color: var(--border-subtle);
  color: white;
  background: var(--surface-soft);
}

@media (max-width: 480px) {
  .nav {
    width: calc(100% - 1rem);
    margin-top: 0.5rem;
  }

  .brand {
    font-size: 0.82rem;
  }
}
</style>

<script setup lang="ts">
import FooterBar from '@/components/FooterBar.vue'
import NavBar from '@/components/NavBar.vue'
import PwaPrompt from '@/components/PwaPrompt.vue'
</script>

<template>
  <div id="crazy-games">
    <NavBar id="nav" />
    <main id="body"><RouterView /></main>
    <FooterBar id="footer" />
    <PwaPrompt />
  </div>
</template>

<style lang="scss">
#crazy-games {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  color: var(--text-primary);
  background:
    radial-gradient(circle at 12% 18%, rgb(99 102 241 / 22%), transparent 28rem),
    radial-gradient(circle at 88% 76%, rgb(20 184 166 / 16%), transparent 32rem),
    linear-gradient(145deg, #090d1a 0%, #111831 55%, #0a1020 100%);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  #nav,
  #footer {
    min-height: 50px;
  }

  #body {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: clamp(2rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem);
  }
}

body {
  margin: 0;
  min-width: 320px;
  background: #090d1a;
}

.button-link {
  padding: 0.55rem 0.9rem !important;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  color: var(--text-secondary);
  background: rgb(255 255 255 / 4%) !important;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  transition: 160ms ease;
}

.button-link:hover {
  border-color: var(--accent-teal);
  color: white;
  transform: translateY(-1px);
}
</style>

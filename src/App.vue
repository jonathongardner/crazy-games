<script setup lang="ts">
import FooterBar from '@/components/FooterBar.vue'
import NavBar from '@/components/NavBar.vue'
import PwaPrompt from '@/components/PwaPrompt.vue'
</script>

<template>
  <div id="crazy-games">
    <NavBar id="nav" />
    <RouterView id="body" />
    <FooterBar id="footer" />
    <PwaPrompt />
  </div>
</template>

<style lang="scss">
#crazy-games {
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  color: #dcdcdc;
  background-color: #9dab9e;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  #nav,
  #footer {
    min-height: 50px;
  }

  #body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div {
      margin: 5px;
    }
  }
}

body {
  margin: 0;
}

.button-link {
  padding: 0 !important;
  border: 0;
  color: #069;
  background: none !important;
  font-family: Arial, sans-serif;
  text-decoration: underline;
  cursor: pointer;
}
</style>

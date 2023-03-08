<template>
  <game>
    <router-view />
  </game>
</template>

<script>
import Game from '@/components/choo-choo/game.vue'
export default {
  name: 'ChooChoo',
  components: { Game },
}
</script>

<style lang='scss' scoped>
</style>

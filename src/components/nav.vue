<template>
  <nav class='nav'>
    <router-link :to='{ name: "home" }' class='nav-button' v-hide='isHome'>
      <span class="icon has-text-white">
        <i class="fas fa-home"></i>
      </span>
    </router-link>
    <router-link v-if='hasSettings' :to='{ name: settingsRoute }' class='nav-button is-pulled-right'>
      <span class="icon has-text-white">
        <i class="fas fa-cog"></i>
      </span>
    </router-link>
    <router-link v-if='hasAbout' :to='{ name: aboutRoute }' class='nav-button is-pulled-right'>
      <span class="icon has-text-white">
        <i class="fas fa-question"></i>
      </span>
    </router-link>
    <router-link v-if='hasReload' :to='{ name: parentRoute, params: { reload: true } }' class='nav-button is-pulled-right'>
      <span class="icon has-text-white">
        <i class="fas fa-redo"></i>
      </span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  computed: {
    isHome () {
      return this.$route.name === 'home'
    },
    parentRoute () {
      return this.$route.name.split('.')[0]
    },
    settingsRoute () {
      return `${this.parentRoute}.settings`
    },
    aboutRoute () {
      return `${this.parentRoute}.about`
    },
    hasReload () {
      return this.$route.meta.reload
    },
    hasSettings () {
      return this.$route.meta.settings
    },
    hasAbout () {
      return this.$route.meta.about
    },
  },
}
</script>

<style scoped lang="scss">
.nav-button {
  margin: 5px;
}
</style>

<template>
  <footer class='has-text-centered has-text-white'>
    <a href='https://github.com/jonathongardner/crazy-games'>
      <span class='icon'>
        <i class="fab fa-github"></i>
      </span>
      Source
    </a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    notHome () {
      return this.$route.name !== 'home'
    },
  },
}
</script>

<style scoped lang="scss">
</style>

<template>
  <div>
    <div>
      <router-link :to='{ name: "master-mind" }' class="button">
        <span class="icon">
          <i class="fas fa-brain"></i>
        </span>
        <span>Master Mind</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang='scss' scoped>
</style>

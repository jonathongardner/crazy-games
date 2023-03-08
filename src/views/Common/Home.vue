<template>
  <div class='home'>
    <div>
      <router-link :to='{ name: "master-mind" }' class="button">
        <span class="icon">
          <i class="fas fa-brain"></i>
        </span>
        <span>Master Mind</span>
      </router-link>
    </div>
    <div>
      <router-link :to='{ name: "choo-choo" }' class="button">
        <span class="icon">
          <i class="fas fa-train"></i>
        </span>
        <span>ChooChoo</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang='scss'>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    margin: 5px;
  }
}
</style>

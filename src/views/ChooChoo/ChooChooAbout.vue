<template>
  <my-modal @close='close'>
    <template v-slot:header>
      <p class="modal-card-title">About Mastermind</p>
    </template>
    <template v-slot:section>
      <div class='content'>
        <h1>How to play</h1>
        <p class='htp'>
          You are driving a train...
        </p>
        <h1>Settings</h1>
        <p>
          Default options to easy? Try leveling up to not run it to things.
          <router-link :to="{ name: 'choo-choo.settings' }">settings</router-link>.
        </p>
        <h1>Credit</h1>
        <p>
          Images from <a href="https://github.com/gcompris/GCompris-gtk">GCompris</a>
        </p>
      </div>
    </template>
  </my-modal>
</template>

<script>
import MyModal from '@/components/my-modal'
export default {
  name: 'ChooChooAbout',
  components: { MyModal },
  methods: {
    close () {
      // json save
      this.$router.push({ name: 'choo-choo' })
    }
  }
}
</script>

<style lang='scss' scoped>
.htp {
  text-indent: 10px;
}
</style>

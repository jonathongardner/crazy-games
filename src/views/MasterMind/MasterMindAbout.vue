<template>
  <my-modal @close='close'>
    <template v-slot:header>
      <p class="modal-card-title">About Mastermind</p>
    </template>
    <template v-slot:section>
      <div class='content'>
        <h1>How to play</h1>
        <p class='htp'>
          You are trying to break the computers code.

          The computer will generate a {{ numberOfSlots }} color code (same colors
          can be used more than once) from the {{ numberOfPegs }} pegs. You have
          {{ numberOfRows }} tries to figure out the code.

          After you submit each guess, the computer will fill in the smaller pegs
          on the left with how many pegs are the right color and right place
          (white pegs) and right color wrong place (red pegs)
        </p>
        <h1>Settings</h1>
        <p>
          Default options to easy? Try adding more pegs or making the code longer
          <router-link :to="{ name: 'master-mind.settings' }">settings</router-link>.
        </p>
        <h1>More Info</h1>
        <p>
          For more info visit <a href='https://en.wikipedia.org/wiki/Mastermind_(board_game)' target='blank'>wikipedia</a>
        </p>
      </div>
    </template>
  </my-modal>
</template>

<script>
import { loadMasterMind } from '@/helpers/settings.js'

import MyModal from '@/components/my-modal'
export default {
  name: 'MasterMindSettings',
  components: { MyModal },
  data: loadMasterMind,
  computed: {
    numberOfPegs () {
      return this.options.length
    }
  },
  methods: {
    close () {
      // json save
      this.$router.push({ name: 'master-mind' })
    }
  }
}
</script>

<style lang='scss' scoped>
.htp {
  text-indent: 10px;
}
</style>

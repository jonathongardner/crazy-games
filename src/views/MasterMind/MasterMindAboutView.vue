<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import MyModal from '@/components/MyModal.vue'
import { loadMasterMind } from '@/helpers/settings'

const router = useRouter()
const settings = loadMasterMind()
const numberOfPegs = computed(() => settings.options.length)

function close(): void {
  void router.push({ name: 'master-mind' })
}
</script>

<template>
  <MyModal @close="close">
    <template #header><p class="modal-card-title">About Mastermind</p></template>
    <template #section>
      <div class="content">
        <h1>How to play</h1>
        <p class="htp">
          You are trying to break the computer's code. The computer will generate a
          {{ settings.numberOfSlots }} color code (colors can be used more than once) from the
          {{ numberOfPegs }} pegs. You have {{ settings.numberOfRows }} tries to figure it out.
          After each guess, white pegs indicate the right color in the right place and red pegs
          indicate the right color in the wrong place.
        </p>
        <h1>Settings</h1>
        <p>
          Too easy? Try adding more pegs or making the code longer in
          <RouterLink :to="{ name: 'master-mind.settings' }">settings</RouterLink>.
        </p>
        <h1>More Info</h1>
        <p>
          Visit
          <a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)" target="_blank" rel="noopener">
            Wikipedia
          </a>.
        </p>
      </div>
    </template>
  </MyModal>
</template>

<style scoped>
.htp {
  text-indent: 10px;
}
</style>

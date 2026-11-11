<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

import { compare } from '@/helpers/compare'
import { array } from '@/helpers/methods'
import { loadMasterMind } from '@/helpers/settings'
import type { TurnState } from '@/types/mastermind'

import CodePeg from './game/CodePeg.vue'
import GameOptions from './game/GameOptions.vue'
import GameTurn from './game/GameTurn.vue'

interface GameState {
  options: string[]
  code: string[]
  turns: TurnState[]
  brokeTheCode: boolean
  turn: number
}

function createGameState(): GameState {
  const { options, numberOfSlots, numberOfRows } = loadMasterMind()
  const code = array(numberOfSlots, () => options[Math.floor(Math.random() * options.length)]!)
  const turns = array<TurnState>(numberOfRows, () => ({
    userPick: array(code.length, (id) => ({ id, codePeg: '' })),
    correct: array(code.length, () => 0),
  }))

  return { options, code, turns, brokeTheCode: false, turn: 0 }
}

const route = useRoute()
const game = reactive<GameState>(createGameState())
const finished = computed(() => game.turn >= game.turns.length)

function editable(index: number): boolean {
  return index === game.turn
}

function submit(): void {
  const currentTurn = game.turns[game.turn]
  if (!currentTurn) return

  currentTurn.correct = compare(
    game.code,
    currentTurn.userPick.map((pick) => pick.codePeg),
  )

  if (currentTurn.correct.every((result) => result === 2)) {
    game.turn = game.turns.length
    game.brokeTheCode = true
  } else {
    game.turn += 1
  }
}

function restart(): void {
  Object.assign(game, createGameState())
}

watch(
  () => route.query.reload,
  (reload, previousReload) => {
    if (reload && reload !== previousReload) restart()
  },
)
</script>

<template>
  <div id="master-mind">
    <p class="title has-text-centered">Mastermind!</p>
    <div v-if="finished">
      <p class="subtitle has-text-centered">
        {{ game.brokeTheCode ? 'You Broke the Code!' : 'Sorry, try again.' }}
      </p>
      <div id="code">
        <CodePeg v-for="(peg, index) in game.code" :key="index" :code-peg="peg" :editable="false" />
      </div>
    </div>
    <div id="game">
      <GameOptions :options="game.options" />
      <div id="decoding-board">
        <GameTurn
          v-for="(gameTurn, index) in game.turns"
          :key="index"
          :turn="gameTurn"
          :editable="editable(index)"
          @submit="submit"
        />
      </div>
    </div>
    <button id="restart" class="button-link" @click="restart">Restart</button>
  </div>
</template>

<style scoped>
#master-mind {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#game {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
  border: 2px solid black;
  border-radius: 5px;
}

#decoding-board {
  display: flex;
  flex-direction: column-reverse;
}

#code {
  display: flex;
  justify-content: center;
}

#restart {
  flex: 1;
  align-self: flex-end;
}
</style>

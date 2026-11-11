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
    <header class="game-header">
      <div>
        <p class="game-kicker">Codebreaker protocol</p>
        <h1>Mastermind</h1>
      </div>
      <div class="turn-counter">
        <span>Round</span>
        <strong>{{ Math.min(game.turn + 1, game.turns.length) }}</strong>
        <small>/ {{ game.turns.length }}</small>
      </div>
    </header>
    <div v-if="finished" class="result-banner" :class="{ success: game.brokeTheCode }">
      <span class="result-icon"><i :class="game.brokeTheCode ? 'fas fa-trophy' : 'fas fa-rotate-right'"></i></span>
      <div>
        <strong>{{ game.brokeTheCode ? 'Code cracked!' : 'The code held.' }}</strong>
        <p>{{ game.brokeTheCode ? 'Sharp thinking, codebreaker.' : 'Study the pattern and try again.' }}</p>
      </div>
      <div id="code" aria-label="Secret code">
        <CodePeg v-for="(peg, index) in game.code" :key="index" :code-peg="peg" :editable="false" />
      </div>
    </div>
    <div id="game">
      <aside class="palette-panel">
        <span class="panel-label">Color bank</span>
        <GameOptions :options="game.options" />
        <p>Drag a color into the active row.</p>
      </aside>
      <section class="board-panel">
        <div class="board-heading">
          <span class="panel-label">Decoding board</span>
          <span><i></i> Active guess</span>
        </div>
        <div id="decoding-board">
          <GameTurn
            v-for="(gameTurn, index) in game.turns"
            :key="index"
            :turn="gameTurn"
            :editable="editable(index)"
            @submit="submit"
          />
        </div>
      </section>
    </div>
    <div class="game-footer">
      <div class="legend">
        <span><i class="key exact"></i> Right place</span>
        <span><i class="key close"></i> Wrong place</span>
      </div>
      <button id="restart" class="button-link" @click="restart"><i class="fas fa-rotate-right"></i> Restart</button>
    </div>
  </div>
</template>

<style scoped>
#master-mind {
  display: flex;
  width: min(100%, 59rem);
  flex-direction: column;
  justify-content: center;
}

.game-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.game-kicker,
.panel-label {
  margin: 0 0 0.35rem;
  color: var(--accent-teal);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: white;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 0.95;
}

.turn-counter {
  display: flex;
  align-items: baseline;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.9rem;
  color: #76859f;
  background: rgb(255 255 255 / 4%);
}

.turn-counter span {
  margin-right: 0.6rem;
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.turn-counter strong {
  color: white;
  font-size: 1.25rem;
}

.turn-counter small {
  margin-left: 0.2rem;
}

.result-banner {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem 1.15rem;
  border: 1px solid rgb(251 191 36 / 30%);
  border-radius: 1rem;
  background: rgb(251 191 36 / 8%);
}

.result-banner.success {
  border-color: rgb(45 212 191 / 32%);
  background: rgb(45 212 191 / 9%);
}

.result-icon {
  display: grid;
  width: 2.7rem;
  height: 2.7rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 0.8rem;
  color: #111827;
  background: var(--accent-gold);
}

.success .result-icon {
  background: var(--accent-teal);
}

.result-banner strong {
  color: white;
}

.result-banner p {
  margin: 0.12rem 0 0;
  color: var(--text-secondary);
  font-size: 0.8rem;
}

#game {
  display: grid;
  grid-template-columns: 8.5rem minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: 1.6rem;
  background: linear-gradient(145deg, rgb(28 38 68 / 96%), rgb(15 22 41 / 96%));
  box-shadow: 0 2.2rem 6rem rgb(0 0 0 / 34%);
}

.palette-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.35rem 1rem;
  border-right: 1px solid var(--border-subtle);
  background: rgb(255 255 255 / 3%);
}

.palette-panel p {
  margin: 1rem 0 0;
  color: #73829c;
  font-size: 0.67rem;
  line-height: 1.5;
  text-align: center;
}

.board-panel {
  min-width: 0;
  padding: 1.35rem;
}

.board-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.board-heading > span:last-child {
  color: #7786a1;
  font-size: 0.67rem;
}

.board-heading > span:last-child i {
  display: inline-block;
  width: 0.45rem;
  height: 0.45rem;
  margin-right: 0.3rem;
  border-radius: 50%;
  background: var(--accent-teal);
  box-shadow: 0 0 0.7rem var(--accent-teal);
}

#decoding-board {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.35rem;
}

#code {
  display: flex;
  flex: 1;
  justify-content: center;
  margin-left: auto;
}

.game-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}

.legend {
  display: flex;
  gap: 1rem;
  color: #75839d;
  font-size: 0.7rem;
}

.legend span {
  display: flex;
  gap: 0.35rem;
  align-items: center;
}

.key {
  display: inline-block;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
}

.key.exact { background: white; }
.key.close { background: #fb7185; }

#restart i {
  margin-right: 0.3rem;
}

@media (max-width: 660px) {
  #master-mind {
    width: 100%;
  }

  #game {
    grid-template-columns: 1fr;
  }

  .palette-panel {
    align-items: stretch;
    border-right: 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .palette-panel p {
    display: none;
  }

  .board-panel {
    padding: 1rem 0.65rem;
  }

  .result-banner {
    flex-wrap: wrap;
  }

  #code {
    width: 100%;
    margin: 0;
  }
}

@media (max-width: 430px) {
  .game-header {
    align-items: center;
  }

  .turn-counter span {
    display: none;
  }

  .game-footer {
    align-items: flex-end;
  }

  .legend {
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style>

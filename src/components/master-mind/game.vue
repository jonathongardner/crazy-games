<template>
  <div id='master-mind'>
    <p class='title has-text-centered'>Mastermind!</p>
    <div v-if='finished'>
      <p class='subtitle has-text-centered'>
        {{ brokeTheCode ? 'You Broke the Code!' : 'Sorry, try again.' }}
      </p>
      <div id='code'>
        <template v-for='(peg, index) in code' :key='index'>
          <code-peg :codePeg='peg' />
        </template>
      </div>
    </div>
    <div id='game'>
      <options :options='options' />
      <div id='decoding-board'>
        <turn v-for='(turn, index) in turns' :key='index' :turn='turn' :editable='editable(index)' @submit='submit'/>
      </div>
    </div>
    <button id='restart' @click='restart' class="button-link">
      Restart
    </button>
  </div>
</template>

<script>
import Options from './game/options.vue'
import Turn from './game/turn.vue'
import CodePeg from './game/code-peg.vue'
import { loadMasterMind } from '@/helpers/settings.js'
import { array } from '@/helpers/methods.js'
import { compare } from '@/helpers/compare.js'

const defaultData = () => {
  const { options, numberOfSlots, numberOfRows } = loadMasterMind()

  const code = array(numberOfSlots, () => {
    return options[Math.floor(Math.random() * options.length)]
  })
  // console.log(code)

  const turns = array(numberOfRows, () => {
    return {
      userPick: array(code.length, (id) => ({ id, codePeg: '' })),
      correct: array(code.length, () => 0)
    }
  })
  return {
    options,
    code,
    turns,
    brokeTheCode: false,
    turn: 0,
  }
}

export default {
  name: 'Game',
  components: { Options, Turn, CodePeg },
  data: defaultData,
  computed: {
    finished () {
      return this.turn >= this.turns.length
    },
  },
  methods: {
    editable (index) {
      return index === this.turn
    },
    submit () {
      this.turns[this.turn].correct = compare(this.code, this.turns[this.turn].userPick.map(p => p.codePeg))
      if (this.turns[this.turn].correct.every(c => c === 2)) {
        this.turn = this.turns.length
        this.brokeTheCode = true
      } else {
        this.turn = this.turn + 1
      }
    },
    restart () {
      Object.assign(this, defaultData())
    }
  },
  watch: {
    $route(to) {
      if (to.params.reload) {
        this.restart()
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
  border-width: 2px;
  border-radius: 5px;
  padding: 7px;
  border-color: black;
  border-style: solid;
}
#decoding-board {
  display: flex;
  flex-direction: column-reverse;
}
.sides {
  width: 150px;
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

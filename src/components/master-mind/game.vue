<template>
  <div>
    <about />
    <div id='game'>
      <options :options='options' />
      <div id='decoding-board'>
        <turn v-for='(turn, index) in turns' :key='index' :turn='turn' :editable='editable(index)' @submit='submit'/>
        <div v-if='finished'>
          <h1 class='title has-text-centered'>
            {{ brokeTheCode ? 'You Broke the Code!' : 'Sorry, try again.' }}
          </h1>
          <div id='code'>
            <template v-for='(peg, index) in code' :key='index'>
              <code-peg :codePeg='peg' />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import About from './about.vue'
import Options from './game/options.vue'
import Turn from './game/turn.vue'
import CodePeg from './game/code-peg.vue'
import { loadMasterMind } from '@/helpers/settings.js'
import { array } from '@/helpers/methods.js'
import { compare } from '@/helpers/compare.js'

export default {
  name: 'Game',
  components: { About, Options, Turn, CodePeg },
  data () {
    const { options, numberOfSlots, numberOfRows } = loadMasterMind()

    const code = array(numberOfSlots, () => {
      return options[Math.floor(Math.random() * options.length)]
    })
    console.log(code)

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
  },
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
    }
  }
}
</script>

<style scoped lang="scss">
#game {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
</style>

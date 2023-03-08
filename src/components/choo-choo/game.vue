<template>
  <div class='choo-choo'>
    <template v-for='(ti, index) in trainInfo' :key='index'>
      <train :train='ti' :direction='direction' />
    </template>
    <slot default />
  </div>
</template>

<script>
import Train from './game/train'

export default {
  name: 'Game',
  components: { Train },
  data() {
    return {
      direction: 'right',
      trainInfo: [
        { top: 0, left: 0 },
      ],
      intervalID: null
    }
  },
  methods: {
    keypressed(e) {
      switch(e.key) {
        case 'ArrowLeft':
          this.direction = 'left'
          break
        case 'ArrowUp':
          this.direction = 'up'
          break
        case 'ArrowRight':
          this.direction = 'right'
          break
        case 'ArrowDown':
          this.direction = 'down'
          break
        default:
          console.log(e.key)
      }
    },
    move(train) {
      const toReturn = {...train}
      switch(this.direction) {
        case 'left':
          toReturn.left = toReturn.left - 0.25
          break
        case 'up':
          toReturn.top = toReturn.top - 0.25
          break
        case 'right':
          toReturn.left = toReturn.left + 0.25
          break
        case 'down':
          toReturn.top = toReturn.top + 0.25
          break
      }

      return toReturn
    },
    moveAll () {
      this.trainInfo = this.trainInfo.map((train) => {
        return this.move(train)
      })
    },
  },
  watch: {
    $route(to) {
      if (to.params.reload) {
        this.restart()
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.keypressed)
    this.intervalID = window.setInterval(this.moveAll, 100);
  },
}
</script>

<style lang="scss">
.choo-choo {
  background-color: #c5c5c5;
  margin: 10px;
  border: 2px;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  position: relative;
}
</style>

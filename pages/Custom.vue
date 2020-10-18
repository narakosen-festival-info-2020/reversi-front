<template>
  <div class="main">
    <table>
      <tr v-for="(stateA,y) of boardData" :key="y">
        <td v-for="(stateB,x) of stateA" :key="`${x}-${y}`" :class="boardDataClass[y][x]" @click="bClick(y,x)">
          <!-- {{ boardData[y][x] }} -->
        </td>
      </tr>
    </table>
    <button class="center" @click="gameStart">
      Game Start
    </button>
  </div>
</template>

<script>
export default {
  name: 'Custom',
  data () {
    return {
      boardData: [],
      boardDataClass: [],
      height: 20,
      width: 20
    }
  },
  mounted () {
    const bd = []
    const bdc = []
    for (let i = 0; i < 20; i++) {
      bd[i] = []
      bdc[i] = []
      for (let l = 0; l < 20; l++) {
        bd[i][l] = -1
        bdc[i][l] = 'not-use'
      }
    }
    this.boardData = [...bd]
    this.boardDataClass = [...bdc]
  },
  methods: {
    bClick (y, x) {
      let bdState = this.boardData[y][x]
      if (bdState !== 2) {
        bdState++
      } else {
        bdState = -1
      }
      this.boardData[y].splice(x, 1, bdState)
      this.changeClass(y, x, bdState)
    },
    changeClass (y, x, s) {
      let changedClass = ''
      switch (s) {
        case -1:
          changedClass = 'not-use'
          break
        case 0:
          changedClass = 'use'
          break
        case 1:
          changedClass = 'black-use'
          break
        case 2:
          changedClass = 'white-use'
          break
      }
      this.boardDataClass[y].splice(x, 1, changedClass)
    },
    gameStart () {
      this.$store.commit('customSet', [this.height, this.width, this.boardData])
      this.$router.push('/Game')
    }
  }
}
</script>

<style lang='scss' scoped>
  table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background: black;
    border: 1px solid black;
    width: $tablehw;
    height: $tablehw;

    @include tab {
      width: $tablehw-tab;
      height: $tablehw-tab;
    }

    @include sp {
      width: $tablehw-sp;
      height: $tablehw-sp;
    }

    td{
      background: gray;
      &.use{
        background: green;
      }
      &.black-use{
        background: black;
      }
      &.white-use{
        background: white;
      }
    }
  }
</style>

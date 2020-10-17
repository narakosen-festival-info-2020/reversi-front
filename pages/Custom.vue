<template>
  <div class="main">
    <table>
      <tr v-for="(stateA,y) of boardData" :key="y">
        <td v-for="(stateB,x) of stateA" :key="`${x}-${y}`" :class="{boardOn:boardData[y][x]}" @click="bClick(y,x)">
          <!-- {{ boardData[y][x] }} -->
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Custom',
  data () {
    return {
      boardData: []
    }
  },
  mounted () {
    const bd = []
    for (let i = 0; i < 20; i++) {
      bd[i] = []
      for (let l = 0; l < 20; l++) {
        bd[i][l] = false
      }
    }
    this.boardData = [...bd]
  },
  methods: {
    bClick (y, x) {
      this.boardData[y].splice(x, 1, !this.boardData[y][x])
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
      &.boardOn{
        background: green;
      }
    }
  }
</style>

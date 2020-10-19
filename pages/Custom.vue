<template>
  <div class="main">
    <div>
      ルール<br>
      一辺は5マス以上、必ずゲームを始める事ができる
    </div>
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
import Reversi from '../components/reversi'
export default {
  name: 'Custom',
  data () {
    return {
      boardData: [],
      boardDataClass: [],
      reversi: new Reversi([])
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
      console.log(this.boardData)
      const cb = this.cutBoard()
      if (this.boardRule(cb)) {
        this.$store.commit('customSet', [cb.length, cb[0].length, cb])
        this.$router.push('/Game')
      } else {
        alert('ルールを守ってください')
      }
    },
    boardRule (cb) {
      const boolArr = []
      boolArr.push((this.reversi.finishSerch(0, cb) === 1))
      boolArr.push((cb.length >= 5))
      boolArr.push((cb[0].length >= 5))

      // 全体のセルが連結であるか調べるため
      // 全体のセル数を調べ、適当に選んだ一つの連結成分の要素数と一致するか調べる
      let cellExpectedCount = 0
      let cellActualCount = 0
      const stack = []
      const boardSearch = new Array(cb.length)
      for (let i = 0; i < cb.length; i++) {
        boardSearch[i] = new Array(cb[i].length)
        boardSearch[i].fill(0)
        for (let l = 0; l < cb[i].length; l++) {
          if (cb[i][l] !== -1) {
            cellExpectedCount++
            if (stack.length === 0) {
              boardSearch[i][l] = 1
              stack.push({
                y: i,
                x: l
              })
            }
          }
        }
      }
      // dfs実装
      while (stack.length) {
        cellActualCount++
        const top = stack.pop()
        const fy = top.y
        const fx = top.x
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ty = fy + dy
            const tx = fx + dx
            if (ty >= 0 && ty < cb.length && tx >= 0 && tx < cb[ty].length) {
              if (boardSearch[ty][tx] === 0 && cb[ty][tx] !== -1) {
                boardSearch[ty][tx] = 1
                stack.push({
                  y: ty,
                  x: tx
                })
              }
            }
          }
        }
      }
      boolArr.push(cellActualCount === cellExpectedCount)

      console.log(boolArr)
      return boolArr.reduce((a, b) => a && b)
    },
    cutBoard () {
      const cutBoardData = JSON.parse(JSON.stringify(this.boardData))
      let flag = true
      while (flag) {
        for (let i = 0; i < 20; i++) {
          if (cutBoardData[0][i] !== -1) {
            flag = false
            break
          }
        }
        if (flag) {
          cutBoardData.shift()
        }
      }

      flag = true
      while (flag) {
        for (let i = 0; i < 20; i++) {
          if (cutBoardData[cutBoardData.length - 1][i] !== -1) {
            flag = false
            break
          }
        }
        if (flag) {
          cutBoardData.pop()
        }
      }

      flag = true
      while (flag) {
        for (let i = 0; i < cutBoardData.length; i++) {
          if (cutBoardData[i][0] !== -1) {
            flag = false
            break
          }
        }
        if (flag) {
          for (let l = 0; l < cutBoardData.length; l++) {
            cutBoardData[l].shift()
          }
        }
      }

      flag = true
      while (flag) {
        for (let i = 0; i < cutBoardData.length; i++) {
          if (cutBoardData[i][cutBoardData[i].length - 1] !== -1) {
            flag = false
            break
          }
        }
        if (flag) {
          for (let l = 0; l < cutBoardData.length; l++) {
            cutBoardData[l].pop()
          }
        }
      }
      return cutBoardData
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

<template>
  <div class="main">
    <div>{{stateFunc}}</div>
    <table border="1">
      <tr v-for="(stateA,y) of createboard" :key="y">
        <td v-for="(stateB,x) of stateA" :key="x*y">
          <Stone :xPosition=x :yPosition=y :stone=createboard[y][x] @cp="clickPixel">{{ stone(y,x) }}</Stone>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Stone from './Stone.vue'
  import boardPattern from './boardpattern'
  import Reversi from './reversi'

  const boardRandom = 0 // Math.floor(Math.random()*boardPattern.length)
  let board = boardPattern[boardRandom]
  const reversi = new Reversi(board);
  board = reversi.startBoard()
  export default {
    name: 'Main',
    components: {
      Stone
    },
    data() {
      return {
        canSet: [],
        boardData: [...board],
        stateFlag: 0 //black 0, white 1, end 2
      };
    },
    computed: {
      createboard() {
        return this.boardData
      },
      stateFunc() {
        return (this.stateFlag) ? "白の番です" : "黒の番です"
      },
      stone:()=>{
        return function(y,x){
          if(this.boardData[y][x]==1){
            return "●"
          }else if(this.boardData[y][x]==2){
            return "○"
          }
        }
      }
    },
    mounted: () => {},
    methods: {
      clickPixel(x, y) {
        if (reversi.canPutStone(y, x, this.stateFlag)) {
          console.log("aaaaaa")
          this.boardData = reversi.getBoard
          this.stateFlag = (this.stateFlag) ? 0 : 1
        } else {
          console.log("おけないよ")
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .main {
    height: 80vh;
    background-color: lightcoral;
    position: relative;
  }

  table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background: black;

    td {
      width: 50px;
      height: 50px;
      color: red;
    }
  }
</style>
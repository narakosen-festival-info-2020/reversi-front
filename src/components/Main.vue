<template>
  <div class="main">
    <div>{{returnStatus}}</div>
    <div>{{errorText}}</div>
    <table border="1">
      <tr v-for="(stateA,y) of boardData" :key="y">
        <td v-for="(stateB,x) of stateA" :key="x*y">
          <Stone :xPosition=x :yPosition=y :stone=boardData[y][x] @cp="clickPixel" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import axios from "axios"
  import Stone from './Stone.vue'
  import Reversi from './reversi'
  export default {
    name: 'Main',
    components: {
      Stone
    },
    data: function () {
      return {
        reversi: '',
        canSet: [],
        boardData: [],
        stateFlag: 0, //black 0, white 1, end 2
        returnStatus: "",
        errorText: "",
      };
    },
    watch: {
      stateFlag: function () {
        if (this.stateFlag == 2) {
          let blackNum = 0;
          let whiteNum = 0;
          for (let i in this.boardData) {
            for (let l in this.boardData) {
              if (this.boardData[i][l] == 1) {
                blackNum++;
              }
              if (this.boardData[i][l] == 2) {
                whiteNum++;
              }
            }
          }
          let endText;
          if (blackNum == whiteNum) {
            endText = "あいこ"
          } else if (blackNum > whiteNum) {
            endText = "黒の勝ち"
          } else {
            endText = "白の勝ち"
          }
          this.errorText = `黒は${blackNum}個、白は${whiteNum}個で${endText}です`
        }
      }
    },
    computed: {
      // createboard() {
      //   return this.boardData
      // },
      stone: () => {
        return function (y, x) {
          if (this.boardData[y][x] == 1) {
            return "●"
          } else if (this.boardData[y][x] == 2) {
            return "○"
          }
        }
      }
    },
    mounted: function () {
      let self = this
      axios.post(
          "/api/generate", {
            "board_type": "normal"
          })
        .then(response => {
          axios.get('/api/reversi/state', {
            headers: {
              Authorization: `Bearer ${response.data.specific_code}`,
            }
          }).then(res => {
            self.boardData = res.data.board
            this.reversi = new Reversi(self.boardData)
          })
        }).catch(e=>{
          console.log(e)
        })
      this.stateFunc()
    },
    methods: {
      clickPixel(x, y) {
        if (this.stateFlag != 2) {
          this.errorText = ""
          if (this.reversi.canPutStone(x, y, this.stateFlag)) {
            this.boardData = this.reversi.getBoard
            const f = this.reversi.finishSerch(this.stateFlag)
            switch (f) {
              case 0:
                this.stateFlag = 2
                break
              case 1:
                this.stateFlag = (this.stateFlag) ? 0 : 1
                break
              case 2:
                this.errorText = "パスです"
                break
            }
          } else {
            this.errorText = "おけないよ"
          }
          this.stateFunc()
        }
      },
      stateFunc() {
        switch (this.stateFlag) {
          case 0:
            this.returnStatus = "黒の番です"
            break
          case 1:
            this.returnStatus = "白の番です"
            break
          case 2:
            this.returnStatus = "終わりです"
            break
        }
      },
    },
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
<template>
  <div class="main">
    <StatusText :status="stateFlag" :board-data="boardData" />
    <table>
      <tr v-for="(stateA,y) of boardData" :key="y">
        <td v-for="(stateB,x) of stateA" :key="`${x}-${y}`">
          <Stone :x-position="x" :y-position="y" :stone="boardData[y][x]" @cp="clickPixel" />
        </td>
      </tr>
    </table>
    <InfoText :info="infoFlag" :status="stateFlag" />
  </div>
</template>

<script>
import Reversi from './reversi'
export default {
  name: 'Main',
  data () {
    return {
      reversi: '',
      boardData: [],
      stateFlag: 0, // black 0, white 1, end 2
      infoFlag: 0,
      header: '', // api header
      putFlag: true
    }
  },
  mounted () {
    const self = this
    this.$axios.$post(
      '/api/generate', {
        board_type: 'normal'
      })
      .then((response) => {
        this.header = response.specific_code
        this.$axios.$get('/api/reversi/state', {
          headers: {
            Authorization: `Bearer ${this.header}`
          }
        }).then((res) => {
          self.boardData = res.board
          this.reversi = new Reversi(self.boardData)
        }).catch((e) => {
          console.log(e)
        })
      }).catch((e) => {
        console.log(e)
      })
    // this.stateFunc()
  },
  methods: {
    async clickPixel (x, y) {
      if (this.stateFlag !== 2 && this.putFlag) {
        this.putFlag = false
        this.infoFlag = 0
        if (this.reversi.canPutStone(x, y, this.stateFlag)) {
          this.boardData = [...this.reversi.getBoard]
          const f = this.reversi.finishSerch(this.stateFlag, this.boardData)
          switch (f) {
            case 0:
              this.stateFlag = 2
              await this.playerPutStone(x, y)
              break
            case 1:
              this.stateFlag = (this.stateFlag) ? 0 : 1
              await this.playerPutStone(x, y)
              await this.enemyPutStone()
              while (this.reversi.finishSerch(this.stateFlag, this.boardData) === 2) {
                this.infoFlag = 1
                await this.enemyPutStone()
              }
              this.stateFlag = (this.stateFlag) ? 0 : 1
              if (this.reversi.finishSerch(this.stateFlag, this.boardData) === 0) {
                this.stateFlag = 2
              }
              break
            case 2:
              await this.playerPutStone(x, y)
              await this.wait()
              this.infoFlag = 2
              break
          }
        } else {
          this.infoFlag = 3
        }
        this.putFlag = true
      }
    },
    async enemyPutStone () {
      await this.wait()
      await this.$axios.$get('/api/reversi/state', {
        headers: {
          Authorization: `Bearer ${this.header}`
        }
      }).then((res) => {
        this.boardData = res.board
        this.infoFlag = 0
      }).catch((e) => {
        console.log(e)
      })
    },
    async playerPutStone (x, y) {
      await this.$axios.$post(
        '/api/reversi/state/action', {
          x,
          y
        }, {
          headers: {
            Authorization: `Bearer ${this.header}`
          }
        })
        .then(() => {
          console.log('put stone')
        }).catch((e) => {
          console.log(e)
        })
    },
    async wait () {
      await new Promise(resolve => setTimeout(resolve, 2001))
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .main {
    height: 80vh;
    background-color: rgb(189, 126, 55);
    position: relative;
  }

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
  }
</style>

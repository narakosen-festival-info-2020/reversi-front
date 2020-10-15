<template>
  <div class="main">
    <StatusText>
      {{ statusText }}
    </StatusText>
    <table>
      <tr v-for="(stateA,y) of boardData" :key="y">
        <td v-for="(stateB,x) of stateA" :key="`${x}-${y}`">
          <Stone :x-position="x" :y-position="y" :stone="boardData[y][x]" @cp="clickPixel" />
        </td>
      </tr>
    </table>
    <InfoText>
      {{ infoText }}
    </InfoText>
  </div>
</template>

<script>
import Reversi from './reversi'
export default {
  name: 'Main',
  data () {
    return {
      reversi: '',
      canSet: [],
      boardData: [],
      stateFlag: 0, // black 0, white 1, end 2
      statusText: 'プレイヤー(黒)の番です',
      infoText: '',
      header: '',
      putFlag: true
    }
  },
  computed: {
    // createboard () {
    //   return this.boardData
    // },
    stone: () => {
      return function (y, x) {
        if (this.boardData[y][x] === 1) {
          return '●'
        } else if (this.boardData[y][x] === 2) {
          return '○'
        }
      }
    }
  },
  watch: {
    stateFlag  () {
      switch (this.stateFlag) {
        case 0:
          this.statusText = 'プレイヤー(黒)の番です'
          break
        case 1:
          this.statusText = 'AI(白)の番です'
          break
        case 2:
          this.statusText = '終わりです'
          break
      }
      if (this.stateFlag === 2) {
        let blackNum = 0
        let whiteNum = 0
        for (const i in this.boardData) {
          for (const l in this.boardData) {
            if (this.boardData[i][l] === 1) {
              blackNum++
            }
            if (this.boardData[i][l] === 2) {
              whiteNum++
            }
          }
        }
        let endText
        if (blackNum === whiteNum) {
          endText = 'あいこ'
        } else if (blackNum > whiteNum) {
          endText = 'プレイヤー(黒)の勝ち'
        } else {
          endText = 'AI(白)の勝ち'
        }
        this.infoText = `プレイヤー(黒)は${blackNum}個、AI(白)は${whiteNum}個で${endText}です`
      }
    }
  },
  mounted  () {
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
        this.infoText = ''
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
                this.infoText = 'プレイヤー(黒)のパスです'
                await this.enemyPutStone()
              }
              this.stateFlag = (this.stateFlag) ? 0 : 1
              if (this.reversi.finishSerch(this.stateFlag, this.boardData) === 0) {
                this.stateFlag = 2
              }
              break
            case 2:
              await this.playerPutStone(x, y)
              this.infoText = 'AI(白)のパスです'
              break
          }
        } else {
          this.infoText = 'そこには置けません'
        }
        this.putFlag = true
      }
    },
    async enemyPutStone () {
      await new Promise(resolve => setTimeout(resolve, 2001))
      await this.$axios.$get('/api/reversi/state', {
        headers: {
          Authorization: `Bearer ${this.header}`
        }
      }).then((res) => {
        this.boardData = res.board
        this.infoText = ''
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

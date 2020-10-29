<template>
  <div class="main">
    <StatusText :status="stateFlag" :board-data="boardData" />
    <table :class="boardClass">
      <tr v-for="(stateA,y) of boardData" :key="y">
        <td v-for="(stateB,x) of stateA" :key="`${x}-${y}`" :class="{non:boardData[y][x]===-1}">
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
      boardClass: [],
      stateFlag: 0, // black 0, white 1, end 2
      infoFlag: 0,
      header: '',
      putFlag: true
    }
  },
  mounted () {
    const self = this
    this.$axios.$post(
      '/api/generate', this.$store.getters.returnPostData)
      .then((response) => {
        this.header = response.specific_code
        this.$axios.$get('/api/reversi/state', {
          headers: {
            Authorization: `Bearer ${this.header}`
          }
        }).then((res) => {
          self.boardData = res.board
          this.reversi = new Reversi(self.boardData)
          // add class
          self.boardClass = 'table-size-' + res.board.length + '-' + res.board[0].length
        }).catch((e) => {
          // eslint-disable-next-line no-console
          console.log('header error')
          this.$router.push('/error')
        })
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.log('can\'t generate')
        this.$router.push('/error')
      })
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
              this.stateFlag = (this.stateFlag) ? 0 : 1
              await this.wait()
              this.stateFlag = (this.stateFlag) ? 0 : 1
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
        // eslint-disable-next-line no-console
        console.log('time error')
        this.$router.push('/error')
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
          // eslint-disable-next-line no-console
          console.log('can\'t put stone')
        }).catch((e) => {
          // eslint-disable-next-line no-console
          console.log('can\'t acction')
          this.$router.push('/error')
        })
    },
    async wait () {
      await new Promise(resolve => setTimeout(resolve, 2001))
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
    border-collapse:collapse;
    text-align: center;

    @for $i from 1 through 20 {
      @for $l from 1 through 20 {
        &.table-size-#{$i}-#{$l} {
          width: boardSize($tablehw, $l, $i);
          height: boardSize($tablehw, $i, $l);
          @include tab {
            width: boardSize($tablehw-tab, $l, $i);
            height: boardSize($tablehw-tab, $i, $l);
          }
          @include sp {
            width: boardSize($tablehw-sp, $l, $i);
            height: boardSize($tablehw-sp, $i, $l);
          }
        }
      }
    }

    td{
      border: 3px solid black;
      padding: 0;

      &.non{
        visibility:hidden;
      }
    }
  }
</style>

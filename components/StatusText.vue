<template>
  <div class="status-text">
    <TextFrame :state="status" :direction="0" />
    <div class="text">
      {{ statusText }}
    </div>
    <TextFrame :state="status" :direction="1" />
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: 0
    },
    boardData: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      statusText: ''
    }
  },
  watch: {
    status () {
      this.changeText()
    }
  },
  mounted () {
    this.changeText()
  },
  methods: {
    changeText () {
      switch (this.status) {
        case 0:
          this.statusText = 'プレイヤー(黒)の番です'
          break
        case 1:
          this.statusText = 'AI(白)の番です'
          break
        case 2:
          this.finishGame()
          break
      }
    },
    finishGame () {
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
        endText = 'あなたの勝ち'
      } else {
        endText = 'AIの勝ち'
      }
      this.statusText = `黒は${blackNum}個、白は${whiteNum}個で${endText}です`
    }
  }
}

</script>

<style lang="scss" scoped>
  %text-box {
    content: '';
    position: absolute;
    top: -10px;
    width: 2px;
    height: calc(100% + 20px);
    background-color: black;
  }

  .status-text {
    @extend %center-text;
    font-size: x-large;
    text-align: center;
    background-color: rgb(189, 126, 55);
    height: calc((100vh - 20vh - #{$tablehw})/2);

    @include tab {
      height: calc((100vh - 20vh - #{$tablehw-tab})/2);
    }

    @include sp {
      font-size: 1rem;
      height: calc((100vh - 20vh - #{$tablehw-sp})/2);
    }

    @include sp-ip5 {
      font-size: .9rem;
    }

    .text {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - 50px);
      max-height: 50px;
      min-width: 280px;
      width: calc(#{$tablehw} - 20px);
      @include tab {
        width: calc(#{$tablehw-tab} - 20px);
      }

      @include sp {
        width: calc(#{$tablehw-sp} - 20px);
      }
    }
  }

</style>

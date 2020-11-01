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
        for (const l in this.boardData[i]) {
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
      this.statusText = `黒は${blackNum}個、白は${whiteNum}個で\n${endText}です`
    }
  }
}

</script>

<style lang="scss" scoped>
  .status-text {
    @extend %center-text;
    font-size: x-large;
    text-align: center;
    background-color: $bg-color;
    height: calc((100vh - 20vh - #{$tablehw})/2);

    @include tab {
      height: calc((100vh - 20vh - #{$tablehw-tab})/2);
    }

    @include sp {
      font-size: 1rem;
      height: calc((100vh - 20vh - #{$tablehw-sp})/2);
    }

    & .text{
      white-space:pre-wrap;
      word-wrap:break-word;
    }
  }

</style>

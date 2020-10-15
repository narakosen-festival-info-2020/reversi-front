<template>
  <div class="status-text">
    <div class="text">
      {{ statusText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: 0
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
          this.statusText = '終わりです'
          break
      }
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
      height: calc((100vh - 20vh - #{$tablehw-sp})/2);
    }

    .text {
      min-width: 280px;
      width: calc(#{$tablehw} - 20px);
      @include tab {
        width: calc(#{$tablehw-tab} - 20px);
      }

      @include sp {
        width: calc(#{$tablehw-sp} - 20px);
      }

      margin: 10px 0;
      position: relative;
      padding: 0.5em .6em;
      border-top: solid 2px black;
      border-bottom: solid 2px black;

      & slot {
        margin: 0;
        padding: 0;
      }

      &:before {
        @extend %text-box;
        left: 10px;
      }

      &:after {
        @extend %text-box;
        right: 10px;
      }
    }
  }

</style>

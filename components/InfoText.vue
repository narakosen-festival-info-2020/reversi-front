<template>
  <div class="info-text">
    <TextFrame :state="3" :direction="0" :hide="info" />
    <div class="text">
      {{ infoText }}
      <button v-if="status==2" @click="gameEnd">
        Topへもどる
      </button>
    </div>
    <TextFrame :state="3" :direction="1" :hide="info" />
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Number,
      default: 0
    },
    status: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      infoText: '',
      finishGame: false
    }
  },
  watch: {
    info () {
      this.changeText()
    }
  },
  mounted () {
    this.changeText()
  },
  methods: {
    gameEnd () {
      this.$router.push('/')
    },
    changeText () {
      switch (this.info) {
        case 0:
          this.infoText = ''
          break
        case 1:
          this.infoText = 'あなた(黒)のパスです'
          break
        case 2:
          this.infoText = 'AI(白)のパスです'
          break
        case 3:
          this.infoText = 'そこには置けません'
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-text {
    @extend %center-text;
    font-size: x-large;
    position: absolute;
    text-align: center;
    bottom: 0;
    background-color: $bg-color;
    height: calc((100vh - 20vh - #{$tablehw})/2);
    width: 100%;

    @include tab {
      height: calc((100vh - 20vh - #{$tablehw-tab})/2);
    }

    @include sp {
      font-size: 1rem;
      height: calc((100vh - 20vh - #{$tablehw-sp})/2);
    }
  }

</style>

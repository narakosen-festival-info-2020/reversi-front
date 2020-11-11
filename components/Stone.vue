<template>
  <div class="stone" @click="cp">
    <div :class="stoneClass" />
  </div>
</template>

<script>
export default {
  name: 'Stone',
  props: {
    xPosition: {
      type: Number,
      default: 0
    },
    yPosition: {
      type: Number,
      default: 0
    },
    stone: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      stoneClass: '',
      positionX: this.xPosition,
      positionY: this.yPosition
    }
  },
  watch: {
    stone () {
      this.changeStoneClass()
    }
  },
  mounted () {
    this.changeStoneClass()
  },
  methods: {
    cp () {
      this.$emit('cp', this.positionX, this.positionY)
    },
    changeStoneClass () {
      let sc = ''
      switch (this.stone) {
        case -1:
          sc = 'not-use'
          break
        case 0:
          sc = ''
          break
        case 1:
          sc = 'stone-black'
          break
        case 2:
          sc = 'stone-white'
          break
      }
      this.stoneClass = sc
    }
  }
}

</script>

<style lang='scss' scoped>
  .stone {
    width: 100%;
    height: 100%;
    @extend .center;

    & .stone-black {
      width: 80%;
      height: 80%;
      border-radius: 50%;
      background: #000;
    }

    & .stone-white {
      width: 80%;
      height: 80%;
      border-radius: 50%;
      background: #fff;
    }

    & .not-use {
      width: 100%;
      height: 100%;
      background: #000;
    }

    slot {
      text-align: center;
    }
  }

</style>

<template>
  <div class="main">
    <div class="box">
      <div class="main-title">
        モードを選んでください
      </div>
      <div class="btn-wrapper">
        <button class="btn-black" @click="gameStart">
          Game Start
        </button>
        <button class="btn-black" @click="gameCircle">
          Circle Game Start
        </button>
        <button :class="['btn-white', {'not-click':isMorT}]" @click="gameCustom">
          Custom Game
        </button>
      </div>
      <div v-if="isMorT" class="character-edge">
        カスタムモードはPCでお楽しみください
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMorT: false
    }
  },
  mounted () {
    if (this.$device.isMobileOrTablet) {
      this.isMorT = true
    }
  },
  methods: {
    gameStart () {
      this.$store.commit('set', 'normal')
      this.$router.push('/Game')
    },
    gameCircle () {
      this.$store.commit('set', 'circle')
      this.$router.push('/Game')
    },
    gameCustom () {
      if (!this.isMorT) {
        this.$store.commit('set', 'custom')
        this.$router.push('/Custom')
      }
    }
  }
}

</script>

<style lang='scss' scoped>
  .box{
    width: 100%;
    position: absolute;
    top:50%;
    left:50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
  }

  .not-click{
    position: relative;
    &::before{
      content: "";
      position: absolute;
      width: 100%;
      height: 10%;
      background: red;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%) rotate(5deg);
    }
    &::after{
      content: "";
      position: absolute;
      width: 100%;
      height: 10%;
      background: red;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%) rotate(-5deg);
    }
  }

</style>

<template>
  <div class="main">
    <div class="box">
      <div class="select-mode">
        モードを選んでください
      </div>
      <div class="btn-wrapper">
        <button class="btn-black" @click="gameStart">
          Game Start
        </button>
        <button class="btn-black" @click="gameCircle">
          Circle Game Start
        </button>
        <button class="btn-white" @click="gameCustom">
          Custom Game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      this.$store.commit('set', 'custom')
      this.$router.push('/Custom')
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
  .select-mode{
    font-size: 2rem;
    @include sp-ip5 {
      font-size: 1.7rem;
    }
    color: black;
    font-family: vdl-logojrblack, sans-serif;
    font-style: normal;
    font-weight: 900;
    text-shadow:
      2px  2px 0px #ffffff,
      -2px  2px 0px #ffffff,
      2px -2px 0px #ffffff,
      -2px -2px 0px #ffffff,
      2px  0px 0px #ffffff,
      0px  2px 0px #ffffff,
      -2px  0px 0px #ffffff,
      0px -2px 0px #ffffff;
  }
}
</style>

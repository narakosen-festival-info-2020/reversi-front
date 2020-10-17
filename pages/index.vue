<template>
  <div class="main">
    <div class="box">
      <div class="select-mode">
        モードを選んでください
      </div>
      <button class="center" @click="gameStart">
        Game Start
      </button>
      <button class="center" @click="gameRandom">
        Rondom Game Start
      </button>
      <button class="center" @click="gameCustom">
        Custom Game
      </button>
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
    gameRandom () {
      this.$store.commit('set', 'random')
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
.select-mode{
  font-size: 2rem;
}
.box{
  width: 100%;
  position: absolute;
  top:50%;
  left:50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
}
</style>

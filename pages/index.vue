<template>
  <div class="main">
    <div class="box">
      <div class="select-mode">
        モードを選んでください
      </div>
      <div class="btn-wrapper">
        <button class="center mode-btn" @click="gameStart">
          Game Start
        </button>
        <button class="center mode-btn" @click="gameRandom">
          Rondom Game Start
        </button>
        <button class="center mode-btn" @click="gameCustom">
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
.main {
  background-color: #02af44;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent, transparent 28px,
    #393939, #393939 30px,
  ), repeating-linear-gradient(
    45deg,
    transparent, transparent 28px,
    #393939, #393939 30px,
  );
  animation: move 1s linear infinite;/*左と上がきれいにつながらない...*/
}
.select-mode{
  font-size: 2rem;
  color: white;
}
.box{
  width: 100%;
  position: absolute;
  top:50%;
  left:50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
}
.btn-wrapper {
  width: 30%;
  min-width: 150px;
  margin: auto;
}
.mode-btn {
  width: 100%;
  margin: 10px 0px;
  padding: 10px;
  border: 5px solid #191919;
  border-radius: 6px;
  color: white;
  background-color: #292929;
  /*ストライプを作る*/
  background-image: repeating-linear-gradient(
    -45deg,
    transparent, transparent 5px,
    #393939, #393939 8px
  );
}

@keyframes move {
  0% {background-position: 0px 0px;}
  100% {background-position: 23px 23px;}
}
</style>

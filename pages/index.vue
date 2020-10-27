<template>
  <div class="main">
    <div class="box">
      <div class="select-mode">
        モードを選んでください
      </div>
      <div class="btn-wrapper">
        <button class="center mode-btn btn-black" @click="gameStart">
          Game Start
        </button>
        <button class="center mode-btn btn-black" @click="gameCircle">
          Circle Game Start
        </button>
        <button class="center mode-btn btn-white" @click="gameCustom">
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
.main {
  background-color: #ee7800;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent, transparent 28px,
    #fffbec, #fffbec 30px,
  ), repeating-linear-gradient(
    45deg,
    transparent, transparent 28px,
    #fffef6, #fffef6 30px,
  );
  background-size: calc(100% + 50px) calc(100% + 50px);/* 移動させる分だけサイズを大きくしておく(50pxは大体) */
  animation: move 1.5s linear infinite;
}
.select-mode{
  font-size: 2rem;
  color: black;

  font-family: vdl-logojrblack, sans-serif;
  font-style: normal;
  font-weight: 900;

  /* 2pxふちどり */
  text-shadow: white 2px 0px,  white -2px 0px,
    white 0px -2px, white 0px 2px,
    white 2px 2px , white -2px 2px,
    white 2px -2px, white -2px -2px,
    white 1px 2px,  white -1px 2px,
    white 1px -2px, white -1px -2px,
    white 2px 1px,  white -2px 1px,
    white 2px -1px, white -2px -1px;
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
  border-radius: 6px;
}

.btn-black {
  border: 5px solid #191919;
  color: white;
  background-color: #292929;
  /*ストライプを作る*/
  /*
  background-image: repeating-linear-gradient(
    -45deg,
    transparent, transparent 5px,
    #393939, #393939 8px
  );
  */
}

.btn-white {
  border: 5px solid #e9e9e9;
  color: black;
  background-color: #d9d9d9;
  /*ストライプを作る*/
  /*
  background-image: repeating-linear-gradient(
    -45deg,
    transparent, transparent 5px,
    #c9c9c9, #c9c9c9 8px
  );
  */
}

@keyframes move {
  0% {background-position: -42px -42px;}
  100% {background-position: 0px 0px;}
}
</style>

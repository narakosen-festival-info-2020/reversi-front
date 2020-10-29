<template>
  <div class="header">
    <div class="title">
      Reversi
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .header {
    height: 10vh;
    width: 100%;
    background-color: $hf-color;
    position: relative;
  }

  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    font-size: 20px;
  }

</style>

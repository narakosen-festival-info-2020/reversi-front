<template>
  <div class="footer">
    <div class="box">
      <div class="copyright">
        ©奈良高専情報工学科
      </div>
      <a href="https://www.nara-k.ac.jp/">奈良高専</a>
    </div>
  </div>
</template>

<script>
export default { }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .footer {
    width: 100%;
    height: 10vh;
    position: absolute;
    bottom: 0;
    background-color: skyblue;
    text-align: center;
  }

  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  .copyright {
    font-size: 20px;
  }

</style>

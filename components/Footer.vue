<template>
  <div class="footer">
    <div class="box">
      <a href="http://www.info.nara-k.ac.jp/">©奈良高専情報工学科</a>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .footer {
    font-family: 'M+ Type-1 (general-j) Light';
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 0;
    background-color: $hf-color;
    text-align: center;
  }

  .box {
    font-size: 1.1rem;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    a{
      text-decoration: none;
      &:link{
        color: black;
      }
      &:visited{
        color: black;
      }
      &:hover{
        color: black;
      }
      &:active{
        color: black;
      }
    }
  }

</style>

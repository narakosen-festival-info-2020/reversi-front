<template>
  <div>
    <Header />
    <Nuxt class="nuxt-box" />
    <Footer />
  </div>
</template>

<style lang='scss'>
  body {
    margin: 0;
    overflow: hidden;
    font-family: vdl-logojrblack, sans-serif;
  }

  #app {
    min-height: 100%;
    position: relative;
  }

  .nuxt-box{
    height: 100%;
  }

  html, body, #__nuxt, #__layout, #__layout > div{
    height: 100%;
  }

</style>

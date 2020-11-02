<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<style lang='scss'>
  .body-class {
    margin: 0;
    overflow: hidden;
    font-family: vdl-logojrblack, sans-serif;
  }

  #app {
    min-height: 100vh;
    position: relative;
  }

    html, body, #__nuxt, #__layout, #__layout > div {
        height: 100%;
    }

</style>

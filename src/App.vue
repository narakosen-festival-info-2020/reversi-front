<template>
  <Header/>
  <Main/>
  <Footer/>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Main
  }
}
</script>

<style lang='scss'>
body{
  margin: 0;
}

#app{
  min-height: 100vh;
  position: relative;
}
</style>

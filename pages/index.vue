<template>
  <div class="main">
    <button @click="gameStart">
      Game Start
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    gameStart () {
      this.$router.push('/Game')
    }
  }
}

</script>

<style lang='scss' scoped>
</style>

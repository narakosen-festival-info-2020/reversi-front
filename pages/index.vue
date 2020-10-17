<template>
  <div>
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

<style lang='scss'>
</style>

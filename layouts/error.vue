<template>
  <div class="main">
    <h1 class="main-title">
      エラーが発生しました
    </h1>
    <p class="character-edge">
      何度も表示される場合は、少し時間を開けてから再度開いてください。
    </p>
    <div class="center btn-wrapper">
      <button class="btn-black" @click="top">
        Topへもどる
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  mounted () {
    console.log(this.error)
  },
  methods: {
    top () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang='scss' scoped>
.main{
  text-align: center;
}
h1{
  margin-top: 0;
  padding-top: 21px;
}
</style>

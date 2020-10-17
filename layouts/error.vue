<template>
  <div class="main">
    <h1>エラーが発生しました</h1>
    <p>
      何度も表示される場合は、少し時間を開けてから再度開いてください。
    </p>
    <div class="center">
      <button @click="top">
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
  .center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

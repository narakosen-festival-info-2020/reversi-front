<template>
  <div class="info-text">
    <div class="text">
      <slot />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.info-text {
  @extend %center-text;
  position: absolute;
  text-align: center;
  bottom: 0;
  background-color: rgb(189, 126, 55);
  height: calc((100vh - 20vh - #{$tablehw})/2);
  width: 100%;

  @include tab {
    height: calc((100vh - 20vh - #{$tablehw-tab})/2);
  }

  @include sp {
    height: calc((100vh - 20vh - #{$tablehw-sp})/2);
  }
}
</style>

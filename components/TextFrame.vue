<template>
  <div class="frame" :class="[frameDirection, {framehide: !hide}]">
    <div class="sankaku2" />
    <div class="sankaku" :class="frameState" />
    <div class="sankaku3" />
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Number,
      default: 0
    },
    direction: {
      type: Number,
      default: 0 // 0 left, 1 right
    },
    hide: {
      type: Number,
      default: 1 // 0 hide, 1~ none
    }
  },
  data () {
    return {
      frameState: this.frameChangeColor(),
      frameDirection: (this.direction) ? 'right-direction' : 'left-direction'
    }
  },
  watch: {
    state () {
      this.frameState = this.frameChangeColor()
    }
  },
  methods: {
    frameChangeColor () {
      let colorClass
      switch (this.state) {
        case 0 :
          colorClass = 'player-turn'
          break
        case 1 :
          colorClass = 'enemy-turn'
          break
        case 2 :
          colorClass = 'finish'
          break
        case 3 :
          colorClass = 'info'
          break
      }

      return colorClass
    }
  }
}
</script>

<style lang="scss" scoped>
$color:rgb(189, 126, 55);
$heigth: 20px;

@mixin sanakuMake($bgcolor: #fff, $color: #f00, $size: 50px, $heigth: 40px, $sizebottom: 0px, $xbuffer: 0px , $ybuffer: 0) {
  transform: translateY(calc(#{$heigth} - #{$ybuffer} - #{$heigth})) translateX(calc(#{$sizebottom} + #{$xbuffer}));
  border-right: $size solid transparent;
  border-bottom: calc(#{$heigth} - #{$sizebottom}/2) solid $bgcolor;
  border-left: $size solid transparent;
  &::before {
    content: '';
    position: absolute;
    transform: translateX(calc(-#{$size})) translateY(5px);
    border-right: $size solid transparent;
    border-bottom: calc(#{$heigth} - #{$sizebottom}/2) solid $color;
    border-left: $size solid transparent;
  }

  &::after {
    content: '';
    position: absolute;
    transform: translateX(-#{$size}) translateY(10px);
    border-right: $size solid transparent;
    border-bottom: calc(#{$heigth} - #{$sizebottom} /2) solid $bgcolor;
    border-left: $size solid transparent;
  }
}

.frame{
  transform:translateX(calc(#{$heigth}*(6))) rotate(-90deg);
  display: flex;
  justify-content: center;
  align-items: center;
  &.right-direction{
    transform:translateX(calc(#{$heigth}*(-6))) rotate(90deg);
  }
  &.left-direction{
    transform:translateX(calc(#{$heigth}*(6))) rotate(-90deg);
  }
  &.framehide{
    opacity: 0;
  }
}

.sankaku3{
  @include sanakuMake($color, black, 30px, $heigth, 10px ,-80px , -7px);
}

.sankaku2{
  @include sanakuMake($color, black, 30px, $heigth, 10px ,60px, 13px);
}

.sankaku{
  @include sanakuMake($color, red, 40px, $heigth);
  &.finish{
    &::before{
      border-bottom-color: yellow;
    }
  }
  &.enemy-turn
  {
    &::before{
      border-bottom-color: red;
    }
  }
  &.player-turn
  {
    &::before{
      border-bottom-color: blue;
    }
  }
  &.info
  {
    &::before{
      border-bottom-color: purple;
    }
  }
}

</style>

<template>
  <div class="footer">
		<div class="title">Footer</div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.footer{
	width: 100%;
	height: 10vh;
	position: absolute;
	bottom: 0;
	background-color: skyblue;
}

.title{
	position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

	font-size: 20px;
}
</style>

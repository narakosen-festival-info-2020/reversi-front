<template>
	<div class="stone" @click="cp" :class="{'not-use-board-class':(stone==9)}">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'Stone',
		props: {
			xPosition: Number,
			yPosition: Number,
			stone: Number
		},
		data() {
			return {
				positionX: this.xPosition,
				positionY: this.yPosition,
			};
		},
		methods: {
			cp() {
				this.$emit('cp', this.positionX, this.positionY);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
	.stone {
		width: 100%;
		height: 100%;
		background: greenyellow;

		&.not-use-board-class {
			background: black;
		}

		slot{
			text-align: center;
		}
	}
</style>
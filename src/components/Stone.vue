<template>
	<div class="stone" @click="cp">
		<div :class="stoneClass"></div>
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
				stoneClass: (this.stone == 1) ? "stone-black" : (this.stone == 2) ? "stone-white" : "",
				positionX: this.xPosition,
				positionY: this.yPosition,
			};
		},
		watch: {
			stone: function () {
				this.stoneClass = (this.stone == 1) ? "stone-black" : (this.stone == 2) ? "stone-white" : ""
			}
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
		background: rgb(38, 133, 1);
		display: flex;
		justify-content: center;
		align-items: center;

		& .stone-black {
			width: 80%;
			height: 80%;
			border-radius: 50%;
			background: #000;
		}

		& .stone-white {
			width: 80%;
			height: 80%;
			border-radius: 50%;
			background: #fff;
		}

		slot {
			text-align: center;
		}
	}
</style>
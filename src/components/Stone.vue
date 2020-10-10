<template>
	<div class="stone" @click="cp" :class="stoneClass">
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
				stoneClass:(this.stone==1)?"stone-black":(this.stone==2)?"stone-white":"",
				positionX: this.xPosition,
				positionY: this.yPosition,
			};
		},
		watch:{
			stone:function(){
				this.stoneClass=(this.stone==1)?"stone-black":(this.stone==2)?"stone-white":""
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
		background: greenyellow;

		&.stone-black {
			background: black;
		}
		&.stone-white {
			background: white;
		}

		slot{
			text-align: center;
		}
	}
</style>
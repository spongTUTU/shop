<template>
	<view class="MyBanner">
		<swiper class="banner" indicator-dots interval='3000' autoplay circular>
			<swiper-item v-for="(item,index) in banner" :key="index">
				<image :src="item" class="img"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "Banner",
		props:{
			banner:{
				type:Array,
				default:function(){
					return[]
				}
			}
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss" scoped>
.MyBanner {
	margin: 10rpx 0;
}
.banner {
	width: 100%;
	height: 350rpx;
	.img {
			width: 100%;
			height: 100%;
		}
}
</style>
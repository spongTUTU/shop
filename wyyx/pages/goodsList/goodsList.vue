<template>
	<view class="list">
		<view class="item" v-for="item in list" :key='item.id' @click="toGoodsDetail(item.id)">
			<image :src="item.pic" mode=""></image>
			<view class="info">
				<view class="title">
					{{item.name}}
				</view>
				<view class="price">
					￥{{item.price}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import goodsListVue from './goodsList.vue';
	export default {
		data() {
			return {
				list:[],//商品列表数据
			};
		},
		onLoad(options) {
			//动态设置导航标题
			uni.setNavigationBarTitle({
				title: options.name
			});
			//正常：获取变量id  动态请求对应的id系列的商品列表
			//此处我们后台shuju8没有那么多 直接返回零食数据列表 无需id标识
			this.goodsList()
		},
		methods:{
			async goodsList(){
				let res = await uni.$http(uni.$base.goodsList)
				console.log('商品列表数据',res);
				this.list = res.data.result;
			},
			//点击跳转商品详情界面----------------
			toGoodsDetail(id){
				uni.navigateTo({
					url:'/pages/goodsDetail/goodsDetail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.list{
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx;
	justify-content: space-between;
	.item{
		width: 200rpx;
		border-radius: 10rpx;
		border:1rpx solid #eee;
		padding:6rpx;
		margin-bottom: 40rpx;
		image{
			width: 200rpx;
			height: 200rpx;
			// height: 300rpx;
		}
		.title{
			color: #666;
			font-size: 24rpx;
			overflow: hidden;
			text-overflow:ellipsis;    
			white-space: nowrap;
			margin-bottom: 10rpx;
		}
		.price{
			font-size: 28rpx;
			color: red;
		}
	}
}
</style>

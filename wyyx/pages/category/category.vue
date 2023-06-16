<template>
	<view>
		<!-- 1	搜索框 -->
		<view class="header">
			<view class="search">
				搜索框
			</view>
		</view>
		<!-- 2	左右分类产品介绍 -->
		<view class="wrapper">
			<view class="left">
				<scroll-view scroll-y="true" class="scroll-left">
					<block v-for="(item,index) in categoryDatas" :key="item.id">
						<view class="item" :class="{ active:index==activeIndex }" @click="changeIndex(index)">{{item.name}}</view>
					</block>
				</scroll-view>
			</view>
			<!-- 右侧2级 -->
			<view class="right">
				<image class="right-img" :src="imgUrl" mode=""></image>
				<!-- 滚动事件是否到最底部 -->
				<scroll-view scroll-y="true"  class="scroll-right" @scroll="scrollHandle" :scroll-top="scrollTop">
					<!-- 3级每一类 -->
					<block v-for="(item,index) in subCateList" :key='item.id'>
						<!-- 接口未封装只传 一个零食的id-->
						<!-- <view class="info" @click="toGoodsList(item.id)"> -->
						<view class="info" @click="toGoodsList(item.name)">
							<image :src="item.wapBannerUrl" mode="" class="img"></image>
							<view class="title">{{item.name}}</view>
						</view>
					</block>
				</scroll-view>
			</view>
			<!-- 返回按钮 -->
			<view class="goTop" v-if="isShow" @click="goTop">
				返回
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryDatas:[],//分类容器数据
				activeIndex:0,//高亮标识
				subCateList:[],//右侧滚动内容数据
				imgUrl:'',//右侧图片最上面
				isShow:false,
				scrollTop:0,
			}
		},
		onLoad(){
			//获取分类书信息-----
			this.getCategoryData();
		},
		methods: {
			async getCategoryData(){
				let res = await uni.$http(uni.$base.categoryData)
				console.log('分类数据----',res);
				this.categoryDatas=res.categoryDatas;
				//获取右侧第一个容器数据信息
				this.subCateList=res.categoryDatas[0].subCateList;
				this.imgUrl=res.categoryDatas[0].imgUrl;
			},
			//点击导航高亮
			changeIndex(index,id){
				this.activeIndex=index;
				//点击左侧分类名称时切换右侧内容区域
				this.subCateList = this.categoryDatas[index].subCateList;
				this.imgUrl=this.categoryDatas[index].imgUrl;
				//右侧滚动容器返回顶部
				this.scrollTop  = this.scrollTop==0?0.01:0;
			},
			//滚动右侧容器0---触发滚动事件---目的:控制返回顶部按钮显示
			scrollHandle(e){
				console.log('滚动时触发---',e.detail.scrollTop);
				if(e.detail.scrollTop >= 200){
					this.isShow=true;
				}else{
					this.isShow=false;
				}
			},
			//点击返回按钮--返回顶部
			goTop(){
				this.scrollTop  = this.scrollTop==0?0.01:0;
			},
			//点击分类名称进入商品列表界面
			// toGoodsList(id){
			toGoodsList(name){
				uni.navigateTo({
					url:'/pages/goodsList/goodsList?name='+name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.header {
	height: 60rpx;
	border-bottom: 2rpx solid #ddd;
	padding: 20rpx;
	.search {
		height: 60rpx;
		background-color: #ccc;
		border-radius: 10rpx;
		line-height: 60rpx;
		text-align: center;
	}
}
.wrapper {
	display: flex;
	.left {
		width: 200rpx;
		background-color: #f5f5f5;
	.scroll-left {
		height: calc(100vh - 102rpx);
		}
	.item {
		height: 140rpx;
		line-height: 140rpx;
		text-align: center;
			&.active {
				background-color: #fff;
			}
		}
	}
	.right {
		flex: 1;
		text-align: center;
		.scroll-right {
			height: calc(100vh - 102rpx);
		}
		.right-img {
			width: 500rpx;
			height: 200rpx;
			margin-top: 20rpx;
		}
		.info {
			width: 160rpx;
			float: left;
			margin: 10rpx;
			.img {
				width: 160rpx;
				height: 160rpx;
			}
			.title{
				width: 160rpx;
				font-size: 24rpx;
				color: #666;
				// 超出一行不显示
				overflow: hidden;   //溢出 
				text-overflow:ellipsis;    //超出显示省略号:
				white-space: nowrap; //强制不换行:
			}
		}
	}
}
.goTop{
	position: fixed;
	right:20rpx;
	bottom:20rpx;
	background: rgba(0,0,0,0.4);
	font-size: 12px;
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	text-align: center;
	line-height: 60rpx;
	color: #fff;
}
</style>


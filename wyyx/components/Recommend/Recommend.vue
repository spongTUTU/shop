<template>
	<view>
		<!-- 1	轮播图组件 -->
		<!-- 父子组件传值 -->
		<Banner :banner='banner'></Banner>
		<!-- 2	 品牌信息-->
		<view class="info">
			<view class="ele" v-for="(item,index) in policyDescList" :key='index'>
				<image :src="item.icon" mode="" class="icon"></image>
				<text class="text">{{item.desc}}</text>
			</view>
		</view>
		<!-- 3	产品分类--菜单导航目录 -->
		<view class="menu">
			<view class="item" v-for="item in navList" :key='item.L1id'>
				<!-- 嵌套h5界面--显示不稳定 -->
				<navigator :url="'/pages/catPage/catPage?url='+item.schemeUrl">
					<image :src="item.picUrl" class="img"></image>
					<!-- 动态style 点击时有效果 -->
					<view :style="{color:'#'+item.textColor}">{{item.text}}</view>
				</navigator>
			</view>
		</view>
		<!-- 4	好物列表推荐 -->
		<view class="list" v-for="item in goodsList" :key='item.titlePicUrl'>
			<image :src="item.titlePicUrl" class="imgInfo" alt=""></image>
			<scroll-view scroll-x class="goodsList" >
				<view class="goodsEle" v-for='ele in item.itemList' :key='ele.id'>
					<image :src="ele.listPicUrl" class="descImg" mode=""></image>
					<view class="goodsInfo">
						{{ele.name}}
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import base from '@/utils/base.js' //接口
	import request from '@/utils/request.js' //方法
	import { mapState } from 'vuex'
	export default {
		name: "Recommend",
		props: ['policyDescList','goodsList'],
		data() {
			return {
				banner: [], //轮播图数据
			};
		},
		computed:{
			...mapState('menu',['navList'])
		},
		created() {
			this.getBanner()
		},
		methods: {
			async getBanner() {
				let res = await request(base.indexBanner)
				console.log('轮播图数据', res);
				this.banner = res.result;
			}
		}
	}
</script>

<style lang="scss" scoped>
.info {
	display: flex;
	align-items: center;
	padding: 5rpx 10rpx;
	.ele {
		flex: 1;
		text-align: center;
		position: relative;
		line-height: 46rpx;
	.icon {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 4rpx;
		// vertical-align: middle;
		}
	.text {
		padding-left: 40rpx;
		}
	}
}
//分类导航
.menu {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;

		.item {
			width: 20%;
			text-align: center;
			margin-bottom: 20rpx;

			.img {
				width: 100rpx;
				height: 100rpx;
			}
		}
}
// 好物列表
.list {
	margin-bottom: 20rpx;
	.imgInfo {
		height: 375rpx;
		width: 100%;
	}
	.goodsList {
		white-space: nowrap;
		.goodsEle {
			display: inline-block;
			margin: 10rpx;
			width: 200rpx;			
		}
		.goodsInfo {
			width: 200rpx;
			height: 64rpx;
			font-size: 24rpx;
			color: #666;
			// css超出两行显示省略
			white-space: normal;
			text-overflow:ellipsis;
	        display: -webkit-box;
		    word-break: break-all;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;	
			overflow: hidden;
		}
	}
	.descImg {
		background-color: #f5f5f5;
		width: 200rpx;
		height: 200rpx;
	}
}			
</style>
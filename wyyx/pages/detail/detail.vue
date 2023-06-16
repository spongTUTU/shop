<template>
	<view>
		<!-- 1	名称 -->
		<view class="title">
			{{goodsInfo.name}}
		</view>
		<!-- 2	商品图片 -->
		<image :src="goodsInfo.listPicUrl" mode="" class="img"></image>
		<!-- 3	信息介绍 -->
		<view class="info">
			<view class="mark">
				{{goodsInfo.promTag}}
			</view>
			<view class="money">
				<text class="price">销量:	{{goodsInfo.retailPrice}}</text>
				<text class="number">价格:	{{goodsInfo.retailPrice}}</text>
			</view>
			<view class="desc">
				<view class="goodstitle">
					产品特色：{{goodsInfo.simpleDesc}}
				</view>
				<view class="list">
					<view class="content">1) 100%桑蚕丝填充，丝丝精粹不掺杂</view>
					<view class="content">2) 创新井字拉网工艺，桑蚕丝不易黏连结块</view>
					<view class="content">3) 两种面料可选，贡缎手感细腻，竹棉清爽透气</view>
					<view class="content">4) AB双面设计，多种活性印花不易褪色</view>
				</view>
			</view>
		</view>
		<!-- 4	加购信息 -->
		<!-- 安装ui库使用商品导航 -->
		<!-- height 占高 -->
		<view class="height">
			<!-- 始终固定在屏幕底部 -->
			<view class="addGoods">
				<!-- options	    Array	-	组件参数 -->
				<!-- buttonGroup	Array	-	组件按钮组参数 -->
				<!-- fill	    Boolean	false	按钮是否平铺 -->
				<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup"
				@click="onClick" 
				@buttonClick="buttonClick"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//正常:传递id标识,进入详情界面获取接口
				//非正常:点击商品时,传递了整个商品的信息,整个商品数据传递给详情页,无需再次请求 ---省事
				goodsInfo:{},//详情数据
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
			}
		},
		onLoad(options){
			this.goodsInfo=JSON.parse(options.goodsInfo);
			console.log('详情界面',this.goodsInfo);
		},
		methods:{
			//点击加入购物车左侧列表
			onClick(e){
				console.log('e--ee',e);
			},
			//点击加入购物车-立即购买按钮
			buttonClick(e) {
				console.log('buttonClick---', e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="scss" scoped>
.title {
	text-align: center;
	font-size: 40rpx;
	line-height: 100rpx;
}
.img {
	width: 100%;
	height: 750rpx;
}
.info {
	margin: 20rpx;
	.mark {
		margin: 0 30rpx;
		background: #BB2C08;
		color: #fff;
		text-align: center;
		padding: 30rpx 0px;
		border-radius: 20rpx;
		width: 660rpx;
		font-size: 30rpx;
	}
	.money {
		margin-top: 20rpx;
		.price {
			color: red;
			font-size: 40rpx;
		}
		.number {
			padding-left: 40rpx;
			color: #888;
		}
	}
	.desc {
		color: #333;
		margin-top: 20rpx;
		.goodstitle {
			font-weight: bold;
			font-size: 30rpx;
			margin-bottom: 20rpx;
		}
		.content {
			line-height: 60rpx;
			color: #333;
		}
	}
}
	//加购商品
.height {
	height: 100rpx;
	background: pink;
	.addGoods {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99;
	}
}
</style>

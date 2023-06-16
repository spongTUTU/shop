<template>
	<view>
		<!-- {{cateId}} d标识-->
		<!-- 1	轮播效果 -->
		<Banner :banner="cateObj.category.bannerUrlList"></Banner>
		<!-- <swiper>
			<swiper-item v-for="(item,index) in cateObj.category.bannerUrlList" :key='index'>
				<image :src="item" mode=""></image>
			</swiper-item>
		</swiper> -->
		<!-- 2	信息介绍说明 -->
		<view class="info">
			<view class="myTitle">
				{{cateObj.category.frontName}}
			</view>
			<view class="mysubTitle">
				{{cateObj.category.name}}
			</view>
		</view>
		<!-- 3	商品展示列表 -->
		<view class="list">
			<view class="item" v-for="item in cateObj.itemList" :key='item.id' @click="toDetail(item)">
				<image :src="item.listPicUrl" class="item-img" mode=""></image>
				<view class="title">
					{{item.name}}
				</view>
				<view class="price">
					￥{{item.retailPrice}}
				</view>
			</view>
		</view>
		<!-- 4	返回顶部-->
		<view class="goTop" v-if="isShow" @click="goTop">
			返回
		</view>
	</view>
</template>

<script>
	export default {
		name:"MenuCate",
		props: ['cateId','scrollTop'],//监听scrolltop传值滚动	
		data() {
			return {
				isShow:false,//返回按钮是否显示
				indexCateList:[],//所有的导航分类数据信息[{},{},{}]
				//分析:数据进行筛选---数组遍历数据方法
				//indexCateList[i].category.parentId 信息标识 == 点击的导航分类id 匹配 这个数据是想要的数据{}
			};
		},
		//计算属性筛选我们最终想要的数据
		computed:{
			cateObj(){
				// return this.indexCateList.find(ele=>ele.category.parentId == this.cateId)
				let obj=this.indexCateList.find(ele=>ele.category.parentId == this.cateId)
				console.log('obj---',obj);
				return obj;
			}
		},
		//监听滚动高度---
		watch:{
			scrollTop(val){
				if(val>=200){
					this.isShow=true;
				}else{
					this.isShow=false;
				}
			}
		},
		created(){
			// console.log('uni---',uni.$base,uni.$http);
			this.getIndexCateList();
			//监听uni的数据-滚动数据
			uni.$on('paseScroll',data=>{
				console.log('uni.$on---',data);
				if(data>=200){
					this.isShow=true;
				}else{
					this.isShow=false;
				}
			})
		},
		// mounted(){
		// 	// 回调函数接收参数
		// 	uni.$on('pageScroll',data=>{
		// 		console.log('uni.$on---',data);
		// 	})
		// },
		methods:{
			//获取导航分类产品信息
			async getIndexCateList(){
				// 请求方法挂到全局 使用uni.$http直接使用不需要用import引入
				let res =await uni.$http(uni.$base.indexCateList)
				console.log('导航分类产品信息---',res.indexCateList);
				// 筛选信息进行渲染
				this.indexCateList=res.indexCateList;
			},
			//点击商品--跳转界面
			toDetail(item){
				console.log('item---',item);
				uni.navigateTo({
					url:'../detail/detail?goodsInfo='+JSON.stringify(item)
				})
			},
			//点击返回按钮--返回顶部
			goTop() {
				console.log('点击返回顶部----');
				uni.pageScrollTo({
					scrollTop: 0, //scrollTop	Number	否	滚动到页面的目标位置（单位px）
					duration: 300, //duration	Number	否	滚动动画的时长，默认300ms，单位 ms
				})
			},
			
		}
	}
</script>
<!-- scoped 局部作用域 -->
<style lang="scss" scoped>
.goTop {
	position: fixed;
	right: 20rpx;
	bottom: 20rpx;
	background: rgba(0, 0, 0, 0.4);
	font-size: 12px;
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	text-align: center;
	line-height: 60rpx;
	color: #fff;
}

.info {
	margin: 20rpx;
	text-align: center;
	.myTitle {
		font-size: 40rpx;
	}
	.mysubTitle {
		color: #666;
	}
}
.list {
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx;
	justify-content: space-between;
	.item {
		width: 344rpx;
		margin-bottom: 20rpx;
		.item-img {
			width: 344rpx;
			height: 344rpx;
		}
		.title {
			color: #666;
			margin-bottom: 10rpx;
			white-space: nowrap;
			overflow: hidden; //文本超出隐藏
			text-overflow: ellipsis; //文本超出省略号替代
		}
		.price {
			color: #ff5555;
		}
	}
}
</style>
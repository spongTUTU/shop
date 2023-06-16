<template>
	<view class="home">
		<!-- 1、搜索框 -->
		<view class="myHeader">
			<!-- logo -->
			<image src="/static/images/logo.png" class="logo" mode=""></image>
			<!-- 搜索 -->
			<view class="search">
				<i class="iconfont icon-sousuo"></i><input type="text" placeholder-style='font-size:10px' placeholder="请输入....">
			</view>
			<!-- 按钮 -->
			<view class="btn">
				搜索
			</view>
		</view>
		<!-- 2、滑动导航区域 -->
		<scroll-view scroll-x enable-flex class="myNav">
			<!-- 推荐模块 -->
			<view class="item" :class="{active:activeIndex == -1}" @click="changeIndex(-1)">
				推荐
			</view>
			<!-- active动态绑定 -->
			<view class="item" 
					:class="{active:index == activeIndex}" 
					v-for=" (item,index) in navList" 
					:key="item.L1Id"
					@click="changeIndex(index,item.L1Id)"
				>{{item.text}}
			</view>
		</scroll-view>
		<!-- 3.	推荐界面 -->
		<!-- 组件是components里的可以直接使用不用引入 -->
		<Recommend v-if="activeIndex == -1" :policyDescList='policyDescList' :goodsList='goodsList'></Recommend>
		<!-- 4	其他导航类目--居家生活,服饰鞋包等 -->
		<!-- 默认不触发点击后触发显示 -->
		<MenuCate v-else :cateId='cateId' :scrollTop='scrollTop'></MenuCate>
	</view>
</template>

<script>
	import base from '@/utils/base.js'//接口
	import request from '@/utils/request.js'//方法
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				navList:[],//滑动导航区域赋值
				activeIndex:-1,//高亮的变量标识
				policyDescList:[],//icon信息
				goodsList:[],//好物推荐
				cateId:'',//类目分类id
				scrollTop:0,//滚动默认0
			}
		},
		computed:{
			// ...mapState('menu',['navList'])
		},
		created(){
				this.getIndexData();
		},
		//监听页面滚动事件,只能放到页面中触发
		onPageScroll(e){
			console.log('页面滚动距离'+e.scrollTop);
			//方法1
			// this.scrollTop=e.scrollTop;
			//方法2：跨组件数据通信
			//参数：eventName String 事件名 object 触发事件携带的附加参数
			uni.$emit('paseScroll',e.scrollTop)
		},
		methods: {
			...mapMutations('menu',['setNavList']),
			//请求首页动态数据信息
			async getIndexData(){
				// let res =await request(base.host+base.indexData,'get',{loading:false},{})//小程序请求
				let res =await request(base.indexData)//H5运行
				console.log('首页动态数据',res);
				// 导航区域
				this.navList=res.indexData.kingKongModule.kingKongList;
				// 品牌信息
				this.policyDescList=res.indexData.policyDescList;
				// 推荐界面-好物推荐
				this.goodsList=res.indexData.categoryModule;
				//导航区域---存储仓库 vuex
				this.setNavList(res.indexData.kingKongModule.kingKongList);//导航整体
			},
			//点击导航高亮效果
			//参数id进行相应类别的展示
			changeIndex(index,id){
				this.activeIndex=index;
				//点击的导航费雷的id传递给子组件导航分类组件---对于的获取当前的导航类目的动态数据
				this.cateId=id;
				console.log('id---',id,this.cateId);
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 搜索
.myHeader{
	display: flex;
	padding: 10rpx;
	align-items: center;
	font-size: 24rpx;//12px
	.logo{
		width:140rpx;
		height:40rpx;
	}
	.search{
		border: 1px solid #eee ;
		border-radius: 10rpx;
		flex: 1;
		margin: 0 10rpx;
		// padding-left:14rpx;
		display: flex;
		align-items: center;
		padding: 4rpx 10rpx;
		vertical-align: top;
	}
	.btn{
		width: 80rpx;
		text-align: center;
	}
}	
//横向滚动
.myNav{
	// 防止换行
	white-space: nowrap;
	display: flex;
	color: #333333;
	height: 70rpx;
	.item{
		flex: 1;
		display: inline-block;
		margin: 10rpx 16rpx;
		text-align: center;
		// &麻花继承他的父亲
		&.active{
			color: #BB2C08;
			border-bottom:1px solid #BB2C08;
		}
	}
}
</style>

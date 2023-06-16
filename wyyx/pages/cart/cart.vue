<template>
	<view class="cart">
		<view class="shop-list">
			<!-- 动态绑定class显示删除 -->
			<!-- touchmove滑动时触发end结束 -->
			<view class="item-box" v-for="(item,index) in list" :key="item.id" 
				:class="{active:index==activeIndex}"
				@touchstart="touchStart"
				@touchend="touchEnd(index,$event)"
			>
				<view class="item">
					<!-- 左侧icon选择 -->
					<view class="check-around-box">
						<icon v-if='!item.selected'  @click="changeSelected(index)" type="success_circle" color="#51b897" />
						<icon v-else @click="changeSelected(index)" type="circle" />
					</view>
					<!-- 图片 -->
					<view class="item-img-box">
						<image class="item-img" :src="item.pic" />
					</view>
					<!-- 商品介绍 -->
					<view class="item-info-box">
						<view class="item-title">{{item.name}}</view>
						<view class="item-spec">{{item.info}}</view>

						<view class="item-price">¥{{item.price}}</view>

						<view class="num-box">
							<view class="num-desc" @click="reduce(index,item.id)">-</view>
							<input class="item-input" type="number" disabled="boolean" :value="item.num"/>
							<view class="num-plus" @click="add(index,item.id)">+</view>
						</view>
					</view>
				</view>
				<!-- 删除传id -->
				<view class="remove" @click="deleteGoods(index,item.id)">删除</view>
			</view>
		</view>
		<!-- ----购买 -->
		<view class='bottom'>
			<view class='all'>
				<!--if 是否全选显示不同图标 -->
				<icon v-if='selectedAll' @click="changeSelectedAll" type="success_circle" />
				<icon v-else  @click="changeSelectedAll" type="circle" />
				<text class="check-all">全选</text>
			</view>
			<view class='sum'>
				<text class='he'>合计</text>
				<text>{{totalPrice}} 元</text>
			</view>
		
			<view class='balance' v-if='selectNum > 0'>结算</view>
			<view class='balance-gray balance' v-else>结算</view>
		
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapState} from "vuex"
	export default {
		data() {
			return {
				// selected:-1//选中商品 item.selected
				// selected: true, //选中商品
				selectedAll: true, //全选
				// list: [], //购物车的数据
				activeIndex:-1,//高亮默认为-1
				startX:'',//开始位置点
				num:1,//仓库商品数据数量
				totalPrice:'',//总价格
				selectNum:0,//选中个数
			}
		},
		computed:{
			...mapState('cart',['list']) //页面读取仓库数据
		},
		onLoad() {
			this.cartList()
		},
		methods: {
			...mapMutations('cart',['setList','deleteCart','changeCart','changeSelectedStatus','changeStatus']),
			//点击商品前的选中按钮操作----
			changeSelected(index){
				// this.selected = this.selected ==-1? index:-1;
				// this.list[index].selected = !this.list[index].selected;
				this.changeSelectedStatus(index);
				//价格重新计算p111调用
				this.getTotalPrice();
				 //统计个数--思路:选中num+1 取消 num-1 
				 // 当selectNum==list.length 说明全选 否则为取消全选
				 if(!this.list[index].selected){//false选中
					 this.selectNum += 1
				 }else{
					 this.selectNum -= 1
				 }
				 //最终判断长度,如果相等则全选
				 if(this.selectNum==this.list.length){
					//全选
					 this.selectedAll=true;
				 }else{
					 this.selectedAll=false;
				 }
			},
			//点击全选按钮进行取反操作
			 changeSelectedAll(state,status){
				 //点击选中的状态--目的 取消全选 所有商品列表取消选中状态
				 this.selectedAll= !this.selectedAll;
				 //判断全选按钮状态---选中还是未选中--列表同步操作
				 if(this.selectedAll){//true全选--所有list'里面的selected==false
					this.changeStatus(false);
					this.selectNum=this.list.length;
				 }else{//取消全选
					//取消全选--所有list'里面的selected==true
					this.changeStatus(true);
					this.selectNum=0;
				 }
				 //价格重新计算p111调用
				 this.getTotalPrice();
			 },
			//获取购物车列表数据----
			//正常情况：访问购物车的数据需要登录 用token字段作为请求头校验
			async cartList() {
				let res = await uni.$http(uni.$base.cartList)
				let list=[];
				console.log('购物车列表数据----', res);
				// 有数据读取数据没有返回空数组
				if (res.status == 200) {
					list = res.data.result;
				} else {
					 list = []
				}
				//存储vuex
				this.setList(list);
				// 计算价格
				this.getTotalPrice();
				//统计选中的个数
				this.selectNum==list.length;
			},
			//计算价格---当前商品选中才去计算价格-----
			getTotalPrice(){
				let sum = 0;
				this.list.forEach(ele=>{
					if(!ele.selected){
						sum += ele.num*ele.price
					}else{
						
					}
				})
				this.totalPrice=sum.toFixed(2);
			},
			//删除购物车数据
			deleteGoods(index,id){
				//传id做删除操作
				uni.$http(uni.$base.cartDelete,{loading:false,title:"删除成功"},'get',{id})
				.then(res=>{
					console.log('删除数据库---',res);
					// 修改删除按钮状态
					this.activeIndex=-1;
					// 方法一,重新请求,删除
					// if(res.status==200){
					// 	//删除成功,更新视图
					// 	this.cartList()
					// }
					//方法二:删除当前的数据list=[]购物车列表
					// this.list.splice(index,1);
					//方法三:删除的vuex里面的数据list调用vuex里的deleteCart方法
					// let listData = this.list;
					this.deleteCart({index,num:1});
					// 计算价格
					this.getTotalPrice();
				})
			},
			//增加购物车数据
			add(index,id){
				// 1	点击+,数量修改,
				// 2	修改的数据量同步到数据库
				// this.list[index].num +=1; 因为属于仓库中的数据,可以读取,但是不能修改,必须通过mutations修改
				this.changeCart({index,n:1});//index传给仓库
				//获取仓库数据list[index].num
				//同步后端数据库
				uni.$http(uni.$base.cartUpdate,{loading:false,isShow:false},'get',{
					id,
					num:this.list[index].num
				}).then(res=>{
					console.log('修改----',res);
				})
				// 计算价格
				this.getTotalPrice();
			},
			//减少购物车数据
			reduce(index,id){
				if(this.list[index].num<=1){
					uni.showToast({
						title:"商品至少一件",
						icon:"none"
					})
					return;
				}
				// 1	点击+,数量修改,
				// 2	修改的数据量同步到数据库
				// this.list[index].num +=1; 因为属于仓库中的数据,可以读取,但是不能修改,必须通过mutations修改
				this.changeCart({index,n:-1});//index传给仓库
				//获取仓库数据list[index].num
				//同步后端数据库
				uni.$http(uni.$base.cartUpdate,{loading:false,isShow:false},'get',{
					id,
					num:this.list[index].num
				}).then(res=>{
					console.log('修改----',res);
				})
				// 计算价格
				this.getTotalPrice();
			},
			//点击显示删除按钮(用于测试,原点击事件已删除)
			// showDelete(index){
			// 	this.activeIndex=index;
			// },
			//移动列表
			touchStart(e){
				console.log('start',e.touches[0].pageX);
				this.startX=e.touches[0].pageX;
			},
			//触摸结束时判断方向--左侧滑动---右侧滑动---
			touchEnd(index,e){
				console.log('end',e.changedTouches[0].pageX);
				let endX = e.changedTouches[0].pageX;
				//左侧移动 pageX不断变小 endX < startX  显示删除按钮
				if(endX < this.startX){
					this.activeIndex=index;
				}
				//右侧移动 pageX不断变大 startX < endX  隐藏删除按钮
				if(this.startX <endX){
					this.activeIndex = -1;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart {
			background-color: #f5f5f5;
			min-height: calc(100vh);
		}
	
		.shop-list {
			display: flex;
			flex-direction: column;
			padding-bottom: 160rpx;
		}
	
		.item-box {
			margin-top: 20rpx;
			position: relative;
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			width: 100%;
			overflow: hidden;
			background: #fff;
		}
	
		.item {
			display: flex;
			align-items: center;
			padding: 20rpx;
			position: relative;
			width: 100%;
			margin-right: 0;
			transition: all 0.4s;
			-webkit-transition: all 0.4s;
			// 原本位置往后走x轴90
			-webkit-transform: translateX(90px);
			transform: translateX(90px);
			margin-left: -90px;
		}
	
		.item-img-box {
			margin-left: 10rpx;
		}
	
		.item .item-img {
			width: 180rpx;
			height: 180rpx;
			border-radius: 5rpx;
			border: 1rpx solid #eee;
			padding-left: 10rpx;
		}
	
		.item .item-info-box {
			width: 420rpx;
			height: 200rpx;
			margin-left: 20rpx;
			position: relative;
		}
	
		.item-info-box .item-title {
			font-size: 30rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			word-break: break-all;
		}
	
		.item-info-box .item-spec {
			color: #888;
			margin-top: 15rpx;
			font-size: 12px;
			text-align: justify;
			line-height: 40rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	
		.item-info-box .item-price {
			margin-top: 15rpx;
			color: red;
		}
	
		.item-info-box .num-box {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size: 30rpx;
			position: absolute;
			right: 0;
			bottom: 0rpx;
	
		}
	
		.num-box .num-desc {
			padding: 0 10rpx;
			color: #999;
			border: 4rpx solid #999;
		}
	
		.num-box .item-input {
			width: 80rpx;
		}
	
		.item-input {
			text-align: center;
		}
	
		.num-box .num-plus {
			padding: 0 10rpx;
			color: #fff;
			background-color: #000;
			border: 4rpx solid #000;
		}
	
		.remove {
			background-color: orangered;
			width: 180rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #fff;
			// 删除隐藏
			-webkit-transform: translateX(90px);
			transform: translateX(90px);
			-webkit-transition: all 0.4s;
			transition: all 0.4s;
		}
		.active .item,
		.active .remove {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
	
		/* 结算 */
	
		.bottom {
			position: fixed;
			background: #fff;
			display: flex;
			bottom: 0;
			left: 0;
			right: 0;
		}
	
		.all {
			display: flex;
			align-items: center;
			padding-left: 20rpx;
		}
	
		.sum text {
			color: #51b897;
		}
	
		.sum {
			flex: 1;
			padding-top: 20rpx;
			text-align: right;
		}
	
		.sum .he {
			color: #000;
			margin-right: 10rpx;
		}
	
		.sum .small {
			font-size: 24rpx;
			color: #999;
			margin-left: 10rpx;
		}
	
		.balance {
			margin-left: 10rpx;
			padding: 20rpx;
			text-align: right;
			background: #51b897;
			color: #fff;
		}
	
		.balance-gray {
			background: #999;
		}
	</style>
	
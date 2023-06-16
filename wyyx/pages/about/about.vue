<template>
	<view class="page">
		<view class="header header2">
		  <!-- 头像 -->
		    <view class="head ">
		      <view class="touxiang">
		        <open-data type="userAvatarUrl"></open-data>
		      </view>
		      <view class="nicheng">
		        <open-data type="userNickName"></open-data>
		      </view>
		      <!-- <navigator url="/pages/setup/setup"> -->
		        <view class="shezhi" @click="toSetup">
		          <image src="/static/icon/3.1 设置.png"/>
		        </view> 
		     <!-- </navigator> -->
		    </view> 
		</view>
		<!-- 我的订单 -->
		<view class="order">
		  <view class="header">
		    <text>我的订单</text>
		    <text style="color: #999;">查看全部订单 >></text>
		  </view>
		  <view class="bottom">
		    <view class="bottom1"  v-for="(item,index) in array" :key="item">
		      <view class="fukuan">
		        <image :src="item.pic1"/>
		      </view>
		      <text>{{item.name1}}</text>
		    </view>
		  </view>
		</view>
		<!-- 我的工具 -->
		<view class="gongju">
		  <view class="header">
		    <text>我的工具</text>
		  </view>
		  <view class="bottom">
		    <view class="bottom1">
		      <view class="bottom1-1"  v-for="(item,index) in array2" :key="item">
		      <view class="fukuan">
		        <image :src="item.pic1"/>
		      </view>
		      <text>{{item.name1}}</text>
		    </view>
		    </view>
		    <view class="bottom2">
		      <view class="bottom2-1">
		      <view class="fukuan">
		        <image src="/static/icon/预约.png"/>
		      </view>
		      <text>我的预约</text>
		    </view>
		    </view>
		  </view>
		  
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array:[{
				      pic1:"/static/icon/付款.png",
				      name1:"待付款"
				    },
				    {
				      pic1:"/static/icon/商城.png",
				      name1:"代发货",
				    },
				    {
				      pic1:"/static/icon/物流.png",
				      name1:"待收货"
				    },
				    {
				      pic1:"/static/icon/订单.png",
				      name1:"已完成"
				    }
				  ],
				    array2:[{
				      pic1:"/static/icon/购物车 (1).png",
				      name1:"购物车"
				    },
				    {
				      pic1:"/static/icon/收藏 - 已收藏.png",
				      name1:"我的收藏"
				    },
				    {
				      pic1:"/static/icon/客服.png",
				      name1:"我的客服"
				    },
				    {
				      pic1:"/static/icon/地址.png",
				      name1:"收货地址"
				    }
				  ]
			}
		},
		methods: {
		//点击跳转商品详情界面----------------
			toSetup(){
				uni.navigateTo({
					url:'/pages/setup/setup'
				})
			}
		}
	}
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
}
.page{
  background-color:#F8F8F8;
}
.header{
  height: 210rpx;
  width: 100%;
  color: white;
  background-size: 100% 100%;    
}
.header2{
  background: url(https://img-qn.51miz.com/preview/video/00/00/14/64/V-146499-40DD8509.jpg);
  background-size:100% 100%;
}
.head{
  display: flex;
  flex-direction: row;
}
.touxiang{
  width: 130rpx;
  border-radius: 50%;
  /* 溢出变圆 */
  overflow: hidden;
  box-shadow: 3rpx 3rpx  6rpx #ccc;
  margin-left: 40rpx;
  margin-top: 40rpx;
}
.nicheng{
  color: #333333;
  font-size: 47rpx;
  margin-left: 50rpx;
  margin-top: 70rpx;
}
/* 设置 */
.shezhi{
  width:60rpx;
  height:60rpx;
  margin-top: 76rpx;
  margin-left: 185rpx;
}
/* 我的订单 */
.order{
  margin-top: 30rpx;
  width: 100%;
  height: 300rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
}
.order .header{
  width: 690rpx;
  height: 40rpx;
  font-size: 30rpx;
  color: #666666;
  display: flex;
  justify-content: space-between;
}
.order .bottom{
  width: 640rpx;
  height: 180rpx;
  font-size: 27rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.order .bottom1{
  width: 140rpx;
  height: 140rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.order .fukuan{
  width: 70rpx;
  height: 70rpx;
}
/* 我的工具 */
.gongju{
  margin-top: 30rpx;
  width: 100%;
  height: 390rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
}
.gongju .header{
  width: 690rpx;
  height: 40rpx;
  font-size: 30rpx;
  color: #666666;
  display: flex;
  justify-content: space-between;
}
.gongju .bottom{
  width: 640rpx;
  height: 300rpx;
  font-size: 27rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.gongju .bottom1 {
  width: 640rpx;
  height: 125rpx;
  font-size: 27rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.gongju .bottom1-1{
  width: 140rpx;
  height: 125rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.gongju .bottom2 {
  width: 640rpx;
  height: 125rpx;
  font-size: 27rpx;  
}
.bottom2 .bottom2-1{
  width: 120rpx;
  height: 123rpx;
  margin-left: 15rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.gongju .fukuan{
  width: 58rpx;
  height: 58rpx;
}
</style>
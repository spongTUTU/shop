<template>
	<view class="main">
		<view class="item"  style="height: 150rpx;">
		    <view class="title" style="line-height: 100rpx;">头像</view>
		    <view class="detail" style="width: 100rpx;height: 100rpx;margin-top: 30rpx;">
		      <open-data type="userAvatarUrl"></open-data>
		    </view>
		  </view>
		  <view class="item" >
		    <view class="title">昵称</view>
		    <view class="detail">
		      <text>满洲里有象</text>
		    </view>
		  </view>
		  <view class="item" >
		    <view class="title">性别</view>
		    <view class="detail">
		      <text>请选择</text>
		    </view>
		  </view>
		  <view class="item" >
		    <view class="title">生日</view>
		    <view class="detail">
		      <text>2016-09-01</text>
		    </view>
		  </view>
		  <view class="item" >
		    <view class="title">地区</view>
		    <view class="detail">
		      <text>中国-江苏省-无锡市</text>
		    </view>
		  </view>
		  <view class="item" >
		    <view class="title">推送通知</view>
		    <view class="detail">
		      <switch checked="true" bindchange="" />
		    </view>
		  </view>
		  <view class="xz" >
		    <view class="title">手机号</view>
		    <view class="detail">
		      <text>+86 13401275757</text>
		    </view>
		  </view>
		  <view class="jc" >
		    <view class="title">实名认证</view>
		    <view class="detail">
		      <text>未认证</text>
		    </view>
		  </view>
		 
		    <view class="tui" style="margin: 50rpx auto;">
		      <view class="btn">
		      退出登录
		      </view>
		    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.main{
  height: 1230rpx;
  background-color: #f6f6f6;
}
.m1{
  display: flex;
  background-color: #ffffff;
  border-bottom: 2rpx solid #eeeeee;
}
.title{
  font-size: 34rpx;
  padding-top: 30rpx;
  padding-bottom: 30rpx;
  padding-left: 30rpx;
}
.detail{
  font-size: 34rpx;
  position: absolute;
  right: 20rpx;
  height: 100rpx;
  line-height: 100rpx;
  color: #888;
}
.hei{
  display: flex;
  background-color: #ffffff;
  border-top: 2rpx solid #eeeeee;
  margin-bottom: 20rpx;
}
.item{
  display: flex;
  background-color: #ffffff;
  border-bottom: 2rpx solid #eeeeee;
}
.xz{
  display: flex;
  background-color: #ffffff;
  border-bottom: 2rpx solid #eeeeee;
  margin-top: 20rpx;
}
.jc{
  display: flex;
  background-color: #ffffff;
  border-top: 2rpx solid #eeeeee;
  border-bottom: 2rpx solid #eeeeee;
}
.btn{
  width: 780rpx;
  height: 90rpx;
  margin: 20rpx auto;
  background-color:rgb(236, 88, 88);
  border-radius: 10rpx;
  margin-top: 10rpx;
  color: white;
  text-align: center;
  line-height: 90rpx;
  font-size: 38rpx;
  /* font-weight: bold; */
}
.butt{
  width: 120rpx;
  height: 60rpx;
  margin-top: 25rpx;
  border-radius: 100rpx;
  box-shadow: 1rpx 3rpx 1rpx 4rpx #DFDFDF;
  background: #FDFDFD;
  position: relative;
}
.butt1{
  width: 60rpx;
  height: 60rpx;
  border-radius: 100rpx;
  border:  1rpx solid #f1f1f1;
  box-shadow: 2rpx 0rpx 0rpx 2rpx #DFDFDF;
  background: white;
  position: absolute;
}
</style>

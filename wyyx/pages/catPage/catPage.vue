<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		// 生命周期onload接受地址栏传递的参数
		onLoad(options){
			console.log('options',options);
			this.url=options.url;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

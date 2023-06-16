// import { error } from "console";
// import { resolve } from "dns/promises";

//进行网络请求封装
//参数自行封装
//声明参数说明
// url:接口地址
// method:请求方式
// data参数传递
// options 配置参数{
// 	loading:boolean,是否加载动画
// 	title:"名称"
// }
import base from './base.js'

export default function(url,options={loading:true,isShow:true},method='GET',data={}){//options={loading:true，title}
	
	return new Promise((resolve,reject)=>{
		
		//交互动画
		if(options.loading){
			uni.showLoading({
				title:"数据加载中"
			})
		}
		
		uni.request({
			url:base.host+url,
			method,
			data,
			success:res=>{
				//成功返回数据
				//状态码200成功
				if(res.data.status==200){
					if(options.isShow){
						uni.showToast({
							title:options.title || "数据加载完毕" 
						})
					}
				}
				resolve(res.data)
			},
			fail:error=>{
				//信息提示
				reject(error)
			},
			complete() {
				//成功或失败都执行
				//隐藏动画
				uni.hideLoading()
			}
		})
	})
}
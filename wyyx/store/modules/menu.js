export default{
	namespaced:true,//开启命名空间
	state:{
		navList:[],//存储导航信息
	},
	getters:{
		
	},
	mutations:{
		setNavList(state,payload){
			state.navList=payload;
		}
	},
	actions:{
		//异步请求---把请求在actions里触发
	}
}
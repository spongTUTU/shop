import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);//Vue的插件机制
//导入模块
import menu from "./modules/menu.js"
import cart from "./modules/cart.js"
//Vue.Store构造器选项
const store=new Vuex.Store({
	state:{//存放状态
		// "username":"foo",
		// "age":18
	},
	getters:{
		
	},
	mutations:{
		
	},
	actions:{
		
	},
	modules:{
		menu,
		cart
	}
})
export default store
import App from './App'
import Vue from 'vue'
//导入store
import store from './store'
Vue.config.productionTip = false
// 导入网络请求接口 为了方便在子组件中不需要每次使用import引入,直接挂载到全局
import base from './utils/base.js'
import request from './utils/request.js'
// vue挂载全局
// Vue.prototype.$http=request()
// uni对象上

uni.$http = request;
uni.$base = base;

App.mpType = 'app'
const app = new Vue({
	store,
  ...App
})
app.$mount()

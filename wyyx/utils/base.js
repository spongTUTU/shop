// 公共接口配置
const base={
	//基本域名
	// host:'http://10.211.145.74:7788',//基本域名---小程序
	host:'http://localhost:7788',//基本域名---小程序
	//真机调试
	//1	修改ip地址 查看自己电脑的ip地址 window+R cmd
	//2	ipconfig---ipv4地址 ：7788
	//3 手机连接电脑wifi 同一个局域网
	// host:'/api',//基本的域名---H5
	//首页接口路径
	indexData:'/getIndexData',
	//首页轮播接口
	indexBanner:'/getRecomBanner',
	// 首页分类导航
	indexCateList:'/getIndexCateList',
	//分类列表界面
	categoryData:"/getCategoryDatas",
	// 拿路由的时候多配的一个"api"
	// 分类商品列表界面数据
	goodsList:"/foods/list",
	// 商品详情
	goodsDetail:"/foods/list/detail",
	//购物车数据列表
	cartList:"/cart/list",
	//加入购物车
	cartAdd:"/cart/add",
	// 删除购物车数据
	cartDelete:"/cart/delete",
	//修改购物车数据
	cartUpdate:"/cart/update",
	
}
export default base//导出

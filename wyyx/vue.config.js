//跨域配置--位置：vue-cli官网
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7788',
        ws: true,
        changeOrigin: true,
		pathRewrite:{
			"^/api":""
		}
      },
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  }
}
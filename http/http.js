function req(obj) {
    return new Promise((resolve, reject) => {
        // const HOST = "http://192.168.0.177:8001";  //baseUrl 后台数据请求地址
		// const HOST = "https://www.xiaoyiyiliao.com:8000";  //baseUrl 后台数据请求地址
		const HOST = "http://192.168.0.214:4001";  //baseUrl 后台数据请求地址
		var token = uni.getStorageSync('token');
        var method = obj.method || "GET";
        var url = HOST + obj.url || "";
        var data = obj.data || {};
		//当请求为post的时候更改Content-Type
        var header = obj.header || obj.method == ('post' || 'POST') ? {
            'Content-Type': obj.contentType || 'application/x-www-form-urlencoded',
			'_token': token 
        } : {
            'Content-Type': obj.contentType || 'application/json',
			'_token': token
        };
        var success = obj.success; // 成功回调函数
        var fail = obj.fail; //表示失败后，要执行的回调函数
        uni.request({
            url: url,
            data: data,
            method: method,
            header: header,
            success: ((res) => {
				//403为登录过期
                if (res.data.code === 403) {
                    console.log('返回403状态码')
					setTimeout(function() {
						uni.showToast({
							title:'登录过期，请重新登录！',
							icon:'none'
						})
					}, 1000);
                    // 错误处理，返回登录页
					uni.clearStorage()
                    uni.reLaunch({url:'/pages/index/index'})
                } else if (res.statusCode === 200) {
                    resolve(res)
                }
            }),
            fail: ((err) => {
                reject(err)
            })
        })
    })
}
export default req

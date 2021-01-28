 import baseurl from './config.js'
// 公共的请求
 const request = function(options) {
     options.url = baseurl + options.url;
     try {
       const token = uni.getStorageSync('token');
       // debugger
       if (token) {
         options.header = {
           '_token' :  token,
		   'Content-Type': 'application/x-www-form-urlencoded' ,
         };
		 console.log('成功')
        }else{
			console.log('失败')
            uni.navigateTo({
                url: '../../index/index' 
            });
            return;
        }
     } catch (err) {
      console.log(err)
    }
    return uni.request(options);
  }
export default request;
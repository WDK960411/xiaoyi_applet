<script>
	export default {
		data() {
			return {
				code: '',
				globalData: {
					url: 'http://192.168.0.214:4001/detect/qiNiuFile/upload' // 写入公共的请求域名
				}
			}
		},
		onLaunch: function() {
			this.ifkey() //判断key是否过期
			// if(uni.getStorageSync('userdata') == "" || uni.getStorageSync('userdata') == null){
			// 	this.wxlogin(); //微信登录
			// }else{
			// 	console.log('不为空');
			// }
			this.getnew() //检测是否有新版本
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			//微信登录
			wxlogin(){
				wx.login({
					success: (res) => {
						uni.setStorageSync('code', res.code)
					}
				});
				var _this = this
				setTimeout(function(){
					//获取微信appid
					const accountInfo = wx.getAccountInfoSync();
					_this.api.wxlogin({
						appId: accountInfo.miniProgram.appId,
						Code: uni.getStorageSync('code'),
					}).then((res) => {
						console.log('---------res------------');
						console.log(res);
						if(res.data.code == 200){
							uni.setStorageSync('userdata', res.data.data)
						}
					}).catch((err) => {
						console.log(err);
					})
				},1000)
			},
			//判断用户sessionkey是否过期
			ifkey(){
				//校验sessionkey是否过期
				wx.checkSession({
					success: (res) => {
						console.log('未过期');
						//session_key 未过期，并且在本生命周期一直有效
					},
					fail: (err) => {
						console.log('已过期');
						console.log(err);
						this.wxlogin()
						// session_key 已经失效，需要重新执行登录流程
					}
				})
			},
			//检测是否有新版本
			getnew(){
				if (wx.canIUse('getUpdateManager')) {
					const updateManager = wx.getUpdateManager()
					updateManager.onCheckForUpdate(function(res) {
						console.log('onCheckForUpdate====', res)
						// 请求完新版本信息的回调
						if (res.hasUpdate) {
							console.log('res.hasUpdate====')
							updateManager.onUpdateReady(function() {
								wx.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function(res) {
										console.log('success====', res)
										if (res.confirm) {
											// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
											updateManager.applyUpdate()
										}
									}
								})
							})
							updateManager.onUpdateFailed(function() {
								// 新的版本下载失败
								wx.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
								})
							})
						}
					})
				}
			}
		}
	}
</script>
<style lang="scss">
	@import "uview-ui/index.scss";
</style>
<style>
	/*每个页面公共css */
</style>

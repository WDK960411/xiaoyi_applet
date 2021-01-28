<template>
	<view>
		<view class="index_content">
			<image src="../../static/logo.png" class="index_logo"></image>
			<view class="index_from">
				<u-form :model="form" ref="uForm">
					<u-form-item label-width="150" label="手机号:" ><u-input v-model="form.tel" placeholder="请输入手机号" /></u-form-item>
					<u-form-item label-width="150" label="密码:"><u-input v-model="form.password" placeholder="请输入密码" type="password" /></u-form-item>
					<u-form-item v-show="show" label-width="150" label="验证码:">
						<view class="index_code">
							<u-input v-model="form.code" placeholder="请输入验证码" class="index_input" />
							<view @click="regain" class="index_img">
								<image :src="'data:image/png;base64,'+src"></image>
							</view>
						</view>
					</u-form-item>
				</u-form>
				<radio-group @change="radioChange" class="index_radio">
					<label class="uni-list-cell uni-list-cell-pd" style="display: flex;align-items: center;" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio color="#0DA3B4" style="transform:scale(0.7)" :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
				<view class="index_bottom_text">
					<!-- <view class="index_wangji" @click="register">立即注册</view> -->
					<view class="index_wangji" @click="forget">忘记密码</view>
				</view>
			</view>
			<button class="index_but" @click="login">登录</button>
		</view>
		<!-- <u-tabbar v-model="current" :list="tabbar" active-color="#0DA3B4" inactive-color="#2c2c2c" :before-switch="beforeSwitch" ></u-tabbar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				form:{
					tel:'',
					password:'',
					code:'',
				},
				show:false,
				items: [
					{
						value: '4',
						name: '采集端'
					},
					{
						value: '5',
						name: '检验端'
					},
				            ],
				current:'3',
				type:'3',
				uuid:'',
				src:'',
				tabbar: [
					{
						iconPath: "../../../static/tabbar/home.png",
						selectedIconPath: "../../../static/tabbar/home-1.png",
						text: '首页',
						customIcon: false,
						pagePath: '/pages/home/home', // 1.5.6新增，路径需要以"/"开头
					},
					{
						iconPath: "../../../static/tabbar/my.png",
						selectedIconPath: "../../../static/tabbar/my-1.png",
						text: '我的',
						customIcon: false,
						pagePath: '/pages/index/index', // 1.5.6新增，路径需要以"/"开头
					},
				],
				current1: 1
			}
		},
		onLoad() {
			console.log(this.path);
		},
		methods: {
			//注册
			register(){
				if(this.type == '3'){
					uni.showToast({
						title:'请选择登录端',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:'./register/register?type='+this.type
					})
				}
				
			},
			//忘记密码
			forget(){
				if(this.type == '3'){
					uni.showToast({
						title:'请选择登录端',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:'forget/forget?type='+this.type
					})
				}
			},
			//登录判断按钮
			login(){
				if(this.form.tel == "" && this.form.tel != null ){
					console.log("手机号为空");
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
				}else if(this.form.password == "" && this.form.password != null){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
				}else if(this.type == '3'){
					uni.showToast({
						title:'请选择登录端',
						icon:'none'
					})
				}else{
					this.lylogin()
				}
			},
			//登录
			lylogin(){
				this.api.login({
						loginName:this.form.tel,
						password:this.form.password,
						userType:this.type,
				}).then((res) =>{
						console.log(res);
						//登录成功
						if(res.data.code == 200){
							uni.setStorageSync('token', res.data.data.token) //存入本地缓存
							uni.setStorageSync('userInfo', res.data.data) //存入本地缓存
							uni.setStorageSync('user', res.data.data.user) //存入本地缓存
							// uni.setStorageSync('user', res.data.data.user) //存入本地缓存
							console.log(uni.getStorageSync('token'));
							console.log(uni.getStorageSync('userInfo'));
							uni.showToast({
								title:'登录成功！',
								icon:'none'
							})
							var userInfo =  uni.getStorageSync('userInfo')
							if(userInfo.user.userType == "4"){
								uni.reLaunch({
									url:'../collect/collect'
								})
							}else if(userInfo.user.userType == "5"){
								uni.reLaunch({
									url:'../inspect/inspect'
								})
							}
						}else if(res.data.code == 501){
							//用户名密码错误
							this.uuid = res.data.data.uuid
							this.src = res.data.data.img
							this.show = true
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}else{
							//登录失败
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					
				}).catch((res) =>{
					console.log(res);
				})
			},
			//重新获取验证码
			regain(){
				this.api.captchacreate({}).then((res)=>{
					console.log(res);
					if(res.data.code == 200){
						this.src = res.data.data.img
						this.uuid = res.data.data.uuid
					}
				})
			},
			//单选
			radioChange: function(evt) {
				this.type = evt.detail.value
				console.log(this.current);
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.index_content {
		text-align: center;
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;
		.index_logo {
			height: 200rpx;
			width: 200rpx;
			margin-top: 200rpx;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 50rpx;
			border-radius: 20rpx;
		}
		.index_from{
			width: 70%;
			margin: 0 auto;
			.index_code{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.index_input{
					width: 45%;
				}
				.index_img{
					width: 45%;
					height: 85rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.index_radio{
				margin: 30rpx auto;
				display: flex;
				justify-content: space-between;
			}
			.index_bottom_text{
				display: flex;
				justify-content: space-between;
				.index_wangji{
					margin-top: 20rpx;
					color: rgba(0, 85, 255, .5);
					text-align: right;
				}
			}
			
		}
		
		.index_but{
			width: 70%;
			margin: 40rpx auto;
			font-size: 26rpx;
			background-color: #0DA3B4;
			color: #FFF;
		}
	}

	

</style>

<template>
	<view>
		<view class="forget_from">
			<u-form ref="uForm">
				<u-form-item label-width="150" label="手机号:" ><u-input v-model="tel" placeholder="请输入手机号" /></u-form-item>
				<u-form-item label-width="150" label="验证码:">
					<view class="forget_code">
						<u-input v-model="code" placeholder="请输入验证码" class="forget_input" />
						<view @click="regain" class="forget_but">
							<u-button size="mini" :custom-style="customStyle" @click="getcode" v-if="showText">获取验证码</u-button>
							<u-button size="mini" :custom-style="custom" :disabled="true" v-else>{{second}}s重新发送</u-button>
						</view>
					</view>
				</u-form-item>
				<u-form-item label-width="150" label="新密码:" ><u-input v-model="password" placeholder="请输入新密码" type="password" /></u-form-item>
			</u-form>
		</view>
		<view class="forget_bottom_but">
			<u-button :custom-style="customStyle" @click="submitif">提交</u-button>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				type:'0',
				tel:'',
				password:'',
				code:'',
				customStyle:{
					BackgroundColor:'#0DA3B4',
					Color:'#FFF'
				},
				custom:{
					BackgroundColor:'#a3a3a3',
					Color:'#FFF'
				},
				second:60,
				showText:true,
			}
		},
		onLoad:function(options){
			this.type = options.type
			console.log(this.type);
			
		},
		methods: {
			//提交前的判断
			submitif(){
				if(this.tel == "" && this.tel != null ){
					console.log("手机号为空");
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
				}else if(this.password == "" && this.password != null){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
				}else if(this.code == "" && this.code != null){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
				}else{
					this.submit()
				}
			},
			//提交
			submit(){
					this.api.forgetPassword({
						code:this.code,
						mobile:this.tel,
						password:this.password,
						userType:this.type
					}).then((res) =>{
							console.log(res);
							if(res.data.code == 200){
								uni.showToast({
									title:'修改密码成功！',
									icon:'success',
									duration:3000
								})
								setTimeout(function(){
									uni.navigateBack({})
								},2000)
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
					})
			},
			//倒计时
			getsecond(){
			    this.showText = false
			    var interval = setInterval(() => {
			        let times = --this.second
			        this.second = times<10?'0'+times:times //小于10秒补 0
			    }, 1000)
			    setTimeout(() => {
			        clearInterval(interval)
			        this.second=60
			        this.showText = true
			    }, 60000)
			},    
			//获取验证码
			getcode(){
				if(this.tel == ''){
					uni.showToast({
						title:'请填写手机号',
						icon:'none'
					})
				}else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.tel))){
					uni.showToast({
						title:'手机号有误，请重新检查',
						icon:'none'
					})
				}else{
					this.forget()
				}
			},
			//验证码接口
			forget(){
				this.api.forget({
						phone:this.tel,
						type:this.type
					}).then((res) =>{
							console.log(res);
							if(res.data.code == 200){
								this.showText = false
								this.getsecond()
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
						
					})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.forget_from{
		width: 70%;
		margin: 40rpx auto;
		.forget_code{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
	.forget_bottom_but{
		width: 70%;
		margin: 40rpx auto;
	}
</style>

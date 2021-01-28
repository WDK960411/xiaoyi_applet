<template>
	<view class="collect_content">
		<u-form :model="form" ref="uForm">
			<u-form-item label="采集点名称:" :required="true" label-width="150rpx">
				<u-input v-model="form.name" />
			</u-form-item>
			<u-form-item label="采集点地址:" :required="true" label-width="150rpx">
				<u-input v-model="form.addr" />
			</u-form-item>
			<u-form-item label="采集点电话" :required="true" label-width="150rpx">
				<u-input v-model="form.tel" placeholder="请输入电话号码 "/>
			</u-form-item>
			<u-form-item label="联系人" :required="true" label-width="150rpx">
				<u-input v-model="form.man"  />
			</u-form-item>
		</u-form>
		<view class="collset">
			说明:采集点电话手机,将作为管理员找回密码的短信手机
		</view>
		<view class="bottom_but">
			<u-button throttleTime="2000" :customStyle="customStyle" @click="submit">保存</u-button>
		</view>
		<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle: {
					BackgroundColor: '#0DA3B4',
					Color: '#FFF'
				},
				form: {
					addr: '', //地址
					name: '', //采集人姓名
					tel: '', //手机号	
					man: '', //联系人
				},
				model: {},
				userInfo: {},
			};
		},
		onLoad(options) {
			this.userInfo = uni.getStorageSync('userInfo')
			//将数据赋值
			this.form.samplingName = this.userInfo.org.name === null ? '' : this.userInfo.org.name //采集人
			//获取当前时间填入采集时间
			var newtiem = this.$u.timeFormat(new Date().getTime(), 'yyyy年mm月dd日 hh时MM分ss秒');
			this.form.newtiem = newtiem
			//判断默认送检点是否为空
			if(!this.$u.test.isEmpty(uni.getStorageSync('defaultinspect'))){
				this.form.Inspection = uni.getStorageSync('defaultinspect')
			}
		},
		methods: {
			// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
			confirm(e) {
				console.log(e);
				this.form.Inspection = e[0].label
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				console.log(e);
				var a = ''
				for (var i = 0; i < e.length; i++) {
					a = a + e[i] + ','
				}
				console.log(a);
				this.form.sampleTypes = a
			},
			// 选择是否发热
			radioChange(e) {
				console.log(e);
				if (e == '是') {
					this.form.hot = '1'
				} else {
					this.form.hot = '0'
				}
			},
			radioChangesex(e) {
				console.log(e);
				if (e == '男') {
					this.form.sex = '1'
				} else {
					this.form.sex = '2'
				}
			},
			//识别条形码
			ocr() {
				wx.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						console.log("--------------");
						console.log(res)
						console.log(res.result);
						this.form.codeValue = res.result
					}
				})
			},
			//识别患者信息
			inocr() {
				wx.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						console.log("--------------");
						console.log(res)
						console.log(res.result);
					}
				})
			},
			//提交表单
			submit() {
				console.log(this.form);
				if (this.form.codeValue == "" && this.form.codeValue != null) {
					uni.showToast({
						title: '请输扫描或输入条形码值',
						icon: 'none'
					})
				} else if (this.form.cardId == "" && this.form.cardId != null) {
					uni.showToast({
						title: '请输入身份证号',
						icon: 'none'
					})
				} else if (this.form.addr == "" && this.form.addr != null) {
					uni.showToast({
						title: '请输入现住址',
						icon: 'none'
					})
				} else if (this.form.id == "" && this.form.id != null) {
					uni.showToast({
						title: '请输入订单ID',
						icon: 'none'
					})
				} else if (this.form.mobile == "" && this.form.mobile != null) {
					uni.showToast({
						title: '请输入电话号码',
						icon: 'none'
					})
				} else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.form.mobile))) {
					uni.showToast({
						title: '手机号有误，请重新检查',
						icon: 'none'
					})
				} else if (this.form.samplingName == "" && this.form.samplingName != null) {
					uni.showToast({
						title: '请输入采样人',
						icon: 'none'
					})
				} else {
					console.log('通过审核');
					uni.showModal({
						title: '请确认患者信息！',
						content: '提交后不可修改',
						success: (res) => {
							if (res.confirm) {
								console.log('用户点击确定');
								this.collectsave()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			//提交表单
			collectsave() {
				this.api.collectsave({
					addr: this.form.addr,
					cardId: this.form.cardId,
					codeValue: this.form.codeValue,
					id: this.form.id,
					mobile: this.form.mobile,
					samplingName: this.form.samplingName,
					age: this.form.age,
					hot: this.form.hot,
					name: this.form.name,
					sampleTypes: this.form.sampleTypes,
					sex: this.form.sex,
					workIn: this.form.workIn
				}).then((res) => {
					console.log(res);
					if (res.data.code == 200) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						setTimeout(function() {
							uni.navigateBack({})
						}, 1000);
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				}).catch((err) => {
					console.log(err);
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				})
			}
		}
	};
</script>

<style lang="scss">
	.collect_content {
		margin: 10rpx auto;
		width: 90%;

		.collect_item {
			display: flex;
			justify-content: space-between;
			align-content: center;
		}
		.collset{
			margin: 30rpx auto;
			font-size: 32rpx;
		}
		.bottom_but {
			margin: 10rpx auto;
			width: 90%;
		}
	}
</style>

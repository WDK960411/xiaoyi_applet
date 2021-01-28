<template>
	<view class="collect_content">
		<u-form :model="form" ref="uForm">
			<u-form-item label="条形码编号" label-width="150rpx" :required="true">
				<view class="collect_item">
					<u-input v-model="form.codeValue" placeholder="请扫描或输入编号" />
					<u-icon name="scan" size="50" @click="ocr"></u-icon>
				</view>
			</u-form-item>
			<u-form-item label="扫描二维码" label-width="150rpx" :required="true">
				<view class="collect_item">
					<u-input v-model="form.information" disabled="true" placeholder="请扫描二维码" />
					<u-icon name="scan" size="50" @click="inocr"></u-icon>
				</view>
			</u-form-item>
			<u-form-item label="身份证号码" :required="true" label-width="150rpx">
				<u-input v-model="form.cardId" />
			</u-form-item>
			<u-form-item label="现住址" :required="true" label-width="150rpx">
				<u-input v-model="form.addr" />
			</u-form-item>
			<u-form-item label="订单ID" :required="true" label-width="150rpx">
				<u-input v-model="form.id" />
			</u-form-item>
			<u-form-item label="电话号码" :required="true" label-width="150rpx">
				<u-input v-model="form.mobile" placeholder="请输入电话号码 " />
			</u-form-item>
			<u-form-item label="采样人" :required="true" label-width="150rpx">
				<u-input v-model="form.samplingName" />
			</u-form-item>
			<u-form-item label="送检地点" :required="true" label-width="150rpx">
				<u-input v-model="form.Inspection" placeholder="请选择送检地点" disabled="true" @click="show = true" />
			</u-form-item>
			<u-form-item label="采样日期" label-width="150rpx">
				<u-input v-model="form.newtiem" disabled="true" />
			</u-form-item>
			<u-form-item label="年龄" label-width="150rpx">
				<u-input v-model="form.age" placeholder="请输入年龄" />
			</u-form-item>
			<u-form-item label="姓名" label-width="150rpx">
				<u-input v-model="form.name" placeholder="请输入姓名" />
			</u-form-item>
			<u-form-item label="是否发热" label-width="150rpx">
				<u-radio-group v-model="radio" @change="radioChange">
					<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="标本种类" label-width="150rpx">
				<u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="性别" label-width="150rpx">
				<u-radio-group v-model="radiosex" @change="radioChangesex">
					<u-radio v-for="(item, index) in radioListsex" :key="index" :name="item.name" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="工作单位" label-width="150rpx">
				<u-input v-model="form.workIn" />
			</u-form-item>
		</u-form>
		<view class="bottom_but">
			<u-button throttleTime="2000" :customStyle="customStyle" @click="submit">提交</u-button>
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
					cardId: '', //身份证号
					codeValue: '', //条形码值
					id: '', //订单明细ID	
					mobile: '', //手机号码
					samplingName: '', //采样人
					age: '', //年龄
					hot: '', //是否发热0否1是	
					name: '', //姓名
					sampleTypes: '', //样本种类,多个通过逗号分开:咽拭子,血清IgM,血清IgG。
					sex: '', //性别1:男2：女	
					workIn: '', //工作单位
					newtiem: '' ,//采样日期
					Inspection:'', //送检地点
					information:'' //患者信息
				},
				checkboxList: [{
						name: '咽拭子',
						checked: false,
						disabled: false
					},
					{
						name: '血清IgM',
						checked: false,
						disabled: false
					},
					{
						name: '血清IgG',
						checked: false,
						disabled: false
					}
				],
				radioList: [{
						name: '否',
						disabled: false
					},
					{
						name: '是',
						disabled: false
					}
				],
				radioListsex: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					}
				],
				radio: '',
				radiosex: '',
				list: [
					{
						value: '1',
						label: '送检地点A'
					},
					{
						value: '2',
						label: '送检地点B'
					},
					{
						value: '3',
						label: '送检地点C'
					},
					{
						value: '4',
						label: '送检地点D'
					},
					{
						value: '5',
						label: '送检地点E'
					}
				],
				model: {},
				userInfo: {},
				show:false
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

		.bottom_but {
			margin: 10rpx auto;
			width: 90%;
		}
	}
</style>

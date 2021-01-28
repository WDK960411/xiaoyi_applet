<template>
	<view class="collect_content">
		<view class="top">
			信息填报
		</view>
		<view class="show" v-if="show">
			您已填报，查询检验结果请前往 [ 我的 ]——[ 我的检验 ]中查看
		</view>
		<view class="main" v-if="!show">
			<u-form :model="form" ref="uForm">
				<u-form-item label="真实姓名" :required="true" label-width="150rpx">
					<u-input v-model="form.name" placeholder="请输入真实姓名" />
				</u-form-item>
				<u-form-item label="身份证号" :required="true" label-width="150rpx">
					<u-input v-model="form.cardId" placeholder="请输入身份证号" maxlength="20"/>
				</u-form-item>
				<u-form-item label="电话号码" :required="true" label-width="150rpx">
					<u-input v-model="form.mobile" placeholder="请输入电话号码 " maxlength="15"/>
				</u-form-item>
				<u-form-item label="居住地址" :required="true" label-width="150rpx">
					<u-input v-model="form.addr" placeholder="请输入现居住地址" />
				</u-form-item>
				<u-form-item label="工作单位" label-width="150rpx">
					<u-input v-model="form.workunit" placeholder="请输入工作单位"/>
				</u-form-item>
				<u-form-item label="年龄" label-width="150rpx">
					<u-input v-model="form.age" placeholder="请输入年龄" maxlength="3"/>
				</u-form-item>
				<u-form-item label="性别" label-width="150rpx">
					<u-radio-group v-model="radiosex" @change="radioChangesex">
						<u-radio v-for="(item, index) in radioListsex" :key="index" :name="item.name" :disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
<!-- 				<u-form-item label="填报日期" label-width="150rpx">
					<u-input v-model="form.newtiem" disabled="true" />
				</u-form-item> -->
				<u-form-item label="是否发热" label-width="150rpx">
					<u-radio-group v-model="radio" @change="radioChange">
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
							{{ item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="检验种类" label-width="150rpx">
					<u-checkbox-group @change="checkboxGroupChange">
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name"@click="price(item.price)">
							{{ item.name}}{{'('+'￥'+item.price+')'}}
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
			</u-form>
			<view class="tip">
				<view class="title">
					重要说明
				</view>
				<view class="txt one">
					【咽试子】：用于检测是否携带新冠病毒
				</view>
				<view class="txt two">
					【血清】：用于检测是否带有抗体
				</view>
				<view class="txt three">
					注：需要核算检测报告者请选择【咽试子】
				</view>
			</view>
			<view class="bottom_but">
				<u-button throttleTime="2000" :customStyle="customStyle" @click="submit">立即支付</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				customStyle: {
					BackgroundColor: '#19BE6B',
					Color: '#FFF'
				},
				form: {
					name: '', //真实姓名
					cardId: '', //身份证号
					mobile: '', //手机号码
					addr: '', //居住地址
					workunit: '', //工作单位
					age: '', //年龄
					sex: '', //性别 1:男 2：女	
					// newtiem: '' ,//填报日期
					hot: '', //是否发热 0：否 1：是	
					sampleTypes: '', //样本种类,多个通过逗号分开:咽拭子,血清
					price: '' //价格
				},
				checkboxList: [
					{
						name: '咽拭子',
						price: 120,
						checked: false,
						disabled: false
					},
					{
						name: '血清',
						price: 60,
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
				model: {},
				userInfo: {}
			};
		},
		onLoad() {
			//获取当前时间填入填报时间
			var newtiem = this.$u.timeFormat(new Date().getTime(), 'yyyy年mm月dd日 hh时MM分');
			// this.form.newtiem = newtiem
		},
		methods: {
			// 选择检验种类
			checkboxGroupChange(e) {
				var a = ''
				for (var i = 0; i < e.length; i++) {
					a = a + e[i] + ','
				}
				this.form.sampleTypes = a
				switch (this.form.sampleTypes.length) {
					case 0:
						this.form.price = 0
					break;
					case 3:
						this.form.price = 60
					break;
					case 4:
						this.form.price = 120
					break;
					case 7:
						this.form.price = 180
					break;
				}
			},
			// 选择是否发热
			radioChange(e) {
				if (e == '是') {
					this.form.hot = '1'
				} else {
					this.form.hot = '0'
				}
			},
			//性别
			radioChangesex(e) {
				if (e == '男') {
					this.form.sex = '1'
				} else {
					this.form.sex = '2'
				}
			},
			//提交
			submit() {
				console.log('提交信息',this.form);
				if (this.form.name == "" && this.form.name != null) {
					uni.showToast({
						title: '请输入真实姓名',
						icon: 'none'
					})
				} else if (this.form.cardId == "" && this.form.cardId != null) {
					uni.showToast({
						title: '请输入身份证号',
						icon: 'none'
					})
				} else if (this.form.mobile == "" && this.form.mobile != null) {
					uni.showToast({
						title: '请输入电话号码',
						icon: 'none'
					})
				} else if (this.form.addr == "" && this.form.addr != null) {
					uni.showToast({
						title: '请输入现居住地址',
						icon: 'none'
					})
				} else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.form.mobile))) {
					uni.showToast({
						title: '手机号有误，请重新检查',
						icon: 'none'
					})
				}  else if (this.form.sampleTypes.length === 0) {
					uni.showToast({
						title: '请选择检验种类',
						icon: 'none'
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '请确认填报信息',
						success: (res) => {
							if (res.confirm) {
								this.collectsave()
							} else if (res.cancel) {
								
							}
						}
					});
				}
				//支付成功
				// uni.navigateTo({
				// 	url: '../My/Model/QRcode'
				// })
			},
			//提交表单
			collectsave() {
				this.api.collectsave({
					name: this.form.name,
					cardId: this.form.cardId,
					mobile: this.form.mobile,
					address: this.form.addr,
					workUnit: this.form.workunit,
					age: this.form.age,
					sex: this.form.sex,
					hot: this.form.hot,
					price: this.form.price,
					// newtiem: this.form.newtiem,
					sampleTypes: this.form.sampleTypes,
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
		width: 100%;
		.top{
			width: 100%;
			height: 140rpx;
			line-height: 140rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: 600;
			border-bottom: 2rpx #8F8F94 solid;
			position: fixed;
			top: 0rpx;
			z-index: 999;
			background: #fff;
		}
		.show{
			width: 90%;
			height: 150rpx;
			line-height: 100rpx;
			margin: 0 auto;
			position: relative;
			top: 150rpx;
			font-size: 40rpx;
			font-weight: 600;
			color: #4CD964;
		}
		.main{
			width: 90%;
			height: 100%;
			margin: 0 auto;
			position: relative;
			top: 130rpx;
			z-index: 998;
			.collect_item {
				display: flex;
				justify-content: space-between;
				align-content: center;
			}
			.tip{
				margin-top: 30rpx;
				width: 100%;
				height: 220rpx;
				border: #C0C0C0 2rpx dashed;
				.title{
					width: 100%;
					height: 40rpx;
					color: #FA3534;
					font-size: 28rpx;
					line-height: 40rpx;
					border-radius: 10rpx;
					font-weight: 600;
				}
				.txt{
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					color: #333;
					font-size: 26rpx;
					padding-left: 15rpx;
					box-sizing: border-box;
				}
				.three{
					color: #F0AD4E;
					padding-left: 25rpx;
				}
			}
			.bottom_but {
				margin: 40rpx auto;
				width: 100%;
			}
		}
		
	}
</style>
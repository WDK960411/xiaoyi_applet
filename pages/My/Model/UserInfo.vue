<template>
	<view class="content">
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
				<u-form-item label="是否发热" label-width="150rpx">
					<u-radio-group v-model="radio" @change="radioChange">
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
			</u-form>
			<view class="bottom_but">
				<u-button throttleTime="2000" :customStyle="customStyle" @click="save">保存</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{

		},
		onLoad() {
			
		},
		data() {
			return {
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
					hot: '', //是否发热 0：否 1：是	
				},
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
			}
		},
		methods: {
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
			//保存
			save() {
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
				}  else {
					console.log('通过审核');
					uni.showModal({
						title: '提示！',
						content: '确认提交保存？',
						success: (res) => {
							if (res.confirm) {
								this.collectsave()
							} else if (res.cancel) {
								
							}
						}
					});
				}
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
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.main{
			width: 650rpx;
			margin-top: 30rpx;
			.collect_item {
				display: flex;
				justify-content: space-between;
				align-content: center;
			}
			.bottom_but {
				margin: 40rpx auto;
				width: 100%;
			}
		}
		
	}
</style>

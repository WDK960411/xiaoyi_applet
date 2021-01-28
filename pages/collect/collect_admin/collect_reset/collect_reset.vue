<template>
	<view class="collect_content">
		<u-form :model="form" ref="uForm">
			<u-form-item label="登录名称:" :required="true" label-width="150rpx">
				<u-input v-model="form.name" />
			</u-form-item>
			<u-form-item label="登录密码:" :required="true" label-width="150rpx">
				<u-input v-model="form.password" type="password"/>
			</u-form-item>
		</u-form>
		<view class="bottom_but">
			<u-button throttleTime="2000" :customStyle="customStyle" @click="submit">保存</u-button>
		</view>
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
			}
		},
		methods: {
			
		}
	}
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

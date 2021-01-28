<template>
	<view class="content">
		<view class="main">
			<view class="head">
				请尽快去附近采集点进行样本采集，并出示以下二维码。可长按，保存此二维码，采集后，此二维码将失效。
			</view>
			<view class="QrCode">
				<image :src="codeImg" class="codeimg" mode="" v-if="code_show"></image>
				<view class="codetip" v-if="!code_show">二维码过期或不存在</view>
			</view>
			<view class="footer" @tap="cometo">
				查看附近采集点
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{

		},
		onLoad() {
			let that = this
			uni.getStorage({
			    key: 'code_id',
			    success: function (res) {
			        that.codeId = res.data
			    }
			});
		},
		data() {
			return {
				codeId: '',
				codeImg: '',
				code_show: false
			}
		},
		methods: {
			cometo(){
				uni.navigateTo({
					url: '../../Indexuser/CollectSite'
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
			width: 95%;
			height: 100%;
			margin-top: 20rpx;
			.head{
				width: 90%;
				height: 150rpx;
				line-height: 50rpx;
				text-align: left;
				font-size: 30rpx;
				margin:  20rpx auto;
			}
			.QrCode{
				width: 90%;
				height: 550rpx;
				margin: 0 auto;
				border-radius: 5rpx;
				border: 2rpx #909399 dashed;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.codeimg{
					width: 400rpx;
					height: 400rpx;
					background-size: cover;
				}
				.codetip{
					font-size: 36rpx;
					font-weight: 600;
					color: #606266;
				}
			}
			.footer{
				width: 85%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 28rpx;
				margin: 0 auto;
				margin-top: 100rpx;
				color: #3F536E;
				border: 3rpx #808080 solid;
				border-radius: 10rpx;
			}
		}
		
	}
</style>

<template>
	<view class="content">
		<view class="main">
			<view class="date">时间：{{resultData.date}}</view>
			<view class="photo">
				<image :src="resultData.photo" class="img"></image>
			</view>
			<view class="bottom_but">
					<u-button throttleTime="2000" :customStyle="customStyle" @click="save">保存结果</u-button>
				</view>
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
				resultData:{
					id: 1 ,
					date: '2021-01-27',
					photo: '../../../static/test/photo.jpg'
				}
			}
		},
		methods: {
			save(){
				uni.authorize({
				    scope: 'scope.writePhotosAlbum',
				    success() {
				        uni.chooseImage({
				            count: 1,
				            sourceType: ['camera'],
				            success: function (res) {
				                uni.saveImageToPhotosAlbum({
				                    filePath: this.resultData.photo,
				                    success: function () {
				                        console.log('save success');
				                    }
				                });
				            }
				        });
				    }
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
			margin-top: 40rpx;
			height: 900rpx;
			.date{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 32rpx;
			}
			.photo{
				width: 100%;
				height: 500rpx;
				margin-top: 30rpx;
				.img{
					width: 100%;
					height: 500rpx;
					background-size: cover;
				}
			}
			.bottom_but {
				margin: 40rpx auto;
				width: 100%;
			}
		}
		
	}
</style>

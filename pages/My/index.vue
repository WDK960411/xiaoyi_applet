<template>
	<view class="content">
		<view class="bg">
			<image class="bgimg" src="../../static/bg.jpg"></image>
		</view>
		<view class="user_info">
			<view class="user_img">
				<!-- <image class="userimg" :src="defaultImg" v-if="!user_show"></image> -->
				<image class="userimg" :src="userImg" @click="accredit"></image>
			</view>
			<!-- <view class="user_item login" v-if="!user_show" @tap="login">立即登入</view> -->
			<view class="user_item name">{{userName}}</view>
			<view class="info" @tap="info">编辑资料</view>
		</view>
		<view class="main">
			<ul class="option">
				<li class="list QRcode" @tap="QRcode">
					<!-- <view class="iconfont icon-dingdan" style="color: #3C7FFC;"></view> -->
					<view class="txt">我的二维码</view>
					<image class="you" src="../../static/you.png" mode=""></image>
				</li>
				<li class="list collect" @tap="collect">
					<!-- <view class="iconfont icon-dingdan" style="color: #3C7FFC;"></view> -->
					<view class="txt">附近采集点</view>
					<image class="you" src="../../static/you.png" mode=""></image>
				</li>
				<li class="list inspect" @tap="Inspect">
					<!-- <view class="iconfont icon-jianyan" style="color: #3C7FFC;"></view> -->
					<view class="txt">我的检验</view>
					<image class="you" src="../../static/you.png" mode=""></image>
				</li>
				<li class="list invoice" @tap="Invoice">
					<!-- <view class="iconfont icon-icon_xinyong_xianxing_jijin-" style="color: #3C7FFC;"></view> -->
					<view class="txt">电子发票</view>
					<image class="you" src="../../static/you.png" mode=""></image>
				</li>
			</ul>
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
				// user_show: false,
				// defaultImg: '../../static/userImg.jpg',
				userName: '王某某',
				userImg: '../../static/test/userImg.jpg'
			}
		},
		methods: {
			accredit(){
				
			},
			info(){
				uni.navigateTo({
				    url: './Model/UserInfo'
				});
			},
			//我的二维码
			QRcode(){
				uni.navigateTo({
				    url: './Model/QRcodeList'
				});
			},
			//附近采集点
			collect(){
				uni.navigateTo({
				    url: '../Indexuser/CollectSite'
				});
			},
			//我的检验
			Inspect(){
				uni.navigateTo({
					url: './Model/InspectList'
				});
			},
			//电子发票
			Invoice(){
				uni.showToast({
					title: '敬请期待',
					icon: 'none'
				})
				// uni.navigateTo({
				// 	url: './Model/Invoice'
				// });
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
		.bg{
			width: 100%;
			height: 300rpx;
			margin-top: 40rpx;
			.bgimg{
				width: 100%;
				height: 100%;
				background-size: cover;
			}
		}
		.user_info{
			width: 600rpx;
			height: 250rpx;
			line-height: 250rpx;
			background: #fff;
			border-radius: 30rpx;
			position: absolute;
			top: 270rpx;
			left: 70rpx;
			border: 2rpx #F1F1F1 solid;
			box-shadow: 4rpx;
			.userimg{
				width: 170rpx;
				height: 170rpx;
				background-size: cover;
				border-radius: 50%;
				margin: 40rpx;
				float: left;
			}
			.user_item{
				float: left;
				margin-left: 40rpx;
				font-size: 40rpx;
				font-weight: 600;
			}
			.info{
				width: 100rpx;
				height: 35rpx;
				line-height: 35rpx;
				font-size: 24rpx;
				color: #2979FF;
				position: absolute;
				top: 20rpx;
				right: 20rpx;
			}
		}
		.main{
			width: 690rpx;
			height: 600rpx;
			margin-top: 150rpx;
			.option{
				width:660rpx;
				list-style: none;
				padding: 0;
				margin-top: 50rpx;
				margin-left: 15rpx;
				.list{
					height: 90rpx;
					border-bottom: 2rpx #F1F1F1 solid;
					.iconfont{
						font-size: 36rpx;
						float: left;
						margin-top: 30rpx;
					}
					.txt{
						font-size:30rpx;
						font-family:PingFang SC;
						font-weight:600;
						color:#3c77fc;
						float: left;
						margin-top: 30rpx;
					}
					.you{
						float: right;
						width: 45rpx;
						height: 45rpx;
						margin-top: 30rpx;
					}
				}
				
			}
		}
		
	}
</style>

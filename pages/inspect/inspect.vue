<template>
	<view>
		<view class="top u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20 chaochu">{{name}}</view>
				<view class="u-font-14 u-tips-color">电话：{{tel}}</view>
				<view class="u-font-14 u-tips-color">地址：{{addr}}</view>
			</view>
		</view>
		<!-- <view class="Numbers">
			<view class="text" @click="choujiang(1)">
				<view class="bb">{{totalAmount}}</view>
				<view class="cc">总资金</view>
			</view>
			<view class="text" @click="choujiang(2)">
				<view class="bb">{{wayAmount}}</view>
				<view class="cc">在途资金</view>
			</view>
			<view class="text" @click="choujiang(3)">
				<view class="bb">{{loclAmount}}</view>
				<view class="cc">锁定资金</view>
			</view>
			<view class="text" @click="choujiang(3)">
				<view class="bb">{{enableAmount}}</view>
				<view class="cc">可用资金</view>
			</view>
		</view> -->
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item  icon="scan" title="检验结果录入" @click='inspect'></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="历史检验记录"></u-cell-item>
				<u-cell-item icon="photo" title="编辑资料"></u-cell-item>
				<u-cell-item icon="coupon" title="用户管理"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="退出" @click="out"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'../../../static/logo.png',
				show:true,
				name:'',
				tel:'',
				addr:'',
				totalAmount:0,
				wayAmount:0,
				loclAmount:0,
				enableAmount:0,
			}
		},
		onLoad() {
			var userInfo = uni.getStorageSync('userInfo')
			this.name = userInfo.org.name
			this.tel = userInfo.org.tel
			this.addr = userInfo.org.address
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				this.accountsummary()
				uni.stopPullDownRefresh();
			}, 1500);
		},
		methods: {
			//检验结果录入
			inspect(){
				uni.navigateTo({
					url:'inspect_result/inspect_result'
				})
			},
			//识别条形码
			ocr(){
				wx.scanCode({
					onlyFromCamera: true,
					success (res) {
						console.log("--------------");
						console.log(res)
						console.log(res.result);
					}
				}) 
			},
			//账户余额
			accountsummary(){
				this.api.accountsummary({
				}).then((res) =>{
					console.log("------余额--------");
					console.log(res);
					this.totalAmount = res.data.data.totalAmount
					this.wayAmount = res.data.data.wayAmount
					this.loclAmount = res.data.data.loclAmount
					this.enableAmount = res.data.data.enableAmount
				})
			},
			// 退出
			out(){
				uni.clearStorage()
				setTimeout(function(){
					uni.showToast({
						title:'退出成功！',
						icon:'none'
					})
				})
				uni.reLaunch({url:'../index/index'})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
.top{
	padding-top: 30rpx;
}
.chaochu{
	width: 90%;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
}
.Numbers {
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		margin-top: 20rpx;
		.text {
			text-align: center;
			padding: 20rpx;
			.bb {
				font-weight: bold;
				font-size: 26rpx;
			}
					
			.cc {
				margin-top: 10rpx;
				font-size: 32rpx;
				color: #4F4F4F;
			}
		}
	}
</style>

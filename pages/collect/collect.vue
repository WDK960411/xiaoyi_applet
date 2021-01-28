<template>
	<view>
		<view class="top u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20 chaochu">{{name}}</view>
				<!-- <view class="u-font-14 u-tips-color">联系电话:{{mobile}}</view> -->
			</view>
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view> -->
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
				<u-cell-item icon="bell" title="去采集" @click="Jumplist">
				</u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="photo" title="历史采集"></u-cell-item>
				<u-cell-item icon="coupon" title="编辑资料" @click="collect_set"></u-cell-item>
				<u-cell-item icon="coupon" title="采集员管理" @click="collect_admin"></u-cell-item>
				<u-cell-item icon="coupon" title="修改密码"></u-cell-item>
				<u-cell-item icon="setting" title="设置" @click='setting'></u-cell-item>
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
				mobile:'',
				totalAmount:0,
				wayAmount:0,
				loclAmount:0,
				enableAmount:0,
			}
		},
		onLoad() {
			// this.accountsummary()
			var userInfo = uni.getStorageSync('userInfo')
			this.name = userInfo.user.loginName
			var user = uni.getStorageSync('user')
			this.mobile = user.mobile
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				this.accountsummary()
				uni.stopPullDownRefresh();
			}, 1500);
		},
		methods: {
			//跳转人员管理
			collect_admin(){
				uni.navigateTo({
					url:'collect_admin/collect_admin'
				})
			},
			//跳转信息设置
			collect_set(){
				uni.navigateTo({
					url:'collect_setting/collect_setting'
				})
			},
			//跳转设置
			setting(){
				uni.navigateTo({
					url:'../setting/setting'
				})
			},
			//跳转列表
			Jumplist(){
				uni.navigateTo({
					url:'../detectionlist/collectinformation/collectinformation'
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

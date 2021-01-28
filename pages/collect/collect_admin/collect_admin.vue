<template>
	<view>
		<view>
			<view class="canyu-display1" v-for="(item,index) in 4" :key="index">
				<view class="canyu-head">
					<view style="canyu_title;">张三</view>
					<view style="canyu_title;">采集员</view>
					<view style="canyu_title;">管理员</view>
				</view>
				<view class="canyu_right_but">
					<view class="canyu_beilv" @click="yichu(index)">删除</view>
					<view class="canyu_beilv" @click="reset(item)">重设密码</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				head: "https://thirdwx.qlogo.cn/mmopen/vi_32/lXGp7suiaiaZXBiby3avF0bu284nIT9v4x5Iib3gRHvKe2amxAPcZrkKcFWWozGgpdD8ficibotJgUrr0pb2p0MXUGmw/132",
				choujianghead:[],
				canyunumber:0
			}
		},
		onLoad:function(options){
		},
		onPullDownRefresh() {
			console.log('刷新了');
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 1500);
		},
		methods: {
			reset(item){
				console.log(item);
				uni.navigateTo({
					url:'collect_reset/collect_reset'
				})
			},
			yichu(index){
				uni.showModal({
					title:'确认移除该人员？',
					success: (data) => {
						console.log(data);
						console.log('移除成功');
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f1f1f1;
	}
</style>
<style scoped lang="scss">
.canyu-display{
	// display: flex;
	// align-items: center;
	// justify-content: space-between;
	width: 95%;
	margin: 20rpx auto;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	padding: 20rpx 20rpx 20rpx 20rpx;
	border-bottom: 1rpx solid #f5f5f5;
	background-color: #fff;
	margin-bottom: 0;
	.imgcenter {
		width: 90%;
		// float: left;
		margin: 20rpx auto;
	
		.imga {
			margin: 10rpx 10rpx 10rpx 5rpx;
			width: 70rpx;
			height: 70rpx;
			// border-radius: 50%;
		}
	}
}
.canyu-display1{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 95%;
	margin: 10rpx auto;
	padding: 20rpx 20rpx 20rpx 20rpx;
	border-bottom: 1rpx solid #f5f5f5;
	background-color: #fff;
	
	.canyu-head{
		.canyu_title{
			margin-left: 40rpx;
		}
		.canyu_paiming{
			text-align: center;
			width: 20rpx;
			height: 20rpx;
			line-height: 20rpx;
			margin-right: 40rpx;
		}
		
	}
	.canyu_right_but{
		width: 35%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.canyu_beilv{
			font-weight: bold;
			color: #636363;
			font-size: 26rpx;
			padding: 5rpx 10rpx 5rpx 10rpx ;
			border: 1rpx solid #636363;
		}
	}
	
}
</style>

<template>
	<view>
		<!-- 加载动画 -->
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#fff" inactive-color="#fff" bgColor="#0DA3B4" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" >
						<view class="page-box" v-if="!orderList[0] || orderList[0].length == 0">
							<view>
								<view class="centre">
									<image src="../../static/logo.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
									</view>
								</view>
							</view>
						</view>
						<view class="page-box" v-else>
							<view class="order"  v-for="(item, index) in orderList[0]" :key="index" @click="gocollectinform(item)" >
								<view class="top">
									<view class="left">
										编号:
										<view class="store">{{ item.orderNo }}</view>
										<view class="fuzhi" @click="fuzhi(item)">一键复制</view>
									</view>
									<view class="right">待采集</view>
								</view>
								<view class="item" >
									<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<!-- <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
									</view>
									<!-- <view class="right">
										<view class="price">
											￥{{ item.price }}
										</view>
										<view class="number">x{{ item.number }}</view>
									</view> -->
								</view>
								<view class="total">
									申请时间:
									<text class="total-price">
										<!-- ￥{{ item.price === null ?'0': item.price}} -->
										{{item.createTime}}
									</text>
								</view>
							</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" >
						<view class="page-box" v-if="!orderList[1] || orderList[1].length ==0">
							<view>
								<view class="centre">
									<image src="../../static/logo.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
									</view>
									<!-- <view class="btn">随便逛逛</view> -->
								</view>
							</view>
						</view>
						<view class="page-box" v-else>
							<view class="order"  v-for="(item, index) in orderList[1]" :key="index" @click="gocollectinform(item)" >
								<view class="top">
									<view class="left">
										编号:
										<view class="store">{{ item.orderNo }}</view>
										<view class="fuzhi" @click="fuzhi(item)">一键复制</view>
									</view>
									<view class="right">待采集</view>
								</view>
								<view class="item" >
									<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<!-- <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
									</view>
									<!-- <view class="right">
										<view class="price">
											￥{{ item.price }}
										</view>
										<view class="number">x{{ item.number }}</view>
									</view> -->
								</view>
								<view class="total">
									申请时间:
									<text class="total-price">
										<!-- ￥{{ item.price === null ?'0': item.price}} -->
										{{item.createTime}}
									</text>
								</view>
							</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						</view>
					</scroll-view>
				</swiper-item>
				<!-- <swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" >
						<view class="page-box" v-if="!orderList[2] || orderList[2].length ==0">
							<view>
								<view class="centre">
									<image src="../../static/logo.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
						<view class="page-box" v-else>
							<view class="order"  v-for="(item, index) in orderList[2]" :key="index">
								<view class="top">
									<view class="left">
										订单编号:
										<view class="store">{{ item.store }}</view>
										<view class="fuzhi" @click="fuzhi(item)">一键复制</view>
									</view>
									<view class="right">待收货</view>
								</view>
								<view class="item" >
									<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ item.price }}
										</view>
										<view class="number">x{{ item.number }}</view>
									</view>
								</view>
								<view class="total">
									共--{{ item.number }}件商品 合计:
									<text class="total-price">
										￥{{ item.price === null ?'0': item.price}}
									</text>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item> -->
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderList: [[], []],
			userInfo:{},
			list: [
				{
					name: '待采集',
				},
				{
					name: '已采集'
				}
				// {
				// 	name: '已送检'
				// }
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
		};
	},
	onLoad:function(options){
		this.userInfo = uni.getStorageSync('userInfo')
		this.getOrderList(1);
		this.getOrderList(2);
	},
	methods: {
		//跳转详情
		gocollectinform(item){
			console.log(item);
			var model = JSON.stringify(item)
			uni.navigateTo({
				url:'collectinformation/collectinformation?model='+model
			})
		},
		//复制
		fuzhi(item){
			console.log(item);
			uni.setClipboardData({
				data: item.orderNo,
				success: function() {
					// 添加下面的代码可以复写复制成功默认提示文本`内容已复制` 
					uni.showToast({
						title: '复制成功',
						icon:'none'
					})
				}
			});
		},
		// 页面数据
		getOrderList(number) {
			this.api.waitcollect({
				orgId:this.userInfo.org.id,
				status:number
			}).then((res) =>{
				if(number == 1){
					this.orderList[0] = this.setTime(res.data.data.list)
				}else{
					this.orderList[1] = this.setTime(res.data.data.list)
				}
				console.log(this.orderList);
				this.$forceUpdate()
			}).catch((err) =>{
				console.log(err);
			})
		
		},
		setTime: function(items) {
		    var newItems = [];
		    items.forEach((e) => {
		        newItems.push({
		            codeValue: e.codeValue,
		            createTime: e.createTime,
		            id: e.id,
		            orderNo: e.orderNo,
		            patient: e.patient,
					projectAmount:e.projectAmount,
					projectContent:e.projectContent,
					projectId:e.projectId
		        });
		    });
		    return newItems;
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
			this.getOrderList(index);
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 24rpx;
				font-weight: bold;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				width: 200rpx;
			}
			.fuzhi{
				margin-left: 20rpx ;
				padding: 10rpx 15rpx 10rpx 15rpx ;
				text-align: center;
				border-radius: 20rpx ;
				border: 1rpx solid #AAAAAA;
				font-size: 22rpx;
				color: #AAAAAA;
			}
		}
		.right {
			color: $u-type-warning-dark;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 50rpx;
			}
			.type {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
			}
			.delivery-time {
				color: #e5d001;
				font-size: 24rpx;
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 34rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		display: flex;
		margin-top: 40rpx;
		padding: 0 10rpx;
		justify-content: space-between;
		align-items: center;
		.btn {
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
		}
		.evaluate {
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
		}
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>

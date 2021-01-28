<template>
	<view class="content">
		<view class="main">
			<view class="itemlist" v-for="(item,index) in codeList" :key="item.id" :id="item.id" @tap="details(item.id)">
				<view class="name">{{item.name}}</view>
				<view class="date">{{item.date}}</view>
				<u-icon name="arrow-right" class="right"></u-icon>
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
				codeList:[
					{
						id: 1,
						name: '二维码',
						date: '2021-01-25'
					},
					{
						id: 2,
						name: '二维码',
						date: '2021-01-26'
					},
					{
						id: 3,
						name: '二维码',
						date: '2021-01-27'
					},
					{
						id: 4,
						name: '二维码',
						date: '2021-01-28'
					}
				]
			}
		},
		methods: {
			details(id){
				uni.setStorage({
				    key: 'code_id',
				    data: id,
				    success: function () {
						uni.navigateTo({
							url: './QRcode'
						});
				    }
				});
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
			width: 90%;
			margin-top: 20rpx;
			.itemlist{
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				border-bottom: 2rpx #E4E7ED solid;
				.name{
					width: 40%;
					height: 90rpx;
					line-height: 90rpx;
					float: left;
					text-align: left;
					padding-left: 10rpx;
					box-sizing: border-box;
				}
				.date{
					width: 50%;
					height: 90rpx;
					line-height: 90rpx;
					text-align: right;
					float: left;
					color: #999999;
				}
				.right{
					height: 90rpx;
					line-height: 90rpx;
					float: right;
					text-align: right;
				}
			}
		}
		
	}
</style>

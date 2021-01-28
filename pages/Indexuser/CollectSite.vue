<template>
	<view class="content">
		<view class="main">
			<view class="inspect" v-for="(item,index) in inspect" :key="item.id" :id="item.id">
				<view class="inspect_content inspect_name">
					{{item.name}}
				</view>
				<view class="inspect_content inspect_distance">
					距离当前：{{item.distance+'KM'}}
				</view>
				<view class="inspect_content inspect_address">
					详细地址：{{item.address}}
				</view>
				<view class="inspect_content inspect_phone">
					<view class="content_title">
						客服电话：
					</view>
					<view class="content_txt">
						<view class="phone_nub mobile" @tap="tel">
							{{mobile}}
						</view>
					</view>
				</view>
			</view>
			<uni-popup ref="phone" type="dialog">
			    <uni-popup-dialog type="info" title="是否拨打客服电话？" :duration="0" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components:{
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		onLoad() {
			
		},
		data() {
			return {
				mobile: '4006997118',
				inspect:[
					{
						id: 1,
						name: 'A采集点',
						distance: '2',
						address: '济南市槐荫区XXXXXXX',
						mobile: '053112345',
						tel: '13105311234'
					},
					{
						id: 2,
						name: 'B采集点',
						distance: '7',
						address: '济南市槐荫区XXXXXXX',
						mobile: '053112345',
						tel: '13105311234'
					},
					{
						id: 3,
						name: 'C采集点',
						distance: '9',
						address: '济南市槐荫区XXXXXXX',
						mobile: '053112345',
						tel: '13105311234'
					},
					{
						id: 4,
						name: 'D采集点',
						distance: '12',
						address: '济南市槐荫区XXXXXXX',
						mobile: '053112345',
						tel: '13105311234'
					},
					{
						id: 5,
						name: 'E采集点',
						distance: '15',
						address: '济南市槐荫区XXXXXXX',
						mobile: '053112345',
						tel: '13105311234'
					},
					{
						id: 6,
						distance: '17',
						name: 'F采集点',
						address: '济南市槐荫区XXXXXXX',
						mobile: '053112345',
						tel: '13105311234'
					},
					{
						id: 7,
						name: 'G采集点',
						distance: '20',
						address: '济南市槐荫区XXXXXXX',
						mobile: '053112345',
						tel: '13105311234'
					},
				]
			}
		},
		methods: {
			//拨打检验点电话
			tel(){
				this.$refs.phone.open()
			},
			confirm(done){
				done()
				uni.makePhoneCall({
				    phoneNumber: this.mobile 
				});
			},
			close(done){
				done()
			},
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
			width: 100%;
			height: 95%;
			overflow: auto;
			margin-top: 20rpx;
			.inspect{
				width: 96%;
				height: 260rpx;
				background: #FFFFFF;
				margin: 10rpx auto;
				border-bottom: 2rpx #DBF1E1 solid;
				.inspect_content{
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					text-align: left;
					box-sizing: border-box;
					padding-left: 15rpx;
					font-size: 28rpx;
					color: #333333;
				}
				.inspect_name{
					font-size: 32rpx;
					font-weight: 600;
				}
				.inspect_phone{
					width: 100%;
					height: 60rpx;
					.content_title{
						width: 20%;
						height: 60rpx;
						float: left;
					}
					.content_txt{
						width: 80%;
						height: 60rpx;
						float: left;
						.phone_nub{
							width: 30%;
							height: 60rpx;
							line-height: 60rpx;
							float: left;
							text-align: left;
							color: #2979FF;
						}
					}
				}
			}
		}
		
	}
</style>

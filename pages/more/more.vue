<template>
	<view>
		<view class="home" v-for="(item,index) in olist" :key="index">
			<view class="home_list">
				<view class="list_img">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<view class="list_text">
					<view class="text_title">{{item.name}}</view>
					<view class="text">详细地址:{{item.address}}</view>
					<view class="text">联系电话:{{item.tel}}</view>
				</view>
			</view>
			<u-gap height="10" bg-color="#f3f3f3"></u-gap>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				olist:[],
				isLoad:true,
				page:1,
				limit:5,
			}
		},
		onLoad() {
			this.orglist(this.page,this.limit)
		},
		onPullDownRefresh() {
			this.olist = []
			this.page = 1
			this.isLoad = true
			setTimeout(()=>{
				this.orglist(this.page,this.limit)
				uni.stopPullDownRefresh();
			}, 1500);
		},
		onReachBottom(){
			console.log('到底了')
			if(this.isLoad){
				this.orglist(this.page,this.limit)
			}
		},
		methods: {
			//采集点检查点列表
			orglist(page,limit){
				this.api.orglist({
					orgType:4,
					page:page,
					limit:limit
				}).then((res) =>{
					console.log("--------采集点检查点列表--------");
					console.log(res);
					if(res.data.code == 200){
						//请求成功后判断是不是最后一页，不是最后一页追加到列表中
						if(res.data.data.pages >= this.page){
							this.page+=1
							this.olist = this.olist.concat(res.data.data.list)
						}else{
							uni.showToast({
								title:'暂无更多！',
								icon:'none'
							})
							this.isLoad = false
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
					
					console.log(this.olist);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		.home_list{
			width: 90%;
			margin: 30rpx auto;
			display: flex;
			justify-content: end;
			align-items: center;
			height: 200rpx;
			.list_img{
				width: 40%;
				height: 200rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.list_text{
				margin-left: 30rpx;
				line-height: 50rpx;
				.text_title{
					width: 100%;
					font-weight: bold;
					font-size: 34rpx;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
				}
				.text{
					
				}
			}
		}
	}
</style>

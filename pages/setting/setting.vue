<template>
	<view>
		<view>
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="car" title="默认送检采集点" :value="defaultinspect" @click='show = true'></u-cell-item>
					<!-- <u-cell-item icon="coupon" title="卡券"></u-cell-item> -->
				</u-cell-group>
			</view>
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="close-circle" :center="true" :arrow="false" title="退出" @click="out"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultinspect:'未设置',//默认地址
				list: [
					{
						value: '1',
						label: '送检地点A'
					},
					{
						value: '2',
						label: '送检地点B'
					},
					{
						value: '3',
						label: '送检地点C'
					},
					{
						value: '4',
						label: '送检地点D'
					},
					{
						value: '5',
						label: '送检地点E'
					}
				],
				show:false
			}
		},
		onLoad() {
			//判断默认送检点是否为空
			if(!this.$u.test.isEmpty(uni.getStorageSync('defaultinspect'))){
				this.defaultinspect = uni.getStorageSync('defaultinspect')
			}else{
				console.log('kong');
			}
		}, 
		methods: {
			// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
			confirm(e) {
				console.log(e);
				this.defaultinspect = e[0].label
				uni.setStorageSync('defaultinspect', e[0].label) //存入本地缓存
			},
			//退出
			out(){
				uni.clearStorage()
				setTimeout(function(){
					uni.showToast({
						title:'退出成功！',
						icon:'none'
					})
				})
				uni.reLaunch({url:'../index/index'})
				// this.api.logout({
				// }).then((res) =>{
				// 	console.log(res);
				// 	if(res.data.code == 200){
						
				// 	}else{
				// 		uni.showToast({
				// 			title:'退出失败请重试！',
				// 			icon:'none'
				// 		})
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}
</style>

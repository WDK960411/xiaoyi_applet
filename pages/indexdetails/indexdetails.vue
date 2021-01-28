<template>
	<view>
		<view>
			<image :src="src"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:{}
				
			}
		},
		onLoad:function(a){
			this.list = uni.getStorageSync('details')
			console.log(this.list);
			//动态修改导航栏名称
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

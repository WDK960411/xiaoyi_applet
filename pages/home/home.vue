<template>
	<view>
		<view>
			<view class="wrap">
				<u-swiper :list="list"  name="image" img-mode="aspectFill"></u-swiper>
			</view>
			<!-- <u-button shape="square" size="medium" type="primary" open-type="getUserInfo" @getuserinfo="bindgetuserinfo">登陆</u-button> -->
			<view class="notice">
				<view class="notice_title">公告:</view>
				<view class="notice_text">
					公告说明:
					小医在诊，提供专业的在线检验服务。新型冠状病毒核酸和抗体检测已在苏州市全面展开，可实现在线查询采集点、报告和开发票等全流程检测服务。
				</view>
			</view>
			<view class="title">
				<view class="cai">采集点</view>
				<view class="geng" @click="more">更多</view>
			</view>
			<view class="home" v-for="(item,index) in 3" :key="index">
				<view class="home_list">
					<view class="list_text">
						<view class="text_title">名称：{{item.name}}</view>
						<view class="text">详细地址:{{item.address}}</view>
						<view class="text">联系电话:{{item.tel}}</view>
					</view>
					<view class="list_img" @click="phone(123412341234)">
						<u-icon name="phone" size="60" color="#0DA3B4"></u-icon>
					</view>
				</view>
				<u-gap height="10" bg-color="#f3f3f3"></u-gap>
			</view>
		</view>
		<drag-button :isDock="true" :existTabBar="true" @btnClick="btnClick" />
		<!-- 底部导航栏 -->
		<!-- <u-tabbar v-model="current" :list="tabbar" active-color="#0DA3B4" inactive-color="#2c2c2c" :before-switch="beforeSwitch"></u-tabbar> -->
	</view>
</template>

<script>
	import dragButton from "@/components/drag-button/drag-button.vue";
	export default {
		components: {
			dragButton
		},
		data() {
			return {
				list: [{
					image: '../../../static/banner/banner1.jpg',
				}, {
					image: '../../../static/banner/banner2.jpg'
				}, {
					image: '../../../static/banner/banner3.jpg'
				}],
				olist: [],
				notice: ["小医在诊欢迎您"],
				// tabbar: [{
				// 		iconPath: "../../../static/tabbar/home.png",
				// 		selectedIconPath: "../../../static/tabbar/home-1.png",
				// 		text: '首页',
				// 		customIcon: false,
				// 		pagePath: '/pages/home/home', // 1.5.6新增，路径需要以"/"开头
				// 	},
				// 	{
				// 		iconPath: "../../../static/tabbar/my.png",
				// 		selectedIconPath: "../../../static/tabbar/my-1.png",
				// 		text: '我的',
				// 		customIcon: false,
				// 		pagePath: '', // 1.5.6新增，路径需要以"/"开头
				// 	},
				// ],
				current: 0,
			}
		},
		onShow() {
			this.current = 0
		},
		onLoad() {
			// this.slidelist()
			// this.annoslist()
			// this.orglist()
		},
		methods: {
			//授权
			bindgetuserinfo() {
				var _this = this
				wx.login({
					success: res_login => {
						console.log('-------获取code-------')
						console.log(res_login);
						uni.getUserInfo({
							success: info => {
								console.log('-------获取sessionKey、openid(unionid)-------')
								uni.setStorageSync('nickName', info.userInfo.nickName)
								uni.setStorageSync('head', info.userInfo.avatarUrl)
								this.name = info.userInfo.nickName
								this.touxiang = info.userInfo.avatarUrl
								console.log(info);
								uni.showToast({
									title: '授权成功',
									duration: 1000
								});
								console.log(res_login.code);
								// wx.request({
								// 	url:'https://shui.jdh19.com/api/water/weixin/authorize',
								// 	header: { 'content-type': 'application/x-www-form-urlencoded' },
								// 	method:'POST',
								// 	data:{
								// 		code:res_login.code,
								// 		nick:info.userInfo.nickName,
								// 		head:info.userInfo.avatarUrl,
								// 		city:info.userInfo.city,
								// 		country:info.userInfo.country,
								// 		province:info.userInfo.province,
								// 		sex:info.userInfo.gender,
								// 	},
								// 	success:function(res){
								// 		uni.showToast({
								// 			title: '登陆成功',
								// 			duration: 2000
								// 		});
								// 		console.log(res)
								// 		console.log(res.data.data.openid)
								// 		_this.show=false
								// 		uni.setStorageSync('openid', res.data.data.openid)  //存入本地缓存,key为openid 
								// 		_this.huoqujifen()
								// 	}
								// })
							}
						});
					}
				});
			},
			//打电话
			phone(tel) {
				console.log(tel);
				uni.makePhoneCall({
					phoneNumber: tel //仅为示例
				});
			},
			//点击悬浮按钮
			btnClick() {
				console.log("123");
				var token = uni.getStorageSync('token')
				if (token == '' || token == null || token == undefined) {
					console.log('暂无登录');
					uni.reLaunch({
						url: '../index/index'
					})
				} else {
					//已经登陆
					var userInfo = uni.getStorageSync('userInfo')
					if (userInfo.user.userType == "4") {
						uni.navigateTo({
							url: '../collect/collect'
						})
					} else if (userInfo.user.userType == "5") {
						uni.navigateTo({
							url: '../inspect/inspect'
						})
					} else {

					}
				}
			},
			//跳转详情
			details(item) {
				console.log(item);
				uni.setStorageSync('details', item)
				uni.navigateTo({
					url: '../indexdetails/indexdetails'
				})
			},
			//跳转更多
			more() {
				uni.navigateTo({
					url: '../more/more'
				})
			},
			//采集点检查点列表
			orglist() {
				this.api.orglist({
					orgType: 4,
					page: 1,
					limit: 5
				}).then((res) => {
					console.log("--------采集点检查点列表--------");
					console.log(res);
					this.olist = this.setTime(res.data.data.list)
					console.log(this.olist);
				})
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach((e) => {
					newItems.push({
						address: e.address,
						city: e.city,
						district: e.district,
						name: e.name,
						province: e.province,
						tel: e.tel,
						mobile: e.mobile,
						image: e.image
					});
				});
				return newItems;
			},
			//轮播图
			slidelist() {
				this.api.slidelist({
					userTypes: "1,4,5"
				}).then((res) => {
					console.log("--------轮播图--------");
					console.log(res);
					this.list = res.data.data
				})
			},
			//公告
			// annoslist() {
			// 	this.api.annoslist({
			// 		type: 0
			// 	}).then((res) => {
			// 		console.log("--------公告--------");
			// 		console.log(res);
			// 		var list = []
			// 		for (var i = 0; i < res.data.data.total; i++) {
			// 			list.push(
			// 				res.data.data.list[i].content
			// 			)
			// 		}
			// 		this.notice = list
			// 	})
			// },
			beforeSwitch(index) {
				console.log('首页');
				console.log(index);
				return true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice {
		width: 90%;
		margin: 10rpx auto;
		padding: 20rpx;

		.notice_title {
			font-size: 36rpx;
			font-weight: bold;
		}

		.notice_text {
			width: 90%;
			margin: 10rpx auto;
			font-size: 30rpx;
		}
	}

	.wrap {
		padding: 20rpx;
	}

	.title {
		width: 90%;
		margin: 0 auto;
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f3f3f3;

		.cai {
			font-weight: bold;
			font-size: 36rpx;
		}

		.geng {
			font-weight: bold;
			font-size: 36rpx;
			color: #0DA3B4;
		}
	}

	.home {
		.home_list {
			width: 90%;
			margin: 30rpx auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 200rpx;

			.list_img {

				image {
					width: 100%;
					height: 100%;
				}
			}

			.list_text {
				margin-left: 30rpx;
				line-height: 50rpx;
				width: 60%;
				.text_title {
					width: 100%;
					font-weight: bold;
					font-size: 34rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.text {}
			}
		}
	}
</style>

// pages/login/login.js
import {
	loginapi
} from '../../api/hwm';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		buttons: [{
			text: '关闭'
		}, {
			text: '复制openID'
		}],
		array: ['121.40.190.180', '47.99.165.190'],
		index: 0,
		rules: [{
			name: 'username',
			rules: {
				required: true,
				message: '请输入用户名'
			},
		}, {
			name: 'password',
			rules: {
				required: true,
				message: '请输入密码'
			},
		}],
		formData: {

		},
	},
	handleIPChange(e) {
		const value = e.detail.value
		if (value === '0') {
			getApp().globalData.BASE_URL = 'https://t-vr.biaddti.com/v2'
		} else if (value === '1') {
			getApp().globalData.BASE_URL = 'https://www.en-education.eu.org/v3'
		}
		this.setData({
			index: value
		})
	},
	formInputChange(e) {
		const {
			field
		} = e.currentTarget.dataset
		this.setData({
			[`formData.${field}`]: e.detail.value
		})
	},
	submitForm() {
		this.selectComponent('#form').validate((valid, errors) => {
			console.log('valid', valid, errors)
			if (!valid) {
				wx.showToast({
					icon: 'error',
					title: errors[0].message
				})
			} else {
				const {
					username,
					password
				} = this.data.formData
				console.log(this.data.formData, loginapi)
				if (username === 'admin' && password === 'Abc12345..') {
					wx.reLaunch({
						url: '/pages/admin/admin',
					})
					return
				}
				this.auth(this.loginFc)
			}
		})
	},

	loginFc() {
		const {
			username,
			password
		} = this.data.formData
		wx.showLoading()
		loginapi({
			username,
			password
		}).then(res => {
			console.log(res)
			if (res?.error) {
				wx.showToast({
					icon: 'error',
					title: '用户名或密码错误'
				})
				return
			} else {
				if (res.loggers) {
					wx.hideLoading()
					getApp().globalData.userInfo = {
						username,
						password
					}
					wx.reLaunch({
						url: '/pages/index/index',
					})
					console.log('requestSubscribeMessage')
					wx.requestSubscribeMessage({
						tmplIds: ['_kW4HUYATr8NP-SEpbQ6h1slKCUie8-LO4on57Z9RO4'],
						success(res) {
							console.log(res)
						},
						fail(err) {
							console.log(err)
						}
					})
				} else {
					wx.showToast({
						icon: 'error',
						title: '用户名或密码错误'
					})
				}
			}
		}).catch(() => {
			wx.hideLoading()
		})
	},
	tapDialogButton(e) {
		console.log(e)
		const index = e.detail.index
		if (index === 0) {
			this.setData({
				show: false
			})
		} else {
			const {
				openid
			} = this.data
			wx.setClipboardData({
				data: openid,
				success(res) {
					wx.showToast({
						title: '已复制',
					})
				}
			})
		}
		// this.setData({

		// })
	},
	auth(callback) {
		wx.showLoading()
		const _this = this
		wx.login({
			success: res => {
				console.log(res)
				wx.request({
					url: `https://fantasy943.eu.org/access/get_openid?openid=${res.code}`,
					success(res) {
						const openid = res.data
						console.log('openid', openid)
						_this.setData({
							openid
						})
						wx.showLoading()
						wx.request({
							url: `https://fantasy943.eu.org/access/get_openids`,
							success(res2) {
								const openids = res2.data
								console.log('openids', openids)
								if (openids.includes(openid)) {
									// 成功
									wx.hideLoading()
									callback()
								} else {
									wx.hideLoading()
									_this.setData({
										show: true
									})
								}
							},
							fail(err) {
								console.log(err)
								wx.hideLoading()
							},
							// complete() {
							// 	wx.hideLoading()
							// }
						})
					},
					fail(err) {
						console.log(err)
						wx.hideLoading()
					},
					// complete() {
					// 	wx.hideLoading()
					// }
				})
			},
			// complete() {
			// 	wx.hideLoading()
			// }
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {
		// loginapi({
		// 	username: 1,
		// 	password: 2
		// }).then(res => {
		// 	console.log(res)
		// })
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})
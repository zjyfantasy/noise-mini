// pages/login/login.js
import {
	loginapi
} from '../../api/hwm';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
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
			getApp().globalData.BASE_URL = 'https://www.en-education.eu.org/v2'
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
				})
			}
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
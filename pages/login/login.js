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
			text: '取消'
		}, {
			text: '确认'
		}],
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
							wx.navigateTo({
								url: '/pages/index/index',
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
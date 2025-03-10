// pages/detail/detail.js
import {
	getLoggerapi
} from '../../api/hwm';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		loggerData: {},
		tabs: [{
			label: '信息',
			value: 'info'
		}, {
			label: '信息',
			value: 'info'
		}]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad({
		id
	}) {
		console.log(id)
		wx.showLoading()
		getLoggerapi({
			number: id
		}).then(res => {
			console.log(res)
			// const loggerData = res?.loggers.logger
			let loggerData = {}
			if (Array.isArray(res?.loggers?.logger)) {
				const arr = res?.loggers?.logger?.filter(item => !!item.siteId)
				loggerData = arr[0]
			} else {
				loggerData = res?.loggers.logger
			}
			let Leak = "0",
				Noise = '0',
				Spread = '0'
			if (loggerData.channel1Type === 'Leak') {
				Leak = loggerData.channels.channel[0].lastValue
			}
			if (loggerData.channel2Type === 'Noise') {
				Noise = loggerData.channels.channel[1].lastValue
			}
			if (loggerData.channel3Type === "Spread") {
				Spread = loggerData.channels.channel[2].lastValue
			}
			const batteryCondition = loggerData.batteryCondition / 10
			this.setData({
				loggerData,
				Leak,
				Noise,
				Spread,
				batteryCondition
			})
		}).finally(() => {
			wx.hideLoading()
		})
	},
	handleHistory(e) {
		const {
			logger
		} = e.target.dataset
		console.log(logger)
		wx.getSetting({
			withSubscriptions: true,
			success(res) {
				console.log(res?.subscriptionsSetting?.itemSettings?.['_kW4HUYATr8NP-SEpbQ6h1slKCUie8-LO4on57Z9RO4'])
				if (res?.subscriptionsSetting?.itemSettings?.['_kW4HUYATr8NP-SEpbQ6h1slKCUie8-LO4on57Z9RO4'] === 'accept') {
					wx.requestSubscribeMessage({
						tmplIds: ['_kW4HUYATr8NP-SEpbQ6h1slKCUie8-LO4on57Z9RO4'],
						success(res) {
							console.log(res)
						},
						fail(err) {
							console.log(err)
						}
					})
				}
			}
		})
		wx.navigateTo({
			url: `/pages/report/report?mobileNumber=${logger.mobileNumber}`,
		})
	},
	handleRecording(e) {
		const {
			logger
		} = e.target.dataset
		console.log(logger)
		wx.navigateTo({
			url: `/pages/recording/recording?siteID=${logger.id}`,
		})
	},
	handlePosition(e) {
		const {
			logger
		} = e.target.dataset
		console.log(logger)
		wx.navigateTo({
			url: `/pages/position/position?latitude=${logger.latitude}&longitude=${logger.longitude}&siteId=${logger.siteId}&mobileNumber=${logger.mobileNumber}`,
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

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
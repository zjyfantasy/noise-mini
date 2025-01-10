// pages/map/map.js
import dayjs from 'dayjs'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	handleMarkerTab(e) {
		console.log(e)
		const {
			markerId
		} = e.detail
		wx.navigateTo({
			url: `/pages/detail/detail?id=${markerId}`,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		console.log(options)
		// const {
		// 	loggerData
		// } = getApp().globalData
		// const markers = loggerData.map(item => ({
		// 	id: parseInt(item.serialNumber),
		// 	latitude: item.latitude,
		// 	longitude: item.longitude,
		// 	title: item.siteId,
		// 	// width: 32,
		// 	// height: 48,
		// 	callout: {
		// 		content: item.siteId,
		// 		display: 'ALWAYS',
		// 		borderRadius: 4,
		// 		padding: 8
		// 	}
		// }))
		// const leakLoggers = loggerData.filter(item => item.leakstate === 'Leak')
		// let leakLogger
		// if (leakLoggers.length) {
		// 	leakLogger = leakLoggers[0]
		// } else {
		// 	leakLogger = loggerData[0]
		// }
		// this.setData({
		// 	latitude: leakLogger.latitude,
		// 	longitude: leakLogger.longitude,
		// 	markers
		// })
		const Leak = options.Leak
		let iconPath = ''
		const days = dayjs().diff(options.dateLastMessageReceived, 'day')
		if (days >= 3) {
			// 不正常
			if (Leak === '1') {
				iconPath = '../../assets/images/dot/dot_yellow_red.png'
			} else {
				iconPath = '../../assets/images/dot/dot_yellow.png'
			}
		} else {
			// 正常
			if (Leak === '1') {
				iconPath = '../../assets/images/dot/dot_red.png'
			} else {
				iconPath = '../../assets/images/dot/dot_blue.png'
			}
		}
		console.log('days', days)

		const markers = [{
			id: parseInt(options.serialNumber),
			latitude: options.latitude,
			longitude: options.longitude,
			title: options.siteId,
			iconPath,
			width: 16,
			height: 16,
			callout: {
				content: options.siteId,
				display: 'ALWAYS',
				borderRadius: 4,
				padding: 8
			}
		}]
		this.setData({
			latitude: options.latitude,
			longitude: options.longitude,
			markers
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
		wx.hideHomeButton()
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
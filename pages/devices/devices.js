// pages/devices/devices.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		loggerData: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const {
			loggerData
		} = getApp().globalData
		loggerData.forEach(item => {
			let Leak = "0",
				Noise = '0',
				Spread = '0'
			if (item.channel1Type === 'Leak') {
				Leak = item.channels.channel[0].lastValue
			}
			if (item.channel2Type === 'Noise') {
				Noise = item.channels.channel[1].lastValue
			}
			if (item.channel3Type === "Spread") {
				Spread = item.channels.channel[2].lastValue
			}
			item.Leak = Leak
			item.Noise = Noise
			item.Spread = Spread
		})
		this.setData({
			loggerData
		})
		console.log(this.data.loggerData)
	},

	handleDetail(e) {
		const {
			item
		} = e.currentTarget.dataset
		console.log(item)
		wx.navigateTo({
			url: `/pages/map/map?latitude=${item.latitude}&longitude=${item.longitude}&siteId=${item.siteId}&serialNumber=${item.serialNumber}&dateLastMessageReceived=${item.dateLastMessageReceived}&Leak=${item.Leak}`,
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
		wx.hideHomeButton();
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
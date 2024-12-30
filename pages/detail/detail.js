// pages/detail/detail.js
import {
	getLoggerapi
} from '../../api/hwm';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		loggerData: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad({
		id
	}) {
		console.log(id)
		getLoggerapi({
			serial: id
		}).then(res => {
			console.log(res)
			const loggerData = res?.loggers.logger
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
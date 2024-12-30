// pages/report/report.js
import dayjs from 'dayjs'
import {
	getDataExportAPI
} from '../../api/hwm';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		dataSource: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		getDataExportAPI({
			logger: '8613800142508',
			period: 4
		}).then(res => {
			const dataSource = res.map(item => ({
				...item,
				date: dayjs(item.datetime).format('YYYY年MM月DD日')
			}))
			// console.log(data)
			this.setData({
				dataSource
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
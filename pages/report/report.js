// pages/report/report.js
import dayjs from 'dayjs'
import {
	getDataExportAPI,
	getRecordingsAPI
} from '../../api/hwm';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		dataSource: [],
		end: dayjs().format('YYYY-MM-DD'),
		startDate: dayjs().add(-1, 'year').format('YYYY-MM-DD'),
		endDate: dayjs().format('YYYY-MM-DD'),
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		console.log(options)
		const {
			mobileNumber
		} = options
		this.setData({
			mobileNumber
		})
		this.getDataExport();
		this.getRecordings();
	},

	handleDateStart({
		detail
	}) {
		this.setData({
			startDate: detail.value
		})
	},
	handleDateEnd({
		detail
	}) {
		const {
			startDate
		} = this.data
		const endDate = detail.value
		const sub = dayjs(endDate).diff(startDate, 'day')
		if (sub < 0) {
			wx.showToast({
				icon: "none",
				title: '结束日期不能小于开始日期'
			})
			return
		}
		this.setData({
			endDate: detail.value
		})
		this.getDataExport()
	},

	getDataExport() {
		const {
			mobileNumber,
			startDate,
			endDate
		} = this.data
		console.log(mobileNumber, startDate, endDate)
		getDataExportAPI({
			logger: mobileNumber,
			period: 5,
			startdate: startDate,
			enddate: endDate,
		}).then(res => {
			const dataSource = res?.map(item => ({
				...item,
				date: dayjs(item.datetime).format('YYYY年MM月DD日 HH:mm:ss'),
				dateFormat: dayjs(item.datetime).format('YYYY-MM-DD'),
			}))
			this.setData({
				dataSource
			})
			getApp().globalData.chartsData = dataSource
		})
	},

	getRecordings() {
		getRecordingsAPI({
			siteID: '5391'
		}).then(res => {
			console.log(res)
			this.setData({
				recordings: res
			})
		})
	},

	handleCharts() {
		wx.navigateTo({
			url: '/pages/charts/charts',
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
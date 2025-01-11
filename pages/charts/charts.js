// pages/charts/charts.js
import dayjs from 'dayjs'
import {
	getDataExportAPI
} from '../../api/hwm';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		overdueTaskOption: null,
		end: dayjs().format('YYYY-MM-DD'),
		// startDate: dayjs().add(-1, 'year').format('YYYY-MM-DD'),
		// endDate: dayjs().format('YYYY-MM-DD'),
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const {
			mobileNumber,
			startDate,
			endDate
		} = options
		console.log(mobileNumber, startDate, endDate)
		this.setData({
			mobileNumber,
			startDate,
			endDate
		})
		this.getDataExport()
		// const chartsData = getApp().globalData.chartsData || []
		// const category = chartsData.map(item => item.dateFormat)
		// const leak = chartsData.map(item => item.c1leak / 1000)
		// const spread = chartsData.map(item => item.c3spread / 1000)
		// const noise = chartsData.map(item => item.c2noise / 1000)

		// this.setData({
		// 	overdueTaskOption: {
		// 		grid: {
		// 			top: '5%',
		// 			left: '2%',
		// 			right: '4%',
		// 			bottom: '20%',
		// 			containLabel: true
		// 		},
		// 		xAxis: {
		// 			type: 'category',
		// 			boundaryGap: true,
		// 			data: category,
		// 			axisLabel: {
		// 				rotate: 45
		// 			}
		// 		},
		// 		yAxis: {
		// 			type: 'value'
		// 		},
		// 		dataZoom: [{
		// 				type: 'inside',
		// 				start: 0,
		// 				end: 100
		// 			},
		// 			{
		// 				start: 0,
		// 				end: 100
		// 			}
		// 		],
		// 		series: [{
		// 				name: '是否泄漏',
		// 				type: 'line',
		// 				stack: 'Total',
		// 				data: leak,
		// 				itemStyle: {
		// 					color: '#f60000'
		// 				}
		// 			},
		// 			{
		// 				name: '频宽',
		// 				type: 'line',
		// 				stack: 'Total',
		// 				data: spread,
		// 				itemStyle: {
		// 					color: '#2f4ad9'
		// 				}
		// 			},
		// 			{
		// 				name: '声强',
		// 				type: 'line',
		// 				stack: 'Total',
		// 				data: noise,
		// 				itemStyle: {
		// 					color: '#5cfa35'
		// 				}
		// 			}
		// 		]
		// 	}
		// })
	},

	handleDateStart({
		detail
	}) {
		const {
			endDate
		} = this.data
		const startDate = detail.value
		const sub = dayjs(endDate).diff(startDate, 'day')
		if (sub < 0) {
			wx.showToast({
				icon: "none",
				title: '结束日期不能小于开始日期'
			})
			return
		}
		this.setData({
			startDate
		})
		this.getDataExport()
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
		wx.showLoading()
		getDataExportAPI({
			logger: mobileNumber,
			period: 5,
			startdate: startDate,
			enddate: endDate,
		}).then(res => {
			console.log(res)
			const dataSource = res?.map(item => ({
				...item,
				date: dayjs(item.datetime).format('YYYY年MM月DD日 HH:mm:ss'),
				dateFormat: dayjs(item.datetime).format('YYYY-MM-DD'),
			}))
			// this.setData({
			// 	dataSource
			// })
			// getApp().globalData.chartsData = dataSource
			const chartsData = dataSource || []
			const category = chartsData.map(item => item.dateFormat)
			const leak = chartsData.map(item => item.c1leak / 1000)
			const spread = chartsData.map(item => item.c3spread / 1000)
			const noise = chartsData.map(item => item.c2noise / 1000)

			this.setData({
				overdueTaskOption: {
					grid: {
						top: '5%',
						left: '2%',
						right: '4%',
						bottom: '20%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: true,
						data: category,
						axisLabel: {
							rotate: 45
						}
					},
					yAxis: {
						type: 'value'
					},
					dataZoom: [{
							type: 'inside',
							start: 0,
							end: 100
						},
						{
							start: 0,
							end: 100
						}
					],
					series: [{
							name: '是否泄漏',
							type: 'line',
							stack: 'Total',
							data: leak,
							itemStyle: {
								color: '#f60000'
							}
						},
						{
							name: '频宽',
							type: 'line',
							stack: 'Total',
							data: spread,
							itemStyle: {
								color: '#2f4ad9'
							}
						},
						{
							name: '声强',
							type: 'line',
							stack: 'Total',
							data: noise,
							itemStyle: {
								color: '#5cfa35'
							}
						}
					]
				}
			})
		}).finally(() => {
			wx.hideLoading()
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
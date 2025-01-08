// index.js
import dayjs from 'dayjs'
import {
	getLoggerapi
} from '../../api/hwm';

Page({
	data: {
		datasource: {},
		loggerData: [],
		overdueTaskOption: null,
		overdueTaskOption2: null
	},
	onLoad() {
		wx.login({
			success: res => {
				console.log(res)
				wx.request({
					url: `https://fantasy943.eu.org/api/store_openid?openid=${res.code}`,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		})
		wx.request({
			url: `https://fantasy943.eu.org/api/get_openids`,
			success(res) {
				console.log(res)
			},
			fail(err) {
				console.log(err)
			}
		})
	},
	onShow() {
		wx.hideHomeButton();
	},
	onReady() {
		getLoggerapi().then(res => {
			console.log(res)
			const {
				logger,
				summary
			} = res.loggers
			const loggerData = logger.filter(item => !!item.mobileNumber)
			const leakLoggers = loggerData.filter(item => item.leakstate === 'Leak')
			const leakNum = leakLoggers.length
			const last24Leak = leakLoggers.filter(item => {
				const dateLastMessageReceived = dayjs(item.dateLastMessageReceived)
				const subDays = dayjs().diff(dateLastMessageReceived, 'day')
				return subDays < 1
			})
			getApp().globalData.accountInfo = summary
			getApp().globalData.loggerData = loggerData
			console.log(last24Leak)
			this.setData({
				datasource: res,
				loggerData,
				leakNum,
				last24LeakNum: last24Leak.length
			})
			this.setChartData(leakNum, loggerData.length)
		})
	},
	setChartData(leakNum, loggersNum) {
		this.setData({
			overdueTaskOption: {
				series: [{
					label: {
						show: false,
					},
					name: 'Access From',
					type: 'pie',
					radius: ['30%', '80%'],
					color: ['#F00', '#2f4ad9'],
					data: [{
							value: leakNum,
							name: '漏点数'
						},
						{
							value: loggersNum - leakNum,
							name: '无漏点'
						},
					],
				}]
			},
			overdueTaskOption2: {
				series: [{
					label: {
						show: false,
					},
					name: 'Access From',
					type: 'pie',
					radius: ['30%', '80%'],
					color: ['#f60000', '#f7fa35', '#5cfa35', '#cc35fa'],
					data: [{
							value: leakNum,
							name: '漏点未分类'
						},
						{
							value: 0,
							name: '调查在进行中'
						},
						{
							value: 0,
							name: '等待修复'
						},
						{
							value: 0,
							name: '调查清除'
						},
					],
				}]
			}
		})

	},
	getUserProfile(e) {
		// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		wx.getUserProfile({
			desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				console.log(res)
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		})
	},
})
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
		// const {
		// 	API_URL
		// } = getApp().globalData
		// wx.login({
		// 	success: res => {
		// 		wx.request({
		// 			url: `${API_URL}/store_openid?openid=${res.code}`,
		// 			success(res) {
		// 				console.log(res)
		// 			},
		// 			fail(err) {
		// 				console.log(err)
		// 			}
		// 		})
		// 	}
		// })
	},
	onShow() {
		wx.hideHomeButton();
	},

	async querySubAccount(summary, loggerData, acc) {
		// 有子账户
		const promise = []
		if (summary?.SubAccounts?.SubAccount?.length) {
			summary?.SubAccounts?.SubAccount?.forEach((item) => {
				const AccountID = item.SubAccountID
				promise.push(getLoggerapi({
					AccountID
				}))
			})
			try {
				const res = await Promise.all(promise)
				for (const item of res) {
					const loggers = item.loggers.logger
					const subSummary = item.loggers.summary
					acc.acc = acc.acc + parseInt(subSummary.accountNumLoggers)
					if (Array.isArray(loggers) && loggers?.length > 0) {
						// loggerData.push(...loggers)
						loggers.forEach(logger => {
							// 检查 loggerData 中是否已经存在相同的 loggerid
							if (!loggerData.some(existingLogger => existingLogger.id === logger.id)) {
								loggerData.push(logger)
							}
						})
					}
					await this.querySubAccount(subSummary, loggerData, acc)
				}
			} catch (err) {
				console.log(err)
			}
		}
	},
	onReady() {
		wx.showLoading()
		getLoggerapi().then(async res => {
			const {
				logger,
				summary
			} = res.loggers
			let loggerData;
			if (Array.isArray(logger)) {
				// loggerData = logger.filter(item => !!item.mobileNumber)
				loggerData = logger
			} else {
				loggerData = [logger]
			}

			console.log(summary, summary.SubAccounts)
			let acc = {
				acc: 0
			}
			await this.querySubAccount(summary, loggerData, acc)
			console.log('acc', acc,logger)
			// const loggerData = logger.filter(item => !!item.mobileNumber)
			loggerData = loggerData.filter(item => !!item.mobileNumber)
			// console.log('loggerData', loggerData)
			// console.log('mobileNumber', loggerData.filter(item => !item.mobileNumber))
			const leakLoggers = loggerData.filter(item => item.leakstate === 'Leak')
			const leakNum = leakLoggers.length
			const last24Leak = leakLoggers.filter(item => {
				const dateLastMessageReceived = dayjs(item.dateLastMessageReceived)
				const subDays = dayjs().diff(dateLastMessageReceived, 'day')
				// return subDays < 1 && item.signalStrength > 16
				return subDays < 1
			})
			console.log(leakLoggers, leakNum, last24Leak)

			// const leakLoggersIn = []
			// const repeat = []
			// leakLoggers.forEach(item => {
			// 	if (!leakLoggersIn.some(l => l.mobileNumber === item.mobileNumber)) {
			// 		leakLoggersIn.push(item)
			// 	} else {
			// 		repeat.push(item)
			// 	}
			// })
			// console.log('leakLoggersIn', leakLoggersIn)
			// console.log('repeat', repeat)
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
		}).finally(() => {
			wx.hideLoading()
		})
	},
	setChartData(leakNum, loggersNum) {
		let optionData = []
		if (leakNum > 0) {
			optionData = [{
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
			]
		}
		this.setData({
			overdueTaskOption: {
				series: [{
					label: {
						show: false,
					},
					name: 'Access From',
					type: 'pie',
					radius: ['30%', '80%'],
					color: ['#f60000', '#2f4ad9'],
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
					data: optionData,
				}]
			}
		})

	},
	// getUserProfile(e) {
	// 	// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
	// 	wx.getUserProfile({
	// 		desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
	// 		success: (res) => {
	// 			console.log(res)
	// 			this.setData({
	// 				userInfo: res.userInfo,
	// 				hasUserInfo: true
	// 			})
	// 		}
	// 	})
	// },
})
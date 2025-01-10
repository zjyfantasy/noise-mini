// pages/charts/charts.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		overdueTaskOption: null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const chartsData = getApp().globalData.chartsData || []
		console.log(chartsData)
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
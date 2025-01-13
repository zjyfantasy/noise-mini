// pages/admin/admin.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		value: ''
	},
	exit() {
		wx.reLaunch({
			url: '/pages/login/login',
		})
	},
	formInputChange(e) {
		const value = e.detail.value
		console.log(value)
		this.setData({
			value
		})
	},
	add() {
		const {
			value
		} = this.data
		if (!value) {
			wx.showToast({
				icon: 'error',
				title: '请输入openID'
			})
		}
		wx.showLoading()
		wx.request({
			url: `https://fantasy943.eu.org/access/store_openid?openid=${value}`,
			success(res) {
				console.log(res)
				if (res.data === 'success') {
					wx.showModal({
						title: '',
						content: '添加成功',
						complete: (res) => {
							if (res.cancel) {

							}

							if (res.confirm) {

							}
						}
					})
				}
			},
			fail(err) {
				console.log(err)
			},
			complete() {
				wx.hideLoading()
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

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
// pages/position/position.js
import {
	updateLogger
} from '../../api/hwm';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		buttons: [{
				type: 'default',
				className: '',
				text: '取消',
				value: 0
			},
			{
				type: 'primary',
				className: '',
				text: '确定',
				value: 1
			}
		],
		rules: [{
			name: 'latitude',
			rules: {
				required: true,
				message: '请输入经度'
			},
		}, {
			name: 'longitude',
			rules: {
				required: true,
				message: '请输入纬度'
			},
		}],
		formData: {

		},
	},

	handleLocationChange(e) {
		console.log('handleLocationChange', e)
		const {
			latitude,
			longitude
		} = e.detail
		this.setData({
			location: {
				latitude: latitude.toFixed(6),
				longitude: longitude.toFixed(6)
			}
		})
		console.log(this.data.location)
	},
	buttontap(e) {
		console.log(e)
		const {
			index
		} = e.detail
		if (index === 1) {
			this.setData({
				formData: this.data.location,
				show: false
			})
		} else {
			this.setData({
				show: false
			})
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		console.log(options)
		this.setData({
			loggerData: options,
			formData: {
				latitude: options.latitude,
				longitude: options.longitude
			}
		})
	},

	formInputChange(e) {
		const {
			field
		} = e.currentTarget.dataset
		this.setData({
			[`formData.${field}`]: e.detail.value
		})
	},
	handleLocation() {
		this.setData({
			show: true
		})
	},
	submitForm() {
		this.selectComponent('#form').validate((valid, errors) => {
			console.log('valid', valid, errors)
			if (!valid) {
				wx.showToast({
					icon: 'error',
					title: errors[0].message
				})
			} else {
				console.log(this.data.formData)
				const {
					loggerData,
					formData: {
						latitude,
						longitude
					}
				} = this.data
				console.log(111, updateLogger)
				updateLogger({
					number: loggerData.mobileNumber,
					latitude,
					longitude
				}).then(res => {
					console.log(res.logger_update)
					const {
						result
					} = res.logger_update
					if (result === 'failed') {
						const message = res?.logger_update?.errors?.error?.message?.includes('Permission denied') ? '没有权限' : '更新失败'
						wx.showToast({
							icon: 'error',
							title: message
						})
					} else {
						wx.showToast({
							icon: 'success',
							title: '更新成功'
						})
					}
				})
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
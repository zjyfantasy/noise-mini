// pages/recording/recording.js
import {
	getRecordingsAPI,
	getRecording
} from '../../api/hwm';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		playing: false,
		currentTime: 0,
		audioUrl: '', // 用于存储音频的临时文件路径
		isModalVisible: false, // 控制弹窗显示
		buttons: [{
			text: '关闭'
		}],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		console.log(options)
		const {
			siteID
		} = options
		this.setData({
			id: siteID
		})
		this.getRecordings()
	},

	getRecordings() {
		const {
			id
		} = this.data
		getRecordingsAPI({
			siteID: id,
			Type: 3
		}).then(res => {
			console.log(res)
			this.setData({
				dataSource: res.recordings.recording
			})
		})
	},

	tapDialogButton(e) {
		console.log(e)
		const {
			audioContext
		} = this.data
		this.setData({
			isModalVisible: false,
			playing: false,
			currentTime: 0
		})
		audioContext.pause()
		audioContext.stop()
	},
	// 播放音频
	playAudio: function () {
		const {
			audioContext
		} = this.data
		audioContext.onPlay((e) => {
			console.log('音频开始播放，duration:', audioContext.duration);
			this.setData({
				playing: true
			})
		});
		audioContext.onTimeUpdate((e) => {
			this.setData({
				currentTime: audioContext.currentTime.toFixed(1)
			})
		})
		// audioContext.onError((err) => {
		// 	console.log('音频播放出错', err);
		// 	wx.showToast({
		// 		title: '播放失败',
		// 		icon: 'none'
		// 	});
		// });

		// 播放完毕后关闭弹窗
		audioContext.onEnded(() => {
			console.log('end')
			this.setData({
				// isModalVisible: false,
				playing: false,
				currentTime: audioContext.duration
			});
		});
		audioContext.play()
	},

	pauseAudio() {
		const {
			audioContext
		} = this.data
		audioContext.pause()
		this.setData({
			playing: false
		})
	},

	handleSliderChange(e) {
		console.log(e)
		const {
			audioContext
		} = this.data
		const value = e.detail.value
		this.setData({
			currentTime: value
		})
		audioContext.currentTime = value
	},

	// 取消按钮，关闭弹窗
	closeModal: function () {
		this.setData({
			isModalVisible: false
		});
	},

	handleRecording(e) {
		const {
			item
		} = e.target.dataset
		console.log(item)
		const {
			BASE_URL,
			userInfo
		} = getApp().globalData;
		const _this = this
		wx.downloadFile({
			url: `${BASE_URL}/Datagate/api/getrecordingsapi.ashx?username=${userInfo?.username}&password=${userInfo?.password}&software=HWM+Test&ID=${item.id}`,
			filePath: `${wx.env.USER_DATA_PATH}/audio.wav`,
			success(res) {
				console.log(res)
				const audioContext = wx.createInnerAudioContext();
				audioContext.src = res.filePath; // 设置音频文件的路径		
				audioContext.onCanplay(() => {
					console.log('音频可以播放，duration:', audioContext.duration);
				});
				_this.setData({
					audioUrl: res.filePath,
					isModalVisible: true,
					audioContext,
					duration: audioContext.duration
				})
				console.log('duration1', audioContext.duration)
				setTimeout(() => {
					console.log('duration2', audioContext.duration)
					_this.setData({
						duration: audioContext.duration
					})
				}, 500)
			},
			fail(err) {
				console.log(err)
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
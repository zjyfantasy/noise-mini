import formatXml from '../utils/parseXML'
const request = ({
	url,
	header,
	...rest
}) => {
	return new Promise((resolve, reject) => {
		let HOST = getApp().globalData.BASE_URL;
		wx.request({
			url: `${HOST}/${url}`,
			success(res) {
				if (res.statusCode === 200) {
					if (typeof (res.data) === 'string') {
						const json = formatXml(res.data);
						resolve(json);
					} else {
						resolve(res.data);
					}
				} else {
					reject(res)
					wx.showToast({
						icon: 'none',
						title: res.data.error,
						duration: 3000,
					})
				}
			},
			fail(err) {
				reject(err)
				wx.showToast({
					icon: 'none',
					title: '您的网络发生异常，无法连接服务器',
					duration: 3000
				})
				// wx.hideLoading()
			},
			...rest
		})
	})
}
export default request;
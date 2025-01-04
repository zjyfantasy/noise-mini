// components/chooselocation/chooselocation.js
Component({

	/**
	 * 组件的属性列表
	 */
	properties: {
		location: {
			type: Object,
			value: {}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleTab(e) {
			console.log(e)
			const {
				latitude,
				longitude
			} = e.detail
			const {
				markers
			} = this.data
			markers[0].latitude = latitude.toFixed(6)
			markers[0].longitude = longitude.toFixed(6)
			markers[0].callout.content = `${latitude.toFixed(6)},${longitude.toFixed(6)}`,
				this.setData({
					latitude,
					longitude,
					markers
				})
			this.triggerEvent('locationChange', e.detail);
		}
	},
	observers: {
		'location': function (val) {
			console.log(val)
			const {
				latitude,
				longitude
			} = val
			const markers = [{
				id: 1,
				latitude: latitude,
				longitude: longitude,
				// title: item.siteId,
				callout: {
					content: `${latitude},${longitude}`,
					display: 'ALWAYS',
					borderRadius: 4,
					padding: 8
				}
			}]
			this.setData({
				latitude,
				longitude,
				markers
			})
		}
	}
})
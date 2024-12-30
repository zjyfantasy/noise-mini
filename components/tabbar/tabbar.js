// components/tabbar/tabbar.js
Component({

	/**
	 * 组件的属性列表
	 */
	properties: {
		current: {
			type: Number,
			value: 0
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		tabList: [{
			iconPath: '/assets/images/home.png',
			selectedIconPath: '/assets/images/home-selected.png',
			text: '主页'
		}, {
			iconPath: '/assets/images/device.png',
			selectedIconPath: '/assets/images/device-selected.png',
			text: '设备'
		}, {
			iconPath: '/assets/images/record.png',
			selectedIconPath: '/assets/images/record-selected.png',
			text: '记录'
		}]
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleChange(e) {
			console.log(e)
			const {
				index
			} = e.detail
			switch (index) {
				case 0:
					wx.redirectTo({
						url: '/pages/index/index',
					})
					break;
				case 1:
					wx.redirectTo({
						url: '/pages/map/map',
					})
					break;
				case 2:
					wx.redirectTo({
						url: '/pages/report/report',
					})
					break;
			}
		}
	}
})
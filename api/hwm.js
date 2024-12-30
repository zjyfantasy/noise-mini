import request from './request';

export const loginapi = ({
	username,
	password
}) => request({
	url: `datagate/api/loggerapi.ashx?username=${username}&password=${password}&software=HWM+Test&summaryOnly=on`,
	method: 'GET'
})

export const getLoggerapi = (data) => {
	const {
		userInfo
	} = getApp().globalData
	return request({
		url: `datagate/api/loggerapi.ashx?username=${userInfo?.username}&password=${userInfo?.password}&software=HWM+Test&leakstatus=1`,
		method: 'GET',
		data
	})
}

export const getDataExportAPI = (data) => {
	const {
		userInfo
	} = getApp().globalData
	return request({
		url: `Datagate/api/DataExportAPI.ashx?username=${userInfo?.username}&password=${userInfo?.password}&software=HWM+Test&format=json`,
		method: 'GET',
		data
	})
}
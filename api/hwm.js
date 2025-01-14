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
		url: `datagate/api/loggerapi.ashx?username=${userInfo?.username}&password=${userInfo?.password}&software=HWM+Test&leakstatus=1&ShowSubAccounts=true`,
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

export const getRecordingsAPI = (data) => {
	const {
		userInfo
	} = getApp().globalData
	return request({
		url: `Datagate/api/recordingsapi.ashx?username=${userInfo?.username}&password=${userInfo?.password}&software=HWM+Test&format=json`,
		method: 'GET',
		data
	})
}

export const getRecording = (data) => {
	const {
		userInfo
	} = getApp().globalData
	return request({
		url: `Datagate/api/getrecordingsapi.ashx?username=${userInfo?.username}&password=${userInfo?.password}&software=HWM+Test`,
		method: 'GET',
		data
	})
}

export const updateLogger = (data) => {
	const {
		number,
		latitude,
		longitude
	} = data
	const {
		userInfo
	} = getApp().globalData
	return request({
		url: `Datagate/api/loggerupdateapi.ashx?username=${userInfo?.username}&password=${userInfo?.password}&software=HWM+Test&number=${number}&latitude=${latitude}&longitude=${longitude}`,
		method: 'POST',
	})
}
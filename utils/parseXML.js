/**
 * 将WebService中返回的xml格式的数据转为json
 * <?xml version="1.0" encoding="utf-8"?>
 * <string xmlns="http://app.baosight.com/">string</string>
 */
import {
	DOMParser
} from "xmldom"

function xmlObj2json(xml) {
	try {
		let obj = {};

		// 处理属性
		if (xml.attributes && xml.attributes.length > 0) {
			obj["@attributes"] = {};
			for (let i = 0; i < xml.attributes.length; i++) {
				const attr = xml.attributes.item(i);
				obj["@attributes"][attr.name] = attr.value;
			}
		}

		// 处理子节点
		if (xml.childNodes && xml.childNodes.length > 0) {
			for (let i = 0; i < xml.childNodes.length; i++) {
				const item = xml.childNodes.item(i);
				// 忽略空白文本节点
				if (item.nodeType === 3 && item.textContent.trim() === "") {
					continue;
				}
				const nodeName = item.nodeName;
				// 如果是文本节点，直接取其内容
				if (item.nodeType === 3) {
					return item.textContent.trim();
				}
				// 合并同名子节点
				if (typeof obj[nodeName] === "undefined") {
					obj[nodeName] = xmlObj2json(item);
				} else {
					if (!Array.isArray(obj[nodeName])) {
						obj[nodeName] = [obj[nodeName]]; // 转为数组
					}
					obj[nodeName].push(xmlObj2json(item));
				}
			}
		} else {
			// 如果没有子节点但有内容，直接返回文本内容
			return xml.textContent.trim();
		}

		return obj;
	} catch (e) {
		console.error("Error converting XML to JSON:", e.message);
		return {};
	}
}

/**
 * 
 * @param {string} xmlStr 传入的xml数据
 * @returns 
 */
export default function formatXml(xmlStr) {
	let xmlObj = new DOMParser().parseFromString(xmlStr, 'text/xml')
	var jsonObj = {};
	if (xmlObj.childNodes.length > 0) {
		jsonObj = xmlObj2json(xmlObj);
	}
	return jsonObj;
}
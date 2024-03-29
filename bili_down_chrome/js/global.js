const __DEBUG__ = false;

function crx_log(s) {
	if (__DEBUG__) {
		console.log(s);
	}
}

var NET_REQUEST_RULES = {
	DOWNLOAD_RULE: 1,
	REFERER_BYPASS_RULE: 2,
	CORS_BYPASS_RULE: 3,
	MIN_CUSTOM_RULE: 10000
};

function getCurrentTab(callback) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (callback) callback(tabs.length ? tabs[0] : null);
	});
}

function getTab(tid, callback) {
	chrome.tabs.get(tid, function (tab) {
		if (callback) callback(tab);
	})
}

function close_window() {
	window.close();
}

function open_window(url, options) {
	var top = (window.screen.availHeight - 30 - options.height) / 2;
	var left = (window.screen.availWidth - 10 - options.width) / 2;
	var spec = "width=" + options.width + ",height=" + options.height + ",top=" + top + ",left=" + left;
	spec += ",location=no,status=no,scrollvars=no";
	window.open(url, "_blank", spec);
}

function getQueryStringByUrl(url, name) {
	var params = "";
	var pos = url.indexOf("?");
	if (pos != -1) {
		params = url.substr(pos + 1);
	}
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = params.match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

function queryResource(list, fileName) {
	var datas = list.data;
	for (var i = 0; i < datas.length; i++) {
		if (datas[i].fileName == fileName)
			return i;
	}
	return -1;
}

// add referer parameter to download link
function addRefererSignature(url, k, v) {
	var pos = url.indexOf("?");
	if (pos == -1) {
		return url + "?" + k + "=" + v
	}
	else {
		return url + "&" + k + "=" + v;
	}
}

// get video file name
function get_vn(u) {
	var pos = 0;
	//clear query string
	pos = u.indexOf("?");
	if (pos != -1) {
		u = u.substr(0, pos);
	}
	//clear prefix https://???/???/ remain xxx.m4s
	pos = u.lastIndexOf("/");
	if (pos != -1) {
		u = u.substr(pos + 1);
	}
	return u;
}

// get video id
function get_vid(url) {
	var ret = get_vn(url);
	if (ret != "")
		return ret;
	else {
		var pos = 0;
		//clear query string
		pos = url.indexOf("?");
		if (pos != -1) {
			url = url.substr(0, pos);
			url = url.substr(0, url.length - 1);
			return get_vn(url);
		}
	}
}
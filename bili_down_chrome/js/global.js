const __DEBUG__ = true;

function crx_log(s) {
	if (__DEBUG__) {
		console.log(s);
	}
}

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

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}


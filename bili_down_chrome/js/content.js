// var url_list = [];
// var vn_list = [];
var resourceList = {
    url: null,
    data: []
};

function getTypeAndQual(fileName) {
    var qual = 0;
    var type = 0;
    var pref = fileName.replace(".m4s", "");
    var pos = pref.lastIndexOf("-");
    if (pos != -1) {
        pref = pref.substr(pos + 1);
    }
    var para = parseInt(pref);
    if ((para < 30200) && (para > 30000)) {
        //video
        type = 0;
        qual = para - 30000;
    }
    else if (para < 30400) {
        //audio
        type = 1;
        qual = para - 30200;
    }
    else {
        //unkown? maybe video
        type = -1;
        qual = para % 200;
    }
    return {
        type: type,
        qual: qual
    }
}

function requestEvent(url) {
    //get video name ****.m4s
    var vn = get_vn(url);
    var pos = queryResource(resourceList, vn);
    crx_log('Accepted a link:' + url + '\r\n' + "Video name:" + vn);
    var tq = getTypeAndQual(vn);
    var item = {
        fileName: vn,
        url: url,
        type: tq.type,
        qual: tq.qual
    }
    if (pos == -1) {
        // new resource
        resourceList.data.push(item);
    }
    else {
        // refresh old resource
        if (resourceList.data[pos].url != url) {
            resourceList.data[pos].url = url;
        }
    }
}

// tab url changed event
var onUpdateUrl = function (url) {
    resourceList.url = url;
    resourceList.data = [];
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var mid = request.mid;
        var response = {};
        if (mid == 0) {
            requestEvent(request.url);
        }
        else if (mid == 1) {
            response = resourceList;
        }
        else if (mid == 2) {
            onUpdateUrl(request.url);
        }
        sendResponse(response);
    });

$(function () {
    resourceList.url = window.location.href;
})

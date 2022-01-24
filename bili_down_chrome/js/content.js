// var url_list = [];
// var vn_list = [];
var resourceList = {
    url: null,
    data: []
};

// get video name
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

function do_ins(tot_html) {
    $('#dl-disp').remove();
    var ins = $('<div id="dl-disp"></div>');
    ins.append("<br /><p>本喵已经资瓷直接点击下载以下链接(它们包含了视频和音频):</p>");
    ins.append("<p>如果下载速度较慢，可以复制本页面的URL和资源URL，使用多线程下载工具<a href='https://github.com/MNTMDEV/bilidown_py'>bilidown_py</a>下载呢！</p>");
    ins.append(tot_html);
    $('#viewbox_report').after(ins);
    $('#player_module').after(ins);
}

function requestEvent(url) {
    //get video name ****.m4s
    var vn = get_vn(url);
    var pos = queryResource(resourceList, vn);
    crx_log('Accepted a link:' + url + '\r\n' + "Video name:" + vn);
    var item = {
        fileName: vn,
        url: url
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

// TODO remove in the next generation
function getResourceEvent() {
    //controll
    var tot_html = "<ul>";
    for (var i = 0; i < resourceList.data.length; i++) {
        var remark = "类型:";
        var qual = 0;
        var pref = resourceList.data[i].fileName.replace(".m4s", "");
        var pos = pref.lastIndexOf("-");
        if (pos != -1) {
            pref = pref.substr(pos + 1);
        }
        var para = parseInt(pref);
        crx_log(resourceList.data[i].fileName);
        if (para < 30200) {
            remark += "视频";
            qual = para - 30000;
        }
        else {
            remark += "音频";
            qual = para - 30200;
        }
        remark += ";质量:";
        remark += qual;
        var line = "资源" + (i + 1) + "(" + remark + ") ";
        var down_link = "<a href='" + resourceList.data[i].url + "'>下载资源</a> ";
        tot_html += "<li>";
        tot_html += line;
        tot_html += down_link;
        tot_html += "</li>";
    }
    tot_html += "</ul>";
    do_ins(tot_html);
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
            getResourceEvent();
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

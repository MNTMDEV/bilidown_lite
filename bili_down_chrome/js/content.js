const JSON_PREFIX = "window.__playinfo__=";
const SCRIPT_FILTER = /;*/;
var tabData = {
    dashData: null,
    url: null
}

var initPageInfo = function () {
    tabData.dashData = null;
    $('script').each(function () {
        var content = $(this).text();
        if (!content.startsWith(JSON_PREFIX)) {
            return;
        }
        tabData.dashData = JSON.parse($(this).text().replace(SCRIPT_FILTER, '').replace(JSON_PREFIX, '').trim()).data;
        crx_log(tabData.dashData.dash);
    });
}

// tab url changed event
var onUpdateUrl = function (url) {
    //not initiated
    if (tabData.url == null) {
        return;
    }
    if (url != tabData.url) {
        //refresh dom
        location.reload();
    }
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var mid = request.mid;
        var response = {};
        if (mid == 1) {
            initPageInfo();
            response = tabData;
        }
        else if (mid == 2) {
            onUpdateUrl(request.url);
        }
        sendResponse(response);
    });

$(function () {
    initPageInfo();
    tabData.url = window.location.href;
})

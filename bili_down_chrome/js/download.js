// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

// variables
var currentTab = null;
var tabData = null;
// chrome events

var processLoadingError = function () {
    alert("页面未加载完成或页面不是bili视频页");
    window.close();
}

var processRequestHandler = function (url) {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [2],
        addRules: [{
            id: 2,
            priority: 1,
            condition: {
                "urlFilter": "https://*/upgcxcode/*",
                "resourceTypes": ["main_frame"]
            },
            action: {
                type: "modifyHeaders",
                requestHeaders: [{
                    header: "Referer",
                    operation: "set",
                    value: url
                }]
            }
        }]
    });
}

var processResponse = function (response) {
    tabData = response;
    if (tabData.dashData == null) {
        return;
    }
    processRequestHandler(tabData.url);
    var datas = tabData.dashData.dash;
    crx_log(datas);
    var aFlag = datas.audio.length > 0;
    var vFlag = datas.video.length > 0;
    for (var i = 0; i < datas.audio.length; i++) {
        var data = datas.audio[i];
        var fileName = get_vn(data.baseUrl);
        data.fileName = fileName;
        var option = $('<option></option>');
        option.val(i);
        option.text(fileName);
        $('#audioSel').append(option);
    }

    for (var i = 0; i < datas.video.length; i++) {
        var data = datas.video[i];
        var fileName = get_vn(data.baseUrl);
        data.fileName = fileName;
        var option = $('<option></option>');
        option.val(i);
        option.text(fileName);
        $('#videoSel').append(option);
    }
    //init
    if (aFlag)
        updateAudioInfo();
    if (vFlag)
        updateVideoInfo();
    setTitleInfo();
}

var getTabCallback = function (tab) {
    currentTab = tab;
    chrome.tabs.sendMessage(currentTab.id,
        {
            mid: 1
        },
        function (response) {
            if (chrome.runtime.lastError) {
                processLoadingError();
            } else {
                processResponse(response);
            }
        });
}

// initialize popup page

var initUI = function () {
    var tid = parseInt(getQueryString("tid"));
    getTab(tid, getTabCallback);
}
$(function () {
    initUI();
})

var updateAudioInfo = function () {
    var index = parseInt($('#audioSel').val());
    var data = tabData.dashData.dash.audio[index];
    $('#fn-a').text(data.fileName);
    $('#fn-a').attr('href', data.baseUrl);
    $('#qual-a').text(data.id - 30200);
};

var updateVideoInfo = function () {
    var index = parseInt($('#videoSel').val());
    var data = tabData.dashData.dash.video[index];
    $('#fn-v').text(data.fileName);
    $('#fn-v').attr('href', data.baseUrl);
    $('#qual-v').text(data.id);
};


// jquery event functions
var setTitleInfo = function () {
    var title = currentTab.title;
    var url = tabData.url;
    var vid = get_vid(url);
    var totalTitle = title + "(" + vid + ")";
    $('#v-title').text(totalTitle);
}

$('#audioSel').change(function () {
    updateAudioInfo();
});

$('#videoSel').change(function () {
    updateVideoInfo();
});

$('#callClientBtn').click(function () {
    var url = "bilidown://total/";
    var aIndex = $('#audioSel').val();
    var vIndex = $('#videoSel').val();
    if ((aIndex == null) || (vIndex == null)) {
        alert("请选择要下载的视频和音频");
        return;
    }
    var dashObj = tabData.dashData.dash;
    var audioUrl = dashObj.audio[parseInt(aIndex)].baseUrl;
    var videoUrl = dashObj.video[parseInt(vIndex)].baseUrl;
    var payload = get_vid(tabData.url) + "?a=" + window.encodeURIComponent(audioUrl) + "&v=" + window.encodeURIComponent(videoUrl);
    url += payload;
    crx_log(url);
    window.open(url);
    window.close();
})
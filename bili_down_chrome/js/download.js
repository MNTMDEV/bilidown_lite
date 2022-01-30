// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

// variables
var currentTab = null;
var resourceList = null;
// chrome events

var processLoadingError = function () {
    alert("页面未加载完成或页面不是bili视频页")
    window.close();
}

var processResponse = function (response) {
    resourceList = response;
    var datas = resourceList.data;
    crx_log(resourceList);
    var aFlag = false;
    var vFlag = false;
    for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        var fileName = data.fileName;
        var option = $('<option></option>');
        option.val(i);
        option.text(fileName);
        if (data.type == 1) {
            $('#audioSel').append(option);
            aFlag = true;
        } else {
            $('#videoSel').append(option);
            vFlag = true;
        }
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
    var data = resourceList.data[index];
    $('#fn-a').text(data.fileName);
    $('#fn-a').attr('href', addRefererSignature(data.url, 'ref', window.btoa(resourceList.url)));
    $('#qual-a').text(data.qual);
};

var updateVideoInfo = function () {
    var index = parseInt($('#videoSel').val());
    var data = resourceList.data[index];
    $('#fn-v').text(data.fileName);
    $('#fn-v').attr('href', addRefererSignature(data.url, 'ref', window.btoa(resourceList.url)));
    $('#qual-v').text(data.qual);
};


// jquery event functions
var setTitleInfo = function () {
    var title = currentTab.title;
    var url = resourceList.url;
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
    var audioUrl = resourceList.data[parseInt($('#audioSel').val())].url;
    var videoUrl = resourceList.data[parseInt($('#videoSel').val())].url;
    var pageUrl = resourceList.url;
    var payload = {
        a: audioUrl,
        v: videoUrl,
        p: pageUrl
    };
    url += window.btoa(JSON.stringify(payload));
    crx_log(url);
    window.location.href = url;
})
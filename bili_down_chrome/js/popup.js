// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

// variables
var currentTab = null;
var userInfo = null;

// chrome events
// tab info callback in initial process
var initTabCallback = function (tab) {
    currentTab = tab;
    crx_log(tab);
}

// initialize popup page

var initUI = function () {
    getCurrentTab(initTabCallback);
    $.ajax(
        {
            url: "https://api.bilibili.com/x/web-interface/nav",
            data: "",
            success: function (data) {
                userInfo = data.data;
                $('#bili-avatar').attr('src', userInfo.face);
            }
        });
}
initUI();

// jquery event functions
$('#queryResource').click(function () {
    open_window("download.html?tid=" + currentTab.id, {
        width: 500,
        height: 280
    });
    // chrome.tabs.sendMessage(currentTab.id,
    //     {
    //         mid: 1
    //     },
    //     function (response) {
    //         if (chrome.runtime.lastError) {
    //             // alert("页面未加载完成或页面不是bili视频页")
    //         }
    //         crx_log('Response');
    //     });
})

$('#displayAbout').click(function () {
    open_window("about.html", {
        width: 300,
        height: 250
    });
})

$('#displayHelp').click(function () {
    open_window("help.html", {
        width: 300,
        height: 250
    });
})

$('.nav a').click(function () {
    close_window();
})

// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

// variables
var currentTab = null;
// chrome events
var getTabCallback = function (tab) {
    currentTab = tab
    chrome.tabs.sendMessage(currentTab.id,
        {
            mid: 1
        },
        function (response) {
            if (chrome.runtime.lastError) {
                // alert("页面未加载完成或页面不是bili视频页")
            }
            crx_log('Response is:');
            crx_log(response);
        });
}

// initialize popup page

var initUI = function () {
    var tid = parseInt(getQueryString("tid"));
    getTab(tid, getTabCallback);
}
initUI();

// jquery event functions

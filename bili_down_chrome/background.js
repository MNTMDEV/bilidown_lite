// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

importScripts('js/global.js');

var updateTargetTabUrl = function (tid, changeInfo, tab) {
    if (changeInfo.url != undefined) {
        chrome.tabs.sendMessage(tid,
            {
                mid: 2,
                url: tab.url
            },
            function (response) {
                if (chrome.runtime.lastError) {
                    crx_log('Invalid content page');
                }
            });
    }
}

// binary content-type for downloading
chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [{
        id: 1,
        priority: 1,
        condition: {
            "urlFilter": "https://*/upgcxcode/*",
            "resourceTypes": ["main_frame"]
        },
        action: {
            type: "modifyHeaders",
            responseHeaders: [{
                header: "Content-Type",
                operation: "set",
                value: "application/octet-stream"
            }]
        }
    }]
});
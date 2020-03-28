// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

//click event
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id,
    {
      mid: 1
    },
    function (response) {
      console.log('Response');
    });
});

function sendPackInfo(tid,url){
  chrome.tabs.sendMessage(tid,
    {
      mid: 0,
      url: url
    },
    function (response) {
      if(chrome.runtime.lastError){
        console.log('Early load error...ignored')
      }
      console.log('Response');
    });
}

//background request filter
//catch bili video package event
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var ret={cancel:false};
    var url = details.url;
    var tid = details.tabId;
    //filter of low quality audio
    if (url.indexOf("30216.m4s") != -1)
      return ret;
    console.log("tab:"+tid);
    sendPackInfo(tid,url);
    return ret;
  },
  { urls: ["https://*/upgcxcode/*"] },
  ["blocking"]
);


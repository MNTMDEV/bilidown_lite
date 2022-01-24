// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

function sendPackInfo(tid, url) {
  chrome.tabs.sendMessage(tid,
    {
      mid: 0,
      url: url
    },
    function (response) {
      if (chrome.runtime.lastError) {
        crx_log('Early load error...ignored')
      }
    });
}

var updateTargetTabUrl = function (tid, changeInfo, tab) {
  if (changeInfo.status == "loading") {
    chrome.tabs.sendMessage(tid,
      {
        mid: 2,
        url: tab.url
      },
      function (response) {
        if (chrome.runtime.lastError) {
          crx_log('Early load error...ignored')
        }
      });
  }
}

chrome.tabs.onUpdated.addListener(updateTargetTabUrl);


// background request filter
// catch bili video package event
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var ret = { cancel: false };
    var url = details.url;
    var tid = details.tabId;
    sendPackInfo(tid, url);
    return ret;
  },
  { urls: ["https://*/upgcxcode/*"] },
  ["blocking"]
);

// referer modify
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    var ref = getQueryStringByUrl(details.url, 'ref');
    var bFlag = false;
    var headers = details.requestHeaders;
    if (ref != null) {
      for (var i = 0; i < headers.length; i++) {
        if (headers[i].name == "Referer") {
          headers[i].value = window.atob(ref);
          bFlag = true;
          break;
        }
      }
      if (!bFlag) {
        headers.push({ name: "Referer", value: window.atob(ref) });
      }
    }
    return { requestHeaders: headers };
  },
  { urls: ["https://*/upgcxcode/*"] },
  ["blocking", "requestHeaders", "extraHeaders"]
);



// octet-stream converter
chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    var headers = details.responseHeaders;
    var bFlag = false;
    for (var i = 0; i < headers.length; i++) {
      if (headers[i].name == "Content-Type") {
        headers[i].value = "application/octet-stream";
        bFlag = true;
        break;
      }
    }
    if (!bFlag) {
      headers.push({ name: "Content-Type", value: "application/octet-stream" });
    }
    var fn = details.url;
    var pos = 0;
    pos = fn.lastIndexOf("/");
    if (pos != -1) {
      fn = fn.substr(pos + 1);
    }
    pos = fn.indexOf("?");
    if (pos != -1) {
      fn = fn.substr(0, pos);
    }
    headers.push({ name: "Content-Disposition", value: "attachment;filename=" + fn });
    return { responseHeaders: headers };
  },
  { urls: ["https://*/upgcxcode/*"] },
  ["blocking", "responseHeaders", "extraHeaders"]
);
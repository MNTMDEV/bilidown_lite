// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

// var sw_global = false;

chrome.browserAction.onClicked.addListener(function (tab) {
  // if (sw_global) {
  //   sw_global = false;
  //   alert('Disabled');
  // }
  // else {
  //   sw_global = true;
  //   alert('Enabled');
  // }

  chrome.tabs.sendMessage(tab.id,
    {
      mid:1
    },
    function (response) {
      console.log('Response');
    });
  //   // No tabs or host permissions needed!
  //   // console.log('Turning ' + tab.url + ' red!');
  //   // chrome.tabs.executeScript({
  //   //   code: 'document.body.style.backgroundColor="red"'
  //   // });
  //   var ret = tab.url.match("https://www\\.bilibili\\.com/video/av\\d+");
  //   if (ret == null || ret.length == 0) {
  //     alert('这不是bili视频页');
  //   }
  //   else {
  //     var url = tab.url;
  //     var pos = url.indexOf('/av');
  //     var aid = url.substring(pos + 3, url.length - pos - 3);
  //     pos = aid.indexOf('?');
  //     if (pos != -1) {
  //       aid = aid.substring(0, pos);
  //     }
  //     chrome.tabs.sendMessage(tab.id,
  //       {
  //         url: url,
  //         aid: aid
  //       },
  //       function (response) {
  //         console.log('Response');
  //       });
  //   }
  //   // chrome.tabs.executeScript(tb[0].id, { code: "window.alert(11)" }, null);
});

// function getAid(url) {
//   var pos = url.indexOf('/av');
//   var aid = url.substring(pos + 3, url.length - pos - 3);
//   pos = aid.indexOf('?');
//   if (pos != -1) {
//     aid = aid.substring(0, pos);
//   }
//   return aid;
// }

//background request filter
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    chrome.tabs.query({ url: "https://www.bilibili.com/video/av*" }, function (tabs) {
      if (tabs.length > 0) {
        var url=details.url;
        try{
        chrome.tabs.sendMessage(tabs[0].id,
          {
            mid: 0,
            url: url
          },
          function (response) {
            console.log('Response');
          });
        }
        catch(err){
          console.log(err);
        }
      }
    });
    return { cancel: false };
  },
  { urls: ["https://*.acgvideo.com/*","https://*.bilivideo.com/*"] },
  ["blocking"]
);


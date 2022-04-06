// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

// variables
var currentTab = null;
var userInfo = null;
var proxyEnable = false;

// chrome events
// tab info callback in initial process
var initTabCallback = function (tab) {
    currentTab = tab;
    crx_log(tab);
}

var initProxyStatus = async function () {
    proxyEnable = await getRulesetStatus();
    if (proxyEnable) {
        $('#enableProxy').text('关闭番剧代理');
    }
    else {
        $('#enableProxy').text('开启番剧代理');
    }
}

// initialize popup page

var initUI = function () {
    getCurrentTab(initTabCallback);
    $.ajax(
        {
            url: "https://api.bilibili.com/x/web-interface/nav",
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                userInfo = data.data;
                if (userInfo.isLogin) {
                    $('#bili-avatar').attr('src', userInfo.face);
                    $('#vip_label').text(userInfo.vip_label.text);
                    $('#uname').text(userInfo.uname);
                }
                else {
                    //not login
                }
            }
        });
    initProxyStatus();
}

initUI();

// jquery event functions

$('#queryResource').click(function () {
    window.location.href = "download.html?tid=" + currentTab.id;
})

$('#enableProxy').click(async function () {
    await enableRuleset(!proxyEnable);
    proxyEnable = !proxyEnable;
    if (proxyEnable) {
        $('#enableProxy').text('关闭番剧代理');
        alert("已开启番剧代理");
    }
    else {
        $('#enableProxy').text('开启番剧代理');
        alert("已关闭番剧代理");
    }
    close_window();
})

$('#proxyConfig').click(function () {
    // window.location.href = "proxy-config.html";
})

$('#syncCookie').click(async function () {
    var cookieDict = await chrome.cookies.getAll({ domain: ".bilibili.com" });
    var result = {};
    for (var i = 0; i < cookieDict.length; i++) {
        var item = cookieDict[i];
        var key = item.name;
        var value = item.value;
        var domain = item.domain;
        if (domain != ".bilibili.com") {
            continue;
        }
        result[key] = value;
    }
    var ruleset = await readCustomizeRules();
    $.ajax({
        url: ruleset.api_server + "/api/syncCookie",
        method: "post",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(result),
        success: function (data) {
            alert("同步成功");
        },
        error: function () {
            alert("同步失败");
        }
    })
})

$('#displayAbout').click(function () {
    window.open("about.html")
    close_window();
})

$('#displayHelp').click(function () {
    // window.open("help.html");
    window.open("https://github.com/MNTMDEV/bilidown_lite/blob/master/README.md")
    close_window();
})
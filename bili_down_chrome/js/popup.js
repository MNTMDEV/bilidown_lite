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
}
initUI();

// jquery event functions
$('#queryResource').click(function () {
    open_window("download.html?tid=" + currentTab.id, {
        width: 650,
        height: 430
    });
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

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
    window.location.href= "download.html?tid=" + currentTab.id;
})

$('#displayAbout').click(function () {
    // open_window("about.html", {
    //     width: 400,
    //     height: 250
    // });
    window.open("about.html")
    close_window();
})

$('#displayHelp').click(function () {
    // window.open("help.html");
    window.open("https://github.com/MNTMDEV/bilidown_lite/blob/master/README.md")
    close_window();
})
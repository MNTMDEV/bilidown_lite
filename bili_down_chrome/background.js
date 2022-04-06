
importScripts('js/global.js');
importScripts('js/ruleset.js');

//background page mesage handler
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var mid = request.mid;
    var response = null;
    if (mid == 1) {
        var url = request.url;
        var name = request.name;
        chrome.cookies.get({ url: url, name: name }, function (response) {
            sendResponse(response);
        });
        return true;
    }
    sendResponse(response);
});

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

// url change event
chrome.tabs.onUpdated.addListener(updateTargetTabUrl);

// binary content-type for downloading
chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [NET_REQUEST_RULES.DOWNLOAD_RULE],
    addRules: [{
        id: NET_REQUEST_RULES.DOWNLOAD_RULE,
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

// bypass CORS rules
chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [NET_REQUEST_RULES.CORS_BYPASS_RULE],
    addRules: [{
        id: NET_REQUEST_RULES.CORS_BYPASS_RULE,
        priority: 1,
        condition: {
            "urlFilter": "https://*.bilibili.com/*",
            "resourceTypes": ["main_frame"]
        },
        action: {
            type: "modifyHeaders",
            responseHeaders: [{
                header: "content-security-policy-report-only",
                operation: "set",
                value: ""
            }]
        }
    }]
});

initializeRuleset();

//debug net request rule info
// if (__DEBUG__) {
//     chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
//         function (request, rule) {
//             console.log(request, rule);
//         }
//     )
// }

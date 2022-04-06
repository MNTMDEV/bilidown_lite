const DEFAULT_RULESET = {
    api_server: "https://api.bilidown.mntmdev.com",
    bangumi_rule: "https://www.bilibili.com/bangumi/play/",
    proxy: [{
        id: 10002,
        priority: 1,
        url_pattern: "^https://api.bilibili.com/x/web-interface/search/",
        name: "search_rule"
    }, {
        id: 10003,
        priority: 1,
        url_pattern: "^https://api.bilibili.com/pgc/",
        name: "play_rule"
    }]
};


var getRulesetStatus = async function () {
    var result = await chrome.storage.local.get("ruleset_status");
    return result.ruleset_status == undefined ? false : result.ruleset_status;
}

var readCustomizeRules = async function () {
    var result = await chrome.storage.local.get("ruleset");
    return result.ruleset == undefined ? DEFAULT_RULESET : result.ruleset;
}

var clearOldRules = async function () {
    var rules = await chrome.declarativeNetRequest.getDynamicRules();
    for (var i = 0; i < rules.length; i++) {
        if (rules[i].id > 10000 && rules[i].id < 20000) {
            await chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [rules[i].id]
            });
        }
    }
}

var enableRuleset = async function (enable) {
    if (enable) {
        var ruleset = await readCustomizeRules();
        for (var i = 0; i < ruleset.proxy.length; i++) {
            var item = ruleset.proxy[i];
            await chrome.declarativeNetRequest.updateDynamicRules({
                addRules: [{
                    id: item.id,
                    priority: item.priority,
                    condition: {
                        "regexFilter": item.url_pattern,
                        "resourceTypes": ["xmlhttprequest"]
                    },
                    action: {
                        type: "redirect",
                        redirect: {
                            regexSubstitution: ruleset.api_server + "/proxy/" + item.id + "/"
                        }
                    }
                }]
            });
        }
    }
    else {
        await clearOldRules();
    }
    await chrome.storage.local.set({ ruleset_status: enable });
}

var updateCustomizeRules = async function (ruleset) {
    await chrome.storage.local.set({ ruleset: ruleset });
    await clearOldRules();
    var enable = await getRulesetStatus();
    if (enable) {
        await enableRuleset(true);
    }
}

var resetCustomizeRules = async function () {
    await updateCustomizeRules(DEFAULT_RULESET);
}

var initializeRuleset = async function(){
    await clearOldRules();
    var enable = await getRulesetStatus();
    await enableRuleset(enable);
}

const JSON_PREFIX = "window.__playinfo__=";
const STATE_JSON_PREFIX = "window.__INITIAL_STATE__=";
const SCRIPT_FILTER = ";";

var tabData = {
    dashData: null,
    state: null,
    url: null
};

var removeSuffixScript = function(str){
    var pos=str.indexOf(SCRIPT_FILTER);
    if(pos==-1){
        return str;
    }
    return str.substr(0,pos);
}

var parseOneScript = function () {
    var content = $(this).text();
    if (content.startsWith(JSON_PREFIX)) {
        var temp=JSON.parse(removeSuffixScript($(this).text()).replace(JSON_PREFIX, '').trim());
        tabData.dashData = temp.data;
        crx_log(temp);
    }
    else if(content.startsWith(STATE_JSON_PREFIX)){
        tabData.state=JSON.parse(removeSuffixScript($(this).text()).replace(STATE_JSON_PREFIX, '').trim());
    }
};

var parseOneEpisode =function(){
    console.log(this);
}

// apply proxy response to the current page
var applayPlayResource = async function (initial) {
    if(!initial){
        return;
    }
    var episodes = tabData.state.mediaInfo.episodes;
    var episodeId=-1;
    if(episodes.length>0){
        episodeId=episodes[0].id;
    }
    location.href='https://www.bilibili.com/bangumi/play/ss4319?redirect='+episodeId;
}

var tryProxy = async function (url,initial) {
    var proxyEnable = await getRulesetStatus();
    if (proxyEnable) {
        var ruleset = await readCustomizeRules();
        var proxyUrl = url.replace(ruleset.bangumi_rule, ruleset.api_server + "/proxy/10001/");
        crx_log("Proxy URL:"+proxyUrl);
        chrome.runtime.sendMessage({ mid: 1, url: "https://www.bilibili.com", name: "SESSDATA" }, function (response) {
            crx_log(response);
            $.ajax({
                url: proxyUrl,
                method: 'get',
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    var start = data.indexOf("<body");
                    var end = data.indexOf("</body>") + 7;
                    var bodyData = data.substr(start, end - start);
                    var newDoc = $(bodyData);
                    newDoc.filter('script').each(parseOneScript);
                    applayPlayResource(initial);
                }
            })
        });
    }
}

var initPageInfo = function () {
    var redirect=getQueryStringByUrl(location.href,"redirect");
    if(redirect!=null){
        history.pushState({}, '', 'https://www.bilibili.com/bangumi/play/ss4319?ep='+redirect);
        var executor=$('<script></script>');
        executor.attr('src',chrome.runtime.getURL('js/bypass.js'));
        tabData.url=window.location.href;
        tabData.dashData=null;
        $('body').append(executor);
        return;
    }
    crx_log("Page initializing");
    if (tabData.url == null) {
        tabData.url = window.location.href;
        tabData.dashData = null;
        $('script').each(parseOneScript);
        if (tabData.dashData == null) {
            crx_log("Failed to fetch dash data.");
            tryProxy(tabData.url,true);
        }
    }
}

// tab url changed event
var onUpdateUrl = function (url) {
    //not initiated
    crx_log("URL Updated.");
    crx_log(url);
    if (tabData.url == null) {
        return;
    }
    if (url != tabData.url) {
        tabData.url = url;
        tabData.dashData = null;
        //refresh dom
        $.ajax({
            url: url,
            method: "get",
            success: function (data) {
                var newDoc = $(data);
                newDoc.filter('script').each(parseOneScript);
                if (tabData.dashData == null) {
                    tryProxy(tabData.url,false);
                }
            },
            error:function(){
                tryProxy(tabData.url,false);
            }
        })
    }
}

//content page message handler
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var mid = request.mid;
        var response = {};
        if (mid == 1) {
            response = tabData;
        }
        else if (mid == 2) {
            onUpdateUrl(request.url);
        }
        sendResponse(response);
    });

$(function () {
    initPageInfo();
})

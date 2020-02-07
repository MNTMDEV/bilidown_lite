var url_list = [];

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        var mid=request.mid;
        if (mid == 0) {
            var url = request.url;
            if (url_list.indexOf(url) == -1) {
                //apend to web
                console.log('accept a link');
                url_list.push(url);
            }
        }
        else if (mid == 1) {
            //controll
            $('#viewbox_report').append("<br /><p>请使用迅雷下载以下链接(它们包含了视频和音频):</p>");
            var tot_html="<ul>";
            for (var i = 0;i<url_list.length ; i++) {
                var link_html = "<a href='" + url_list[i] + "'>下载资源" + (i+1) + "</a>";
                tot_html+="<li>";
                tot_html+=link_html;
                tot_html+="</li>";
            }
            tot_html+="</ul>";
            $('#viewbox_report').append(tot_html);
        }
        sendResponse({});
    });

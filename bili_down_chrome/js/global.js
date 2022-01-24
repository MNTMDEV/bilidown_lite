const __DEBUG__=true;

function crx_log(s){
    if(__DEBUG__){
        console.log(s);
    }
}

function getCurrentTab(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0]: null);
	});
}

function close_window(){
	window.close();
}
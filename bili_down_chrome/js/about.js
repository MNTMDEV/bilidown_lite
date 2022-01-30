
$(function () {
    var version = chrome.runtime.getManifest().version;
    var name = chrome.runtime.getManifest().name;
    var permissions = chrome.runtime.getManifest().permissions;
    var curDate = new Date();
    $('#version').text(version);
    $('#name').text(name);
    $('#permissions').text(permissions.join("|"));
    $('#now').text(curDate.getFullYear())
})
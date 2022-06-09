var updateConfigValue = async function () {
    var ruleset = await readCustomizeRules();
    var apiServer = ruleset.api_server;
    var bangumiRule = ruleset.bangumi_rule;
    var proxy = JSON.stringify(ruleset.proxy);
    $('#apiServer').val(apiServer);
    $('#bangumiRule').val(bangumiRule);
    $('#proxy').val(proxy);
}

$(function () {
    updateConfigValue();
})

$('#saveConfigBtn').click(async function () {
    var apiServer = $('#apiServer').val();
    var bangumiRule = $('#bangumiRule').val();
    var proxy;
    try {
        proxy = JSON.parse($('#proxy').val())
    } catch (error) {
        alert("不合法的JSON字符串");
        return;
    }
    var ruleset = {
        api_server: apiServer,
        bangumi_rule: bangumiRule,
        proxy: proxy
    }
    var success = true;
    try {
        await updateCustomizeRules(ruleset);
    } catch (error) {
        success = false;
    }
    alert(success ? "保存成功" : "保存失败");
    window.close();
})

$('#resetBtn').click(async function () {
    var success = true;
    try {
        await resetCustomizeRules();
    } catch (error) {
        success = false;
    }
    alert(success ? "配置重置完成" : "配置重置失败");
    window.close();
})
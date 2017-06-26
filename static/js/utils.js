import vue from 'vue';
var utils = {};
Vue.filter('formatNumber', function (num, fix) {
    return utils.formatNumber(num, fix);
});
Vue.filter('fixed2', function (num) {
    num = Number(num);
    num = num ? num : 0;
    if (typeof num !== 'number') return num;
    return num.toFixed(2);
});
Vue.filter('date', function (date, format) {
    return utils.fortatDate(date, format);
});
utils.formatNumber = function (num, fix) {
    num = Number(num);
    num = num ? num : 0;
    if (typeof num !== 'number') return num;
    num = fix ? parseFloat(num).toFixed(2) : num;
    num = num + '';
    var rgx = /(\d+)(\d{3})/g;
    while (rgx.test(num)) {
        num = num.replace(rgx, '$1' + ',' + '$2');
    }
    return num;
};
utils.setCookie = function (cname, cvalue, exdays, domain) {
    domain = (domain || location.hostname.replace(/(\w+)\./, '.'));
    exdays = exdays || 365;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ';path=/;domain=' + domain;
};

utils.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
};
utils.fortatDate = function (date, format) {
    if(!date)return'';
    var date = new Date(date);
    var map = {
        M: date.getMonth() + 1, //月份
        d: date.getDate(), //日
        h: date.getHours(), //小时
        m: date.getMinutes(), //分
        s: date.getSeconds(), //秒
        q: Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };
    var format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
};

utils.connectWebViewJavascriptBridge = function (callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge)
        }, false)
    }
};
utils.connectWebViewJavascriptBridge(function (bridge) {
    bridge.init(function (message, responseCallback) { });
});
utils.each = function (obj, fn, args) {
    if (args) {
        if (obj.length == undefined) {
            for (var i in obj)
                fn.apply(obj, obj[i], i, args);
        } else {
            for (var i = 0, ol = obj.length; i < ol; i++) {
                if (fn.apply(obj, obj[i], i, args) === false) break;
            }
        }
    } else {
        if (obj.length == undefined) {
            for (var i in obj)
                fn.call(obj, obj[i], i, obj);
        } else {
            for (var i = 0, ol = obj.length, val = obj[0]; i < ol && fn.call(val, obj[i], i, val) !== false; val = obj[++i]) { }
        }
    }
    return obj;
};
export default utils;
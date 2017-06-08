import vue from 'vue';
var utils = {};
Vue.filter('formatNumber', function (num, fix) {
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
});
Vue.filter('Date', function (date, format) {
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
});
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

export default utils;
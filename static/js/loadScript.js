export default function(url, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    //借鉴了jQuery的script跨域方法
    script.onload = script.onreadystatechange = function () {
        if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
            callback && callback();
            // Handle memory leak in IE
            // script.onload = script.onreadystatechange = null;
            // if (head && script.parentNode) {
            //     head.removeChild(script);
            // }
        }
    };
    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    head.insertBefore(script, head.firstChild);
};
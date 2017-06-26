import $modal from '@/components/modal/';
import vue from 'vue';

export default function (callback) {
    var redirectUrl = encodeURIComponent(location.href);
    var modal = $modal({
        title: '请输入支付密码',
        content: '<input type="password" id="payPassword" placeholder="支付密码" /><p style="padding-top:16px;font-size:12px;text-align: right;padding-right: 20px;"><a style="color:#A9A9A9;text-decoration: underline;" href="http://m.hehenian.com/account/resetPwdIndex.do?pwdFlag=pay&urlfrom=' + redirectUrl + '">忘记支付密码?</a></p>',
        cancel: function () { },
        ok: function () {
            var psw = $.trim($('#payPassword').val());
            if (!psw) {
                vue.$toast('请输入支付密码');
                return false;
            } else if (psw.length < 8) {
                vue.$toast('支付密码不能少于8位');
                return false;
            } else {
                vue.$axios.post('/account/checkPayPwd.do', { pwd: psw })
                then(res => {
                    if (res.returnCode == 1) {
                        vue.$toast(res.messageInfo);
                    } else {
                        callback(psw)
                        modal.remove();
                    }
                })
            }
            return false;
        }
    });
};
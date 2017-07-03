import $modal from '@/components/modal/';
import axios from 'axios';
//能否修改手机号的验证
export default function (callback, router) {
    axios.post('/profile/isChinapnrUser.do')
        .then(res => {
            let result = res.result;
            if (result == 3) {
                $modal({
                    title: '温馨提示',
                    okText: '我知道了',
                    content: document.getElementById('payPswTpl').innerHTML,
                    ok: function () {

                    }
                });
            } else if (result == 2) {
                $modal({
                    title: '温馨提示',
                    content: '<p style="padding:1.5em 0;">请先设置 <a href="http://m.hehenian.com/account/resetPwdIndex.do?pwdFlag=pay" class="cRed">交易密码</a> 后，才可更改手机号！</p>',
                    okText: '立即设置',
                    ok: function () {
                        location.href = "http://m.hehenian.com/account/resetPwdIndex.do?pwdFlag=pay";
                    },
                    cancel: function () { }
                });
            } else if (result == 1) {
                $modal({
                    title: '温馨提示',
                    content: '<p style="padding:1.5em 0;">您的账号需要 <a href="http://m.hehenian.com/account/realAuth.do" class="cRed">实名认证</a> ，才可更改手机号！</p>',
                    okText: '立即设置',
                    ok: function () {
                        location.href = "http://m.hehenian.com/account/realAuth.do";
                    },
                    cancel: function () { }
                });
            } else if (result == 4) {
                callback(res);
            }
        })
}
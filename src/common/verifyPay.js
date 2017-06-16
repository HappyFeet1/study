import $modal from '@/components/modal/';
import axios from 'axios';
//支付验证
export default function (callback) {
    axios.post('/finance/setUp.do')
        .then(({data}) => {
            if (data.returnCode == 5) {
                //实名认证
                $modal({
                    title: '重要提示',
                    content: data.messageInfo || '您尚未完成实名认证，无法进行该操作。',
                    okText: '立即认证',
                    cancelText: '取消',
                    ok: function () {
                        document.location.href = 'http://m.hehenian.com/account/realAuth.do';
                    },
                    cancel: function () {

                    }
                });
            } else if (data.returnCode == 6) {
                //支付密码
                $modal({
                    title: '重要提示',
                    content: data.messageInfo || '您尚未设置支付密码，无法进行该操作。',
                    okText: '立即设置',
                    cancelText: '取消',
                    ok: function () {
                        document.location.href = 'http://m.hehenian.com/account/resetPwdIndex.do?pwdFlag=pay';
                    },
                    cancel: function () {

                    }
                });
            } else if (data.returnCode == 7) {
                //绑卡
                $modal({
                    title: '重要提示',
                    content: data.messageInfo || '您尚未绑定银行卡，无法进行该操作。',
                    okText: '立即绑卡',
                    cancelText: '取消',
                    ok: function () {
                        document.location.href = "http://m.hehenian.com/profile/managerCard.do";
                    },
                    cancel: function () {

                    }
                });
            } else {
                callback(data);
            }
        })
}
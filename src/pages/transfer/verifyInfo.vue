<template>
    <div class="container">
        <mt-header title="审核信息">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="infom">
            <p class="title">审核信息</p>
            <div class="pannel_table">
                <table>
                    <thead>
                        <tr>
                            <th>审核项目</th>
                            <th>状态</th>
                            <th>认证时间</th>
                            <th>通过时间</th>
                        </tr>
                    </thead>
                    <tbody v-if="authList.length">
                        <tr v-for="el in authList">
                            <td>{{el.fileName}}</td>
                            <td>
                                <img alt="" src="http://static.hehenian.com/m/v4/images/ah2.png?v=a46bef1">
                            </td>
                            <td>{{el.createData}}</td>
                            <td>{{el.createData}}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="4" v-if="authList.length==0">查无记录</td>
                        </tr>
                    </tbody>
                </table>
                <div class="note">
                    <p>1.本站将始终秉持客观公正的原则，严控风险，最大程度的尽力确保借入者信息的真实性。</p>
                    <p>2.借入者若长期逾期，其个人信息将被公布。</p>
                    <p>3.钱生花仅为信息发布平台，未以任何明示或暗示的方式对出借人提供担保或承诺保本保息，出借人应根据自身的投资偏好和风险承受能力进行独立判断和作出决策，并自行承担资金出借的风险与责任。</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
@import '../debt/base.css';
</style>
<script>
export default {
    data() {
        return {
            authList: [],
            businessNo: ''
        }
    },
    methods: {
        initData() {
            var cache = JSON.parse(localStorage.getItem('$$transferDetailCache'));
            if (!cache) {
                this.$toast('查询无结果！');
                return;
            }
            this.authList = cache.loanFiles;
            this.businessNo = cache.loanInfo.businessNo;
        }
    }
}
</script>

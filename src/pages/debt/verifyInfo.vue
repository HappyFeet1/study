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
                    <tbody v-if="loanFiles.length" v-for="el in loanFiles">
                        <tr>
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
                            <td colspan="4" style="display: none;">查无记录</td>
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
<script>
export default {
    data() {
        return {
            loanFiles: []
        }
    },
    beforeMount() {
        let debtData = sessionStorage.getItem('debtData');
        if (!debtData) {
            this.$router.replace('/');
        } else {
            try {
                debtData = JSON.parse(debtData);
                this.loanFiles = debtData.loanFiles;
            } catch (e) {
                this.$toast('访问参数无效');
                this.$router.push({ name: '/' });
            }
        }
    }
}
</script>
<style>
@import './base.css';
</style>


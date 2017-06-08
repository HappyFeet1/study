<template>
    <div class="container bg-white">
        <mt-header title="借款人信息">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="top-pannel">
            <p>以下基本信息资料，经用户同意披露，其中
                <span class="fred">红色字体</span> 的信息，为通过APP审核之项。
                <br>
                <br> 审核意见：
                <span class="fred">APP将以客观、公正的原则，最大程度地核实借入者信息的真实性。如果借入者长期逾期，其提供的信息将被公布。</span>
            </p>
        </div>
        <div class="pannel-table">
            <p class="pannel-title pannel_title_v2">借款人信息</p>
            <div class="load_info">
                <p>用户
                    <span class="forg">{{borrowerInfo.realName}}</span>
                </p>
                <p class="loan_info_tit">基本信息</p>
                <div class="items">
                    <div class="item">
                        <p>性别：
                            <span>{{borrowerInfo.sex}}</span>
                        </p>
                        <p v-show="borrowerInfo.position">职位：
                            <span>{{borrowerInfo.position}}</span>
                        </p>
                        <p>银行卡号：
                            <span>{{borrowerInfo.bankcard}}</span>
                        </p>
                        <p v-show="borrowerInfo.communityAddress">居住地址：
                            <span>{{borrowerInfo.communityAddress}}</span>
                        </p>
                    </div>
                    <div class="item">
                        <p>年龄：
                            <span>{{borrowerInfo.age}}</span>
                        </p>
                        <p>手机号码：
                            <span>{{borrowerInfo.telephone}}</span>
                        </p>
                        <p>身份证号码：
                            <span>{{borrowerInfo.certNo}}</span>
                        </p>
                        <p v-show="borrowerInfo.companyName">工作单位：
                            <span>{{borrowerInfo.companyName}}</span>
                        </p>
                    </div>
                </div>
                <p class="loan_info_tit">借款信息</p>
                <div class="items">
                    <div class="item">
                        <p>发布借款标：
                            <span>{{creditRecord.totalPublishBorrow}}笔</span>
                        </p>
                        <p>成功借款笔数：
                            <span>{{creditRecord.totalSuccessBorrow}}笔</span>
                        </p>
                        <p>还请笔数：
                            <span>{{creditRecord.totalRepayBorrow}}笔</span>
                        </p>
                        <p>逾期次数：
                            <span>{{creditRecord.totalHasFICount}}笔</span>
                        </p>
                    </div>
                    <div class="item">
                        <p>共借入：
                            <span>{{creditRecord.totalBorrowAmount}}元</span>
                        </p>
                        <p>待还金额：
                            <span>{{creditRecord.totalForRepayPI}}元</span>
                        </p>
                        <p>逾期金额：
                            <span>{{creditRecord.totalHasIAmount}}元</span>
                        </p>
                        <p>严重逾期次数：
                            <span>{{creditRecord.totalBadFICount}}笔</span>
                        </p>
                    </div>
                </div>
            </div>
            <p class="pannel-title pannel_tit_v2">借款描述</p>
            <div class="load_infos">
                {{riskDetails}}
            </div>
            <div class="infom">
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
.top-pannel {
    text-align: justify;
    padding: 10px;
    font-size: 12px;
    color: #575555;
}

.top-pannel p {
    line-height: 150%;
    background: #fffbf1;
    padding: 20px;
}

.bg-white {
    background: #fff;
    padding-bottom: 10px;
}

.pannel-table {
    padding: 0px 10px;
}

.pannel-title {
    font-size: 14px;
    color: #2b2b2b;
    font-weight: bold;
    padding-bottom: 10px;
}

.load_info {
    font-size: 12px;
    padding: 15px;
    color: #848484;
    border: 1px solid #dcdcdc;
    -webkit-border-radius: 5px;
    border-radius: 5px;
}

.forg {
    color: #cb8e09;
    margin-left: 10px;
}

.loan_info_tit {
    color: #cb8e09;
    margin: 8px 0px;
    font-size: 14px;
}

.pannel-table .items {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.pannel-table .item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
}

.pannel-table .item:last-child {
    margin-left: 10px;
}

.pannel-table .item p {
    height: 22px;
    line-height: 22px;
    overflow: hidden;
}

.pannel-table .items .item p span {
    color: #444444;
}

.article-pannel {
    padding: 15px;
    color: #767070;
    padding-top: 10px;
}

.art_title {
    color: #444444;
    font-size: 16px;
    font-weight: bold;
    width: 60%;
    margin: 0 auto;
    padding-bottom: 10px;
    text-align: center;
}

.article-pannel img {
    display: block;
    width: 100%;
    margin: 5px 0px;
}

.pannel_title_v2 {
    color: #b7761c;
}

.pannel_tit_v2 {
    color: #b7761c;
    margin-top: 10px;
}

.load_infos {
    font-size: 12px;
    color: #575555;
    line-height: 180%;
}

.infom .note {
    margin-top: 30px;
    color: #9e9e9e;
    line-height: 180%;
    font-size: 12px;
    padding-bottom: 30px;
}
</style>
<script>
export default {
    data() {
        return {
            borrowerInfo: {},
            creditRecord: {},
            riskDetails: '',
        }
    },
    beforeMount() {
        let debtData = sessionStorage.getItem('debtData');
        if (!debtData) {
            this.$router.replace('/');
        } else {
            try {
                debtData = JSON.parse(debtData);
                this.borrowerInfo = debtData.borrowerInfo;
                this.creditRecord = debtData.creditRecord;
                this.riskDetails = debtData.loanInfo.riskDetails;
            } catch (e) {
                this.$toast('访问参数无效');
                this.$router.push({ name: 'main' });
            }
        }
    }
}
</script>

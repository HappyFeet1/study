<template>
    <div class="container">
        <mt-header title="常见问题">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="qa">
            <ul>
                <li>
                    <div class="title">1、投标为什么会失败？</div>
                    <div class="a">
                        答： 1.显示余额不足，请及时充值。 2.显示该项目已经融满，请选投目前正在融资的项目。
                    </div>
                </li>
                <li>
                    <div class="title">2、平台资金安全吗，是否有进行托管？</div>
                    <div class="a">
                        答：您好，钱生花第三方资金托管，投资人、借款人、钱生花都在第三方支付平台（如连连支付，快钱支付，汇付天下等）开立独立控制的第三方托管账户以用于钱生花平台上的资金流转，三方资金严格分离；投标时，经本人确认，投资人的资金直接由投资人的第三方平台托管账户转至借款人的第三方平台账户；还款时，经本人确认，还款资金由借款人的第三方支付平台托管账户直接转至投资人的第三方支付平台托管账户。
                    </div>
                </li>
                <li>
                    <div class="title">3、什么时候开始计息？</div>
                    <div class="a">
                        答：项目满标放款后的次日。
                    </div>
                </li>
                <li>
                    <div class="title">4、投标后能否提前赎回？</div>
                    <div class="a">
                        答：已投资的项目不能撤回，但未到期的投资项目如满足债权转让规则可以申请债权转让，如有其它投资人愿意购买您转让的项目，则您可以提前拿回资金，然后申请提现。
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
.qa {
    padding: 0px 15px;
    background: #fff;
    padding-bottom: 60px;
}

.qa .title {
    padding: 13px 0px;
    font-size: 14px;
    color: #b7761c;
}

.qa .a {
    font-size: 12px;
    color: #999999;
    letter-spacing: 1px;
}
</style>


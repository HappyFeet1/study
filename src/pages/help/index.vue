<template>
    <div class="container">
        <mt-header title="助手">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="cell-container menu-list">
            <mt-cell title="关于钱生花" :to="{path:'/help/about'}" is-link>
                <i class="icon icon-about" slot="icon"></i>
            </mt-cell>
            <mt-cell title="帮助中心" :to="{path:'/help/center'}" is-link>
                <i class="icon icon-help" slot="icon"></i>
            </mt-cell>
            <mt-cell title="消息中心" :to="{path:'/message',query:{typeId:4}}" is-link>
                <i class="icon icon-msg" slot="icon"></i>
            </mt-cell>
            <mt-cell title="意见反馈" :to="{path:'/help/feedback'}" is-link>
                <i class="icon icon-feedback" slot="icon"></i>
            </mt-cell>
        </div>
        <div class="server-list">
            <a href="tel:4006078787">
                <i class="icon icon-server"></i>
                <p>客服电话：400-607-8787
                    <br/> 客服 QQ：4008303737
                    <br/> 工作时间：8:30-20:30
                </p>
            </a>
            <a href="mailto:hynservice@fansfinancial.com">
                <i class="icon icon-enMail"></i>
                <p>公司邮箱
                    <br/>hynservice@fansfinancial.com</p>
            </a>
        </div>
    </div>
</template>
<script>
import Cell from 'mint-ui/lib/cell/';
import 'mint-ui/lib/cell/style.css';
export default {
    components: {
        'mt-cell': Cell
    }
}
</script>
<style>
.cell-container {
    margin-top: 10px;
}
.menu-list .icon ,.server-list .icon{
    width: 25px;
    height: 25px;
    display: inline-block;
    margin-right: 3px;
}
/*.server-list .icon{display:inline-block;width:25px;height:25px;margin:0 10px;}*/
.menu-list .icon-about {
    background-position: -25px -175px;
}
.menu-list .icon-help {
    background-position: -50px -175px;
}
.menu-list .icon-msg {
    background-position: -75px -175px;
}
.menu-list .icon-feedback {
    background-position: 0 -200px;
}

.server-list{background-color:#fff;padding-left: 10px;margin-top: 10px;}
.server-list>a{display:block;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative;padding:13px 0;color:#544236;}
.server-list .icon-server{background-position:-50px -200px;}
.server-list .icon-enMail{background-position:-75px -200px;}

.server-list>a:before{content:"";display:block;position:absolute;height:100%;left:25px;right:0;top:0;border-bottom:1px solid #DCDCDC;pointer-events:none;}
.server-list>a:last-child:before{display:none;}
</style>

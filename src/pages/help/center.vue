<template>
    <div class="container">
        <mt-header title="帮助中心">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="cell-container">
            <mt-cell title="新手入门" :to="{path:'/help/center-beginner'}" is-link></mt-cell>
            <mt-cell title="账户管理" :to="{path:'/help/center-account'}" is-link></mt-cell>
            <mt-cell title="我要理财" :to="{path:'/help/center-financing'}" is-link></mt-cell>
            <mt-cell title="增值服务" :to="{path:'/help/center-increase'}" is-link></mt-cell>
            <mt-cell title="平台风险及安全性" :to="{path:'/help/center-security'}" is-link></mt-cell>
            <mt-cell title="其他热门" :to="{path:'/help/center-others'}" is-link></mt-cell>
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
</style>

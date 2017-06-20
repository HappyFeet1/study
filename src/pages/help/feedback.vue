<template>
    <div class="container">
        <mt-header title="意见反馈">
            <a href="javascript:;" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="feedback">
            <input style="display:none;" type="text" placeholder="请输入标题" value="title-none" v-model="title" maxlength="50">
            <textarea placeholder="亲，有什么不爽说两句吧，虽然我们不能及时回复，但是我们会尽快将问题反馈给技术同学，给予解决的。( ^_^ )" v-model="content" maxlength="255"></textarea>
        </div>
        <div class="x-btn">
            <a href="javascript:;" @click="submit()">提交</a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: 'title-none',
            content: ''
        }
    },
    methods: {
        submit() {
            let content = this.content.trim();
            if (!content) {
                this.$toast('内容不能为空！');
                return;
            }
            if (content.length < 10) {
                this.$toast('内容不能少于10个字符！');
                return;
            }
            this.$axios.post('/api/commitFeedback.do', { title: this.title.trim(), content: this.content.trim() })
                .then(res => {
                    if (res.code === -1) {
                        this.$router.push({ path: '/login' });
                    } else if (res.code === 0) {
                        this.content = '';
                        this.$modal({
                            title: '反馈成功',
                            content: '反馈的进展会以通知的方式展示<br>在“助手->消息中心”页面里',
                            okText: '关闭',
                            ok: function () { }
                        });
                    } else {
                        this.$toast(res.msg || '服务器出错！')
                    }
                });
        }
    }
}
</script>
<style>
.feedback {
    background-color: #fff;
    margin-top: 5px;
}
.feedback input {
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #DCDCDC;
}
.feedback textarea {
    padding: 20px;
    height: 10em;
}
</style>



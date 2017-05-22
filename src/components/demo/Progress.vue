<template>
    <div class="page-progress">
        <mt-header title="Progress">
            <div slot="left">
                <mt-button icon="back" @click="$router.back()">返回</mt-button>
            </div>
        </mt-header>
        <mt-cell title="默认">
            <mt-progress></mt-progress>
        </mt-cell>
        <mt-cell title="设置 value">
            <mt-progress :value="20"></mt-progress>
        </mt-cell>
        <mt-cell title="左右文字">
            <mt-progress :value="40">
                <div slot="start">0%</div>
                <div slot="end">100%</div>
            </mt-progress>
        </mt-cell>
        <mt-cell title="定义线宽">
            <mt-progress :value="60" :bar-height="5"></mt-progress>
        </mt-cell>
        <div class="page-progress-wrapper">
            <mt-button size="large" type="primary" @click.native="uploadFile">上传文件</mt-button>
            <mt-progress :value="value" v-if="progressVisible" transition="progress-fade">
                <div slot="end">{{ value }}%</div>
            </mt-progress>
        </div>
    </div>
</template>

<style>
.mint-cell-value {
    flex: 2.5;
    position: relative;
    top: -20px;
}

.mt-progress {
    width: 100%;
    position: absolute;
    top: 5px;
}

.page-progress-wrapper {
    padding: 0 10px;
    margin-top: 50px;
}

.mt-progress {
    position: relative;
}

.progress-fade-transition {
    transition: opacity .3s;
}

.progress-fade-enter,
.progress-fade-leave {
    opacity: 0;
}
</style>

<script type="text/babel">
import Progress from '@/ui/progress/';
export default {
    data() {
        return {
            progressVisible: false,
            value: 0,
            uploading: false,
            timer: null
        };
    },
    watch: {
        value(val) {
            if (val >= 100) {
                this.uploading = false;
                this.progressVisible = false;
                setTimeout(() => this.$toast('上传成功'), 200);
                clearTimeout(this.timer);
            }
        }
    },
    methods: {
        uploadFile() {
            if (!this.uploading) {
                this.value = 0;
                this.progressVisible = true;
                this.uploading = true;
                this.timer = setInterval(() => this.value++, 10);
            }
        }
    },
    components: {
        'mt-progress':Progress
    }
};
</script>
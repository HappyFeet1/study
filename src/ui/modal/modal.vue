<template>
    <transition name="modal-bounce" @after-leave="close">
        <div class="iModal-wrapper" v-show="isShow" :class="{'no-title':!title,'no-ok':!ok,'no-cancel':!cancel,emptyBtns:!Object.keys(btns).length, horizontalBtns: Object.keys(btns).length>2}">
            <div class="iModal">
                <div class="iModal-title">{{title}}</div>
                <div class="iModal-content" v-html="content"></div>
                <div class="iModal-btns">
                    <button v-for="(btn, key) in btns" @click="btnsEvent(btn.callback)" :class="key">{{btn.text}}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            title: false,
            content: '',
            ok: false,
            okText: '确定',
            cancel: false,
            cancleText: '取消',
            oninit: function () { },
            onshow: function () { },
            onclose: function () { },
            btns: {},
            remove: true,
            auto: true,
            isShow: false
        }
    },
    methods: {
        btnsEvent(callback) {
            if (callback() !== false) {
                this.isShow = false;
            }
        },
        close() {
            this.remove && this.$el.parentNode.removeChild(this.$el);
            this.onclose();
        }
    }
}
</script>

<style>
.iModal-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, .3);
    font-size: 16px;
    -webkit-transition: .4s opacity;
    transition: .4s opacity;
}

.iModal-wrapper * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.iModal-wrapper button,
.iModal-wrapper input {
    border: none;
    background: none;
    -webkit-appearance: none;
    outline: none;
    font-size: 16px;
}

.iModal {
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
    width: 85%;
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    opacity: 1;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    text-align: center;
    -webkit-transition: .3s -webkit-transform, .3s opacity;
    transition: .3s transform, .3s opacity;
}

.iModal-title {
    font-weight: 700;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
}

.iModal-content {
    padding: 20px;
}

.iModal-btns {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    border-top: 1px solid #eee;
}

.iModal-btns button {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    height: 50px;
    line-height: 50px;
    border-right: 1px solid #eee;
}

.iModal-btns .ok {
    color: #26A2FF;
}

.iModal-btns button:active {
    background: #eee;
}

.iModal-btns button:last-child {
    border-right: none;
}

.iModal-wrapper.no-title .iModal-title,
.iModal-wrapper.no-ok .ok,
.iModal-wrapper.no-cancel .cancel,
.iModal-wrapper.emptyBtns .iModal-btns {
    display: none;
}

.iModal-wrapper.horizontalBtns .iModal-btns {
    display: block;
    margin: 0 10px;
    border-top: none;
}

.iModal-wrapper.horizontalBtns .iModal-btns button {
    display: block;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 10px;
}


.modal-bounce-enter,
.modal-bounce-leave-active {
    opacity: 0;
}

.modal-bounce-enter .iModal,
.modal-bounce-leave-active .iModal {
    -webkit-transform: translate3d(-50%, 200%, 0);
    transform: translate3d(-50%, 200%, 0);
}
</style>
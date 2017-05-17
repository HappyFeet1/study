<template>
    <transition name="actionsheet-float">
        <div class="actionsheet-modal" v-show="currentValue">
            <div class="actions-lock" @click="clickModal"></div>
            <div class="mint-actionsheet">
                <ul class="mint-actionsheet-list" :style="{ 'margin-bottom': cancelText ? '5px' : '0' }">
                    <li v-for="( item, index ) in actions" class="mint-actionsheet-listitem" @click.stop="itemClick(item, index)">{{ item.name }}</li>
                </ul>
                <a class="mint-actionsheet-button" @click.stop="currentValue = false" v-if="cancelText">{{ cancelText }}</a>
            </div>
        </div>
    </transition>
</template>

<style>
.actionsheet-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: .3s;
}

.actions-lock {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #000;
    opacity: .4;
    -webkit-transition: opacity .3s ease-out;
    transition: opacity .3s ease-out;
}

.mint-actionsheet {
    position: absolute;
    background: #e0e0e0;
    width: 100%;
    text-align: center;
    bottom: 0;
    left: 50%;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: -webkit-transform .3s ease-out;
    transition: transform .3s ease-out;
}

.mint-actionsheet-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.mint-actionsheet-listitem {
    border-bottom: solid 1px #e0e0e0;
}

.mint-actionsheet-listitem,
.mint-actionsheet-button {
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: #333;
    background-color: #fff;
}

.mint-actionsheet-listitem:active,
.mint-actionsheet-button:active {
    background-color: #f0f0f0;
}

.actionsheet-float-enter .actions-lock,
.actionsheet-float-leave-active .actions-lock {
    opacity: 0;
}

.actionsheet-float-enter .mint-actionsheet,
.actionsheet-float-leave-active .mint-actionsheet {
    -webkit-transform: translate3d(-50%, 100%, 0);
    transform: translate3d(-50%, 100%, 0);
}
</style>

<script type="text/babel">

export default {
    name: 'mt-actionsheet',
    props: {
        cancelText: {
            type: String,
            default: '取消'
        },
        closeOnClickModal: {
            default: true
        },
        actions: {
            type: Array,
            default: () => []
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentValue: false
        };
    },

    watch: {
        currentValue(val) {
            this.$emit('input', val);
        },

        value(val) {
            this.currentValue = val;
        }
    },

    methods: {
        itemClick(item, index) {
            let preventClose;
            if (item.method && typeof item.method === 'function') {
                preventClose = item.method(item, index);
            }
            if (preventClose !== false) {
                this.currentValue = false;
            }
        },
        clickModal() {
            if (this.closeOnClickModal) {
                this.currentValue = false;
            }
        }
    },

    mounted() {
        if (this.value) {
            this.currentValue = true;
        }
    }
};
</script>

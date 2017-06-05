import Vue from 'vue';
import Modal from './modal.vue';

var ModalConstructor = Vue.extend(Modal);

function iModal(options) {
    this.options = options || {};
    this.modal = new ModalConstructor({
        el: document.createElement('div')
    });
    this.create();
};
iModal.prototype = {
    create: function () {
        var defaults = {
            ok: false,
            okText: '确定',
            cancel: false,
            cancleText: '取消',
        }

        if (!this.options.btns) {
            this.options.btns = {}
        };
        if (typeof this.options.ok === 'function') {
            this.options.btns.ok = {
                text: this.options.okText || defaults.okText,
                callback: this.options.ok || defaults.ok
            };
        }

        if (typeof this.options.cancel === 'function') {
            this.options.btns.cancel = {
                text: this.options.cancelText || defaults.cancleText,
                callback: this.options.cancel || defaults.cancel
            };
        }

        for (var prop in this.options) {
            if (this.modal.hasOwnProperty(prop)) {
                this.modal[prop] = this.options[prop];
            }
        }

        this.modal.oninit();
        if (this.modal.auto) {
            this.show();
        }
    },
    show: function () {
        document.body.appendChild(this.modal.$el);
        var that = this;
        Vue.nextTick(function(){
            that.modal.show();
            if (that.modal.type === 'toast') {
                setTimeout(function(){
                    that.modal.btnsEvent(function () { });
                }, that.modal.time || 3000);
            }
        });
    }
};


export default function (options) { return new iModal(options) };

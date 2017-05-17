import Vue from 'vue';
import Modal from './modal.vue';

let ModalConstructor = Vue.extend(Modal);

class iModal {
    modal = null
    options = {}
    constructor(options = {}) {
        this.options = options;
        this.modal = new ModalConstructor({
            el: document.createElement('div')
        });
        this.create();
    }
    create() {
        let defaults = {
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
    }
    show() {
        document.body.appendChild(this.modal.$el);
        this.modal.onshow.call(this.modal.$el);
        Vue.nextTick(() => {
            this.modal.show();
            if (this.modal.type === 'toast') {
                setTimeout(() => {
                    this.modal.btnsEvent(function () { });
                }, this.modal.time || 3000)
            }
        });
    }
}


export default options => new iModal(options);

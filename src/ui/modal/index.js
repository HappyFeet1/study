import Vue from 'vue';
import Modal from './modal.vue';

var merge = function (target) {
    for (var i = 1, j = arguments.length; i < j; i++) {
        var source = arguments[i];
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                var value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
};
let instance = null;
let ModalConstructor = Vue.extend(Modal);
let intInstance = function () {
    instance = new ModalConstructor({
        el: document.createElement('div')
    });
}

let showModal = function (options) {
    options = options || {};
    if (!instance) {
        intInstance();
    }

    var defaults = {
        ok: false,
        okText: '确定',
        cancel: false,
        cancleText: '取消',
    }

    if (!options.btns) {
        options.btns = {}
    };
    if (typeof options.ok === 'function') {
        options.btns.ok = {
            text: options.okText || defaults.okText,
            callback: options.ok || defaults.ok
        };
    }

    if (typeof options.cancel === 'function') {
        options.btns.cancel = {
            text: options.cancelText || defaults.cancleText,
            callback: options.cancel || defaults.cancel
        };
    }

    for (var prop in options) {
        if (instance.hasOwnProperty(prop)) {
            instance[prop] = options[prop];
        }
    }


    instance.oninit();
    if (instance.auto) {
        showModal.show();
    }
};

showModal.show = function () {
    document.body.appendChild(instance.$el);
    instance.onshow.call(instance.$el);
    Vue.nextTick(() => {
        instance.isShow = true;
    });
};


export default showModal;

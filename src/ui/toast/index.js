import Modal from '../modal/';

let Toast = function (content, time) {
    return Modal({
        type: 'toast',
        content: content,
        time: time || 3000
    });
};
Toast.success = function (content, time) {
    return Modal({
        type: 'toast',
        content: content,
        iconClass: 'mintui mintui-success',
        time: time || 3000
    });
}

export default Toast
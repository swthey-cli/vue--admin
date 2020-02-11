import { MessageBox } from 'element-ui';
export default {
    install(Vue, options) { //自定义全局方法
        Vue.prototype.deleted = (params) => {
            MessageBox.confirm(params.content, '提示', {
                confirmButtonText: '确认',
                cacelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                params.fn && params.fn();
            }).catch(() => { })
        }
    }
}
import { MessageBox } from 'element-ui';
import { reactive, ref } from "@vue/composition-api";
export function global(params) {
    const str = ref("");
    const confirm = (params) => {
        MessageBox.confirm(params.content, '提示', {
            confirmButtonText: '确认',
            cacelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            params.fn && params.fn();
        }).catch(() => { })
    }
    return{
        str,
        confirm
    }
}
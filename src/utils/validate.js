/**
 * 过滤特殊字符
 */
export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 验证邮箱
 */
export function ValidateEmail(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value)?false:true;
}

/**
 * 验证密码
 */
export function VaildatePass(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value)?false:true;
}

/**
 * 验证验证码
 */
export function ValidateVcode(value){
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value)?false:true;
}
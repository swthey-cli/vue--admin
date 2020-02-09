import cookie from "cookie_js";
const adminToKen = "admin_token";
const loginName = "username";
export function getToken() {
    return cookie.get(adminToKen);
}
export function setToken(token) {
    cookie.set(adminToKen, token);
}
export function removeToken() {
    return cookie.remove(adminToKen);
}
export function getUserName() {
    return cookie.get(loginName);
}
export function setUserName(name) {
    cookie.set(loginName, name);
}
export function removeUserName() {
    return cookie.remove(loginName);
}
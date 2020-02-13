import axios from 'axios';
import { Message } from 'element-ui';
import { getToken, getUserName } from './app';
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devapi';
const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
});
// 请求接口前 做一些数据处理(请求拦截器)
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["ToKey"] = getToken();
    config.headers["UserName"] = getUserName();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
//  请求接口后 做一些数据处理(响应拦截器)
service.interceptors.response.use(function (response) {
    let data = response.data;
    if (data.resCode !== 0) {
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        return response;
    }
    // 对响应数据做点什么
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default service;
import axios from 'axios';
import statusCodes from '../config/status';
import store from '../redux/store';

const axiosIns = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000,
})

axiosIns.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.headers['content-type'] = 'application/x-www-form-urlencoded';
        config.data = Object.keys(config.data).reduce((prev, key) => prev +
            `&${key}=${config.data[key]}`, '').substring(1);
    }
    const { user: { token } } = store.getState();
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

axiosIns.interceptors.response.use((res) => {
    if (res.data.status === 0) {
        return res.data.data;
    } else {
        return Promise.reject(res.data.msg);
    }
}, (err) => {
    if (err.response) {
        const errMsg = statusCodes[err.response.status] ? statusCodes[err.response.status] : '网络故障';
        return Promise.reject(errMsg);
    } else {
        if (err.message.match(/Network Error/g)) {
            return Promise.reject('服务没有启动');
        } else if (err.message.match(/timeout/g)) {
            return Promise.reject('连接超时');
        } else {
            return Promise.reject('未知错误');
        }
    }
});

export default axiosIns;
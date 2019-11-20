import axiosIns from './request';

export default function reqLogin(username, password) {
    return axiosIns({
        method: 'POST',
        url: '/login',
        data: {
            username,
            password
        }
    });
}
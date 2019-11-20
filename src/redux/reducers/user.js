import { SET_USER_ASYNC } from '../action-types/user';
import { getItem } from '../../storage/user-storage';

// 页面刷新，组件重新渲染时确保store里有状态。
const prev = getItem('user') || {};

export default function user(prevState = prev, action) {
    switch (action.type) {
        case SET_USER_ASYNC:
            return action.data;
        default:
            return prevState;
    }
}
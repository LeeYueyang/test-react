import reqLogin from '../../api';
import { SET_USER_ASYNC, REMOVE_USER } from '../action-types/user';

const setUser = (user) => {
    return {
        type: SET_USER_ASYNC,
        data: user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

export function setUserAsync(username, password) {
    return (dispatch) => {
        //做异步操作。
        return reqLogin(username, password).then((res) => {
            const action = setUser(res);
            //分发action。
            dispatch(action);
            return res;
        })
    }
}

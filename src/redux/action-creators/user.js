import reqLogin from '../../api';
import { SET_USER_ASYNC } from '../action-types/user';

const setUser = (user) => {
    return {
        type: SET_USER_ASYNC,
        data: user
    }
}

export function setUserAsync(username, password) {
    console.log('outer');
    return (dispatch) => {
        //做异步操作。
        console.log('inner1');
        return reqLogin(username, password).then((res) => {
            console.log('inner2');
            const action = setUser(res);
            //分发action。
            dispatch(action);
            return res;
        })
    }
}

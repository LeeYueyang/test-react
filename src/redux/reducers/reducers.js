import { combineReducers } from 'redux';

function stateName(prevState = {}, action) {
    switch (action.type) {
        default:
            return prevState;
    }
}

export default combineReducers({
    stateName
})
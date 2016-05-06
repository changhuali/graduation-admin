import {
    LOGIN,
    CHECK_LOGIN,
    LOGOUT,
    RESET_INFO,
    GET_APPLY_LIST,
} from '../action/userAc';

export default function (state={info: {}, applyList: {}}, action) {
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {info: action.data});
        case CHECK_LOGIN:
            return Object.assign({}, state, {info: action.data});
        case LOGOUT:
            return Object.assign({}, state, {info: action.data});
        case RESET_INFO:
            return Object.assign({}, state, {info: action.data});
        case GET_APPLY_LIST:
            return Object.assign({}, state, {applyList: action.data});
        default:
            return state;

    }
}

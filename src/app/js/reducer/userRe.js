import {
    LOGIN,
    GET_USER_LIST,
    CHECK_LOGIN,
    LOGOUT,
    RESET_INFO,
    GET_APPLY_LIST,
    GET_ONLINEDEMO_LIST,
    GET_NEWS_LIST,
} from '../action/userAc';

export default function (state={info: {}, userList: {}, applyList: {}, onlineDemoList: {}, newsList: {}}, action) {
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {info: action.data});
        case GET_USER_LIST:
            return Object.assign({}, state, {userList: action.data});
        case CHECK_LOGIN:
            return Object.assign({}, state, {info: action.data});
        case LOGOUT:
            return Object.assign({}, state, {info: action.data});
        case RESET_INFO:
            return Object.assign({}, state, {info: action.data});
        case GET_APPLY_LIST:
            return Object.assign({}, state, {applyList: action.data});
        case GET_ONLINEDEMO_LIST:
            return Object.assign({}, state, {onlineDemoList: action.data});
        case GET_NEWS_LIST:
            return Object.assign({}, state, {newsList: action.data});
        default:
            return state;

    }
}

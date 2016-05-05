import {
    LOGIN, CHECK_LOGIN,
    LOGOUT, RESET_INFO,
    REGIST, RESET_REGIST,
    GET_CHECK_CODE,
    CHECK_PWD ,
    CHANGE_PWD,
    CHANGE_NAME,
    RESET_CHANGE_NAME,
    CHANGE_PHONE,
    RESET_PWD,
} from '../action/userAc';

export default function (state={info: {}, registInfo: {}, checkCode: {}, checkPwd: {}, changePwd: {}, changeName: {}, changePhone: {}, resetPwd: {}}, action) {
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {info: action.data});
        case CHECK_LOGIN:
            return Object.assign({}, state, {info: action.data});
        case LOGOUT:
            return Object.assign({}, state, {info: action.data});
        case GET_CHECK_CODE:
            return Object.assign({}, state, {checkCode: action.data});
        case RESET_INFO:
            return Object.assign({}, state, {info: action.data});
        case REGIST:
            return Object.assign({}, state, {registInfo: action.data});
        case RESET_REGIST:
            return Object.assign({}, state, {registInfo: action.data});
        case CHECK_PWD:
            return Object.assign({}, state, {checkPwd: action.data});
        case CHANGE_PWD:
            return Object.assign({}, state, {changePwd: action.data});
        case CHANGE_NAME:
            return Object.assign({}, state, {changeName: action.data});
        case RESET_CHANGE_NAME:
            return Object.assign({}, state, {changeName: action.data});
        case CHANGE_PHONE:
            return Object.assign({}, state, {changePhone: action.data});
        case RESET_PWD:
            return Object.assign({}, state, {resetPwd: action.data});
        default:
            return state;

    }
}

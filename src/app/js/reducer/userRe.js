import {
    LOGIN,
    GET_USER_LIST,
    CHECK_LOGIN,
    RESET_INFO,
    GET_APPLY_LIST,
    GET_ONLINEDEMO_LIST,
    GET_NEWS_LIST,
    GET_NEWS_DETAIL,
    GET_CONTACT_LIST,
    GET_CASE_LIST,
    GET_RENDER_DETAIL,
    POST_IMG_FILE,
    ADD_RENDER,
    GET_CASE_DETAIL,
} from '../action/userAc';

export default function (state={
    info: {},
    userList: {},
    applyList: {},
    onlineDemoList: {},
    newsDetail: {},
    caseList: {},
    contactList: {},
    renderDetail: {},
    uploadFile: {},
    addRender: {},
    caseDetail: {},
    newsList: {}}, action) {
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {info: action.data});
        case GET_USER_LIST:
            return Object.assign({}, state, {userList: action.data});
        case CHECK_LOGIN:
            return Object.assign({}, state, {info: action.data});
        case RESET_INFO:
            return Object.assign({}, state, {info: action.data});
        case GET_APPLY_LIST:
            return Object.assign({}, state, {applyList: action.data});
        case GET_ONLINEDEMO_LIST:
            return Object.assign({}, state, {onlineDemoList: action.data});
        case GET_NEWS_LIST:
            return Object.assign({}, state, {newsList: action.data});
        case GET_NEWS_DETAIL:
            return Object.assign({}, state, {newsDetail: action.data});
        case GET_CONTACT_LIST:
            return Object.assign({}, state, {contactList: action.data});
        case GET_CASE_LIST:
            return Object.assign({}, state, {caseList: action.data});
        case GET_RENDER_DETAIL:
            return Object.assign({}, state, {renderDetail: action.data});
        case POST_IMG_FILE:
            return Object.assign({}, state, {uploadFile: action.data});
        case ADD_RENDER:
            return Object.assign({}, state, {addRender: action.data});
        case GET_CASE_DETAIL:
            return Object.assign({}, state, {caseDetail: action.data});
        default:
            return state;

    }
}

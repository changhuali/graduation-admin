export const LOGIN       = "LOGIN";
export const GET_USER_LIST = 'GET_USER_LIST';
export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGOUT      = "LOGOUT";
export const RESET_INFO  = "RESET_INFO";
export const APPLY_ACTION = "APPLY_ACTION";
export const GET_APPLY_LIST = "GET_APPLY_LIST";
export const GET_ONLINEDEMO_LIST = 'GET_ONLINEDEMO_LIST';
export const GET_NEWS_LIST = 'GET_NEWS_LIST';
export const GET_NEWS_DETAIL = 'GET_NEWS_DETAIL';
export const GET_CONTACT_LIST = "GET_CONTACT_LIST";
export const GET_CASE_LIST = "GET_CASE_LIST";

import HttpRequest from 'superagent';
import interceptorAction from './interceptorAction';
import {message} from 'antd';
import __has from 'lodash/has';

//登录
export function login(params) {
    return dispatch => {
        HttpRequest
        .post('/api/client/login')
        .send(params)
        .end((err, resp) => {
            var data = interceptorAction(err, resp);
            dispatch({
               type: LOGIN,
               data: data
            })
        })
    }
}

export function getUserList(params) {
    return dispatch => {
        HttpRequest
        .get('/api/client/userList')
        .query(params)
        .end((err, resp) => {
            if(resp.ok) {
                dispatch({
                    type: GET_USER_LIST,
                    data: resp.body,
                })
            } else {
                message.warn('获取用户列表失败， 请重试', 3);
            }
        })
    }
}

export function resetInfo() {
    return dispatch => {
        dispatch({
            type: RESET_INFO,
            data: {},
        })
    }
}

//检查是否登录
export function checkInfo () {
    return dispatch => {
        HttpRequest
        .get('/api/client/info')
        .end((err, resp) => {
            var data = interceptorAction(err, resp);
            dispatch({
                type: CHECK_LOGIN,
                data: data
            })
        })
    }
}

//退出
export function logout() {
    return dispatch => {
        HttpRequest
        .del('/api/client/logout')
        .end((err, resp) => {
            if(resp.ok) {
                message.success('退出成功');
                location.href='/login';
            }else{
                message.error('退出失败')
            }
            dispatch({
                type: LOGOUT,
                data: {}
            })
        })
    }
}

//处理申请
export function getApplyList(params) {
    return dispatch => {
        HttpRequest
        .get('/api/apply/getApplyList')
        .query(params)
        .end((err, resp) => {
            var data = interceptorAction(err, resp);
            dispatch({
                type: GET_APPLY_LIST,
                data: data,
            })
        })
    }
}

export function applyAction(params) {
    return dispatch => {
        HttpRequest
        .put('/api/apply/action')
        .send(params)
        .end((err, resp) => {
            interceptorAction(err, resp);
            if(resp.ok) {
                message.success(resp.body.message, 3);
                HttpRequest
                .get('/api/apply/getApplyList')
                .end((err, resp) => {
                    var data = interceptorAction(err, resp);
                    dispatch({
                        type: GET_APPLY_LIST,
                        data: data,
                    })
                })
            }else{
                message.error(resp.body.message, 3);
            }
            dispatch({
                type: APPLY_ACTION,
                data: resp.body,
            })
        })
    }
}

export function getOnlineDemoList(params) {
    return dispatch => {
        HttpRequest
        .get('/api/onlineDemo/getOnlineDemoList')
        .query(params)
        .end((err, resp) => {
            dispatch({
                type: GET_ONLINEDEMO_LIST,
                data: resp.body,
            })
        })
    }
}
//处理联系
export function getContactList(params) {
    return dispatch => {
        HttpRequest
        .get('/api/contact/getContactList')
        .query(params)
        .end((err, resp) => {
            interceptorAction(err, resp);
            dispatch({
                type: GET_CONTACT_LIST,
                data: resp.body,
            })
        })
    }
}

export function getNewsList(params) {
    return dispatch => {
        HttpRequest
        .get('/api/news/getNewsList')
        .query(params)
        .end((err, resp) => {
            dispatch({
                type: GET_NEWS_LIST,
                data: resp.body,
            })
        })
    }
}
export function contactAction(params) {
    return dispatch => {
        HttpRequest
        .put('/api/contact/action')
        .send(params)
        .end((err, resp) => {
            interceptorAction(err, resp);
            if(resp.ok) {
                message.success(resp.body.message, 3);
                HttpRequest
                .get('/api/contact/getContactList')
                .end((err, resp) => {
                    var data = interceptorAction(err, resp);
                    dispatch({
                        type: GET_CONTACT_LIST,
                        data: data,
                    })
                })
            }else{
                message.error(resp.body.message, 3);
            }
        })
    }
}

export function getNewsDetail(params) {
    return dispatch => {
        HttpRequest
        .get('/api/news/getNewsDetail')
        .query(params)
        .end((err, resp) => {
            dispatch({
                type: GET_NEWS_DETAIL,
                data: resp.body,
            })
        })
    }
}
//处理案例
export function getCaseList(params) {
    return dispatch => {
        HttpRequest
        .get('/api/family/caseList')
        .query(params)
        .end((err, resp) => {
            interceptorAction(err, resp);
            dispatch({
                type: GET_CASE_LIST,
                data: resp.body,
            })
        })
    }
}

export function updateNews(params) {
    return dispatch => {
        HttpRequest
        .put('/api/news/updateNews')
        .send(params)
        .end((err, resp) => {
            if(resp.ok) {
                message.success('修改成功', 3);
            } else {
                message.warn('修改失败', 3);
            }
        })
    }
}
export function editCaseItem(params) {
    return dispatch => {
        HttpRequest
        .put('/api/family/editCaseItem')
        .send(params)
        .end((err, resp) => {
            if(resp.ok) {
                message.success('已成功修改该信息');
            }else{
                message.warn(resp.body.message);
            }
        })
    }
}

export function delCaseItem(params) {
    return dispatch => {
        HttpRequest
        .del('/api/family/delCaseItem')
        .send(params)
        .end((err, resp) => {
            interceptorAction(err, resp);
            if(resp.ok) {
                message.success('删除信息成功');
                getCaseList({keyword: ""})(dispatch);
            }else{
                message.warn(resp.body.message);
            }
        })
    }
}

export function postImgFile(params) {
    return dispatch => {
        HttpRequest
        .post('/api/family/postCaseImg')
        .send(params)
        .end((err, resp) => {
            interceptorAction(err, resp);
            if(resp.ok) {
                message.success('提交成功');
            }else{
                message.warn("---");
            }
        })
    }
}

export const LOGIN       = "LOGIN";
export const GET_USER_LIST = 'GET_USER_LIST';
export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGOUT      = "LOGOUT";
export const RESET_INFO  = "RESET_INFO";
export const APPLY_ACTION = "APPLY_ACTION";
export const GET_APPLY_LIST = "GET_APPLY_LIST";
export const GET_ONLINEDEMO_LIST = 'GET_ONLINEDEMO_LIST';
export const GET_NEWS_LIST = 'GET_NEWS_LIST';

import HttpRequest from 'superagent';
import interceptorAction from './interceptorAction';
import {message} from 'antd';
import __has from 'lodash/has';

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

export const LOGIN       = "LOGIN";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGOUT      = "LOGOUT";
export const RESET_INFO  = "RESET_INFO";
export const REGIST      = "REGIST";
export const RESET_REGIST   = "RESET_REGIST";
export const GET_CHECK_CODE = 'GET_CHECK_CODE';
export const CHECK_PWD   = 'CHECK_PWD';
export const CHANGE_PWD  = 'CHANGE_PWD';
export const CHANGE_NAME = 'CHANGE_NAME';
export const RESET_CHANGE_NAME = 'RESET_CHANGE_NAME';
export const CHANGE_PHONE = 'CHANGE_PHONE';
export const RESET_PWD   = 'RESET_PWD';
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

export function regist(params) {
    return dispatch => {
        HttpRequest
        .post('/api/client/regist')
        .send(params)
        .end((err, resp) => {
            if (resp.ok) {
                message.success("注册成功");
            } else {
                message.error(resp.body.message);
            }
            var data = interceptorAction(err, resp);
            dispatch({
               type: REGIST,
               data: data
            })
        })
    }
}

export function getCheckCode(phone, forWhat) {
    var url = forWhat == 'changePhone' ? '/api/user/checkCode' : '/api/client/checkCode';
    return dispatch => {
        HttpRequest
        .post(url)
        .send({phone: phone, type: forWhat})
        .end((err, resp) => {
            dispatch({
                type: GET_CHECK_CODE,
                data: resp.body,
            });
        });
    };
}

export function checkPwd(pwd) {
    return dispatch => {
        HttpRequest
        .post('/api/user/checkpwd')
        .send({userPwd: pwd})
        .end((err, resp) => {
            dispatch({
                type: CHECK_PWD,
                data: resp.body,
            });
        });
    };
}

export function changePwd(params) {
    return dispatch => {
        HttpRequest
        .post('/api/user/changePwd')
        .send(params)
        .end((err, resp) => {
            if(resp.ok) {
                message.info('密码修改成功,请重新登录', 3);
                setTimeout(()=>{location.href='/login'}, 3000);
            }else if(__has(resp.body, 'errorCode')){
                message.error(resp.body.message);
            }
            dispatch({
                type: CHANGE_PWD,
                data: resp.body,
            })
        })
    }
}

export function changeName(params) {
    return dispatch => {
        HttpRequest
        .post('/api/user/changeName')
        .send(params)
        .end((err, resp) => {
            if(resp.ok) {
                message.info('用户名修改成功' , 3);
            }
            dispatch({
                type: CHANGE_NAME,
                data: resp.body,
            })
        })
    }
}

export function changePhone(params) {
    return dispatch => {
        HttpRequest
        .post('/api/user/changePhone')
        .send(params)
        .end((err, resp) => {
            if(resp.ok) {
                message.info('手机号码更改成功');
            }else if(__has(resp.body, 'errorCode')){
                message.error(resp.body.message);
            }
            console.log(resp);
            dispatch({
                type: CHANGE_PHONE,
                data: resp.body,
            })
        })
    }
}

export function resetPwd(params) {
    return dispatch => {
        HttpRequest
        .post('/api/client/resetPwd')
        .send(params)
        .end((err, resp) => {
            if(resp.ok) {
                message.info('密码找回成功');
            }else if(__has(resp.body, 'errorCode')){
                message.error(resp.body.message);
            }
            dispatch({
                type: RESET_PWD,
                data: resp.body,
            })
        })
    }
}

export function resetRegistInfo() {
    return dispatch => {
        dispatch({
            type: RESET_REGIST,
            data: {},
        })
    }
}

export function resetChangeName() {
    return dispatch => {
        dispatch({
            type: RESET_CHANGE_NAME,
            data: {},
        })
    }
}

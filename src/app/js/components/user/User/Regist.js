import React, { Component } from 'react';
import { Link } from 'react-router';
import Login from './Login';
import { message } from 'antd';
import __has from 'lodash/has';
import { __FORMCHECK__ } from '../../../../../config/class';
let t = '';
export default class Regist extends Component {
    constructor(props){
        super(props);
        this.state={
            registObj: {
                userName: "",
                phone: "",
                userPwd: "",
                userRePwd: "",
                checkCode: "",
            },
            registTag: {
                userName: false,
                phone: false,
                userPwd: false,
                userRePwd: false,
                checkCode: false,
            },
            checking: 61,
            registing: false,
            message: {
                userName: "",
                phone: "",
                userPwd: "",
                userRePwd: "",
                checkCode: "",
            },
        }
    }

    resetState() {
        this.setState({
            registObj: {
                userName: "",
                phone: "",
                userPwd: "",
                userRePwd: "",
                checkCode: "",
            },
            registTag: {
                userName: false,
                phone: false,
                userPwd: false,
                userRePwd: false,
                checkCode: false,
            },
            message: {
                userName: "",
                phone: "",
                userPwd: "",
                userRePwd: "",
                checkCode: "",
            },
            checking: 61,
            registing: false,
        });
    }

    setRegistObj(e) {
        var newObj = Object.assign({}, this.state.registObj, {[e.target.name]: e.target.value});
        this.setState({
            registObj: newObj,
        })
    }

    setMessage(key, value) {
        var newObj = Object.assign({}, this.state.message, {[key]: value});
        this.setState({
            message: newObj,
        });
    }

    checkFormat(e) {
        var message = "";
        switch(e.target.name) {
            case "userName":
                message = __FORMCHECK__.checkUser(e.target.value);
                this.setMessage('userName', message);
                break;
            case "phone":
                message = __FORMCHECK__.checkPhone(e.target.value);
                this.setMessage('phone', message);
                break;
            case "userPwd":
                message = __FORMCHECK__.checkPwd(e.target.value);
                this.setMessage('userPwd', message);
                break;
            case "userRePwd":
                message = __FORMCHECK__.checkRePwd(this.state.registObj.userRePwd, this.state.registObj.userPwd);
                this.setMessage('userRePwd', message);
                break;
            case "checkCode":
                message = __FORMCHECK__.checkCode(e.target.value);
                this.setMessage('checkCode', message);
                break;
        }
        this.setState({
            registTag: Object.assign(this.state.registTag, {[e.target.name]: message.length != 0 ? false : true}),
        })
    }

    getCheckCode() {
        var phone = this.state.registObj.phone;
        if(phone != ''){
            this.props.userBoundAc.getCheckCode(phone, 'regist');
            this.setState({
                checking: 60,
            });
            this.changeChecking();
        }else{
            message.warn('请输入手机号');
        }
    }

    changeChecking() {
        var time = this.state.checking;
        if(time > 0) {
            t = setTimeout(
                () => {
                    this.setState({
                        checking: time-1,
                    });
                    this.changeChecking();
                }, 1000
            );
        }else if(time == 0) {
            this.setState({
                checking: 61,
            });
        }
    }

    regist(e) {
        e.preventDefault();
        var obj = this.state.registTag;
        var messageObj = this.state.message;
        var tag = Object.keys(obj).every(key => {
            return obj[key] != false;
        })
        if(tag){
            this.setState({
                registing: true,
            })
            this.props.userBoundAc.regist(this.state.registObj);
        }else{
            message.warn('请检查您输入信息格式是否错误', 3);
        }
    }

    resetMessage(e) {
        this.setState({
            message: Object.assign({}, this.state.message, {[e.target.name]: ""}),
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.registInfo.id != undefined) {
            this.setState({
                registing: false,
            });
            this.props.userBoundAc.resetRegistInfo();
            clearTimeout(t);
            this.resetState();
        }else if(__has(nextProps.user.registInfo, "errorCode")) {
            this.setState({
                registing: false,
            });
            this.props.userBoundAc.resetRegistInfo();
        }
    }

    render() {
        var formObj = this.state.registObj;
        return(
            <div className="user-right-registForm">
                <input className="user-right-user"
                    type='text'
                    name="userName"
                    onChange={this.setRegistObj.bind(this)}
                    onFocus={this.resetMessage.bind(this)}
                    onBlur={this.checkFormat.bind(this)}
                    value={formObj.userName}
                    autoComplete="off"
                    placeholder="用户名" />
                <p className="user-msg">{this.state.message.userName}</p>
                <input className="user-right-user"
                    type='text'
                    name="phone"
                    onChange={this.setRegistObj.bind(this)}
                    onFocus={this.resetMessage.bind(this)}
                    onBlur={this.checkFormat.bind(this)}
                    value={formObj.phone}
                    autoComplete="off"
                    placeholder="手机号" />
                <p className="user-msg">{this.state.message.phone}</p>
                <input className="user-right-pwd"
                    type='password'
                    name="userPwd"
                    onChange={this.setRegistObj.bind(this)}
                    onFocus={this.resetMessage.bind(this)}
                    onBlur={this.checkFormat.bind(this)}
                    value={formObj.userPwd}
                    autoComplete="off"
                    placeholder="密码" />
                <p className="user-msg">{this.state.message.userPwd}</p>
                <input className="user-right-pwd"
                    type='password'
                    name="userRePwd"
                    onChange={this.setRegistObj.bind(this)}
                    onFocus={this.resetMessage.bind(this)}
                    onBlur={this.checkFormat.bind(this)}
                    value={formObj.userRePwd}
                    autoComplete="off"
                    placeholder="确认密码" />
                <p className="user-msg">{this.state.message.userRePwd}</p>
                <input className="user-right-checkCode"
                    type='text'
                    name="checkCode"
                    onChange={this.setRegistObj.bind(this)}
                    onFocus={this.resetMessage.bind(this)}
                    onBlur={this.checkFormat.bind(this)}
                    value={formObj.checkCode}
                    autoComplete="off"
                    placeholder="验证码" />
                <button onClick={this.getCheckCode.bind(this)}
                    className="user-right-sub user-checkCode"
                    disabled={this.state.checking != 61 ? "disabled" : ""}>
                    {this.state.checking == 61 ? '获取验证码' : this.state.checking + 's后重新获取'}
                </button>
                <p className="user-msg">{this.state.message.checkCode}</p>
                <p className="user-right-autoLogin clearfix">
                    <input className="user-remenberPwd"
                        type="checkBox"
                        name="agreement" />&nbsp;&nbsp;我已阅读并同意<Link to={{pathname: "/"}}>《国风用户服务协议》</Link>
                </p>
                <button className="user-right-sub"
                    onClick={this.regist.bind(this)}
                    disabled={this.state.registing ? "disabled" : ""}>
                    {this.state.registing ? "注册中" : "立即注册"}
                </button>
            </div>
        )
    }
}

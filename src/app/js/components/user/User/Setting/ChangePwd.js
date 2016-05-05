import React, { Component } from 'react';
import { message } from 'antd';
import __has from 'lodash/has';
import { __FORMCHECK__ } from '../../../../../../config/class';

export default class ChangePwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeObj: {
                befPwd: "",
                newPwd: "",
                rePwd: "",
            },
            changeTag: {
                befPwd: false,
                newPwd: false,
                rePwd: false,
            },
            message: {
                befPwd: "",
                newPwd: "",
                rePwd: "",
            },
            changing: false,
            showCheck: false,
            checkPass: false,
        }
    }

    resetState() {
        this.setState({
            changeObj: {
                befPwd: "",
                newPwd: "",
                rePwd: "",
            },
            changeTag: {
                befPwd: false,
                newPwd: false,
                rePwd: false,
            },
            message: {
                befPwd: "",
                newPwd: "",
                rePwd: "",
            },
            changing: false,
            showCheck: false,
            checkPass: false,
        })
    }

    setChangeObj(e) {
        var newObj = Object.assign({}, this.state.changeObj, {[e.target.name]: e.target.value});
        this.setState({
            changeObj: newObj,
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
            case "befPwd":
                message = __FORMCHECK__.checkPwd(e.target.value, '原');
                if(message.length == 0 && this.props.user.info.id != undefined) {
                    this.props.userBoundAc.checkPwd(e.target.value);
                }
                this.setMessage('befPwd', message);
                break;
            case "newPwd":
                message = __FORMCHECK__.checkPwd(e.target.value, '新');
                var str = __FORMCHECK__.checkRePwd(e.target.value, this.state.changeObj.befPwd);
                if(str.length == 0) {
                    message = '新密码不能与原密码相同'
                }
                this.setMessage('newPwd', message);
                break;
            case "rePwd":
                message = __FORMCHECK__.checkRePwd(e.target.value, this.state.changeObj.newPwd);
                this.setMessage('rePwd', message);
                break;
        }
        this.setState({
            changeTag: Object.assign(this.state.changeTag, {[e.target.name]: message.length != 0 ? false : true}),
        })
    }

    change(e) {
        e.preventDefault();
        var obj = this.state.changeTag;
        var tag = Object.keys(obj).every(key => {
            return obj[key] != false;
        })
        if(tag){
            this.setState({
                changing: true,
            })
            this.props.userBoundAc.changePwd(this.state.changeObj);
        }else{
            message.warn('请检查您输入信息格式是否错误', 3);
        }
    }

    resetMessage(e) {
        this.setState({
            message: Object.assign({}, this.state.message, {[e.target.name]: ""}),
        })
        if(e.target.name == 'bePwd') {
            this.setState({
                showCheck: false,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.checkPwd.id != undefined) {
            this.setState({
                showCheck: true,
                checkPass: true,
            });
        }else if(__has(nextProps.user.checkPwd, 'errorCode')) {
            this.setState({
                showCheck: true,
                checkPass: false,
            })
        }
        if(nextProps.user.changePwd.id != undefined) {
            this.resetState();
        }else if(__has(nextProps.user.changePwd, 'errorCode')){
            this.setState({
                changing: false,
            })
        }
    }

    render() {
        var formObj = this.state.changeObj;
        return (
            <div>
                <input className="user-right-user"
                    type='text'
                    name="befPwd"
                    onChange={this.setChangeObj.bind(this)}
                    onFocus={this.resetMessage.bind(this)}
                    onBlur={this.checkFormat.bind(this)}
                    value={formObj.befPwd}
                    autoComplete="off"
                    placeholder="原密码" />
                {this.state.showCheck?<i style={{color: this.state.checkPass ? '#52ab0d' : '#dd3103', position: 'absolute', right: '25px', top: '20px'}} className="fa  fa-info-circle"></i>:""}
                <p className="user-msg">{this.state.message.befPwd}</p>
                <input className="user-right-pwd"
                    type='text'
                    name="newPwd"
                    onChange={this.setChangeObj.bind(this)}
                    onFocus={this.resetMessage.bind(this)}
                    onBlur={this.checkFormat.bind(this)}
                    value={formObj.newPwd}
                    autoComplete="off"
                    placeholder="新密码" />
                <p className="user-msg">{this.state.message.newPwd}</p>
                <input className="user-right-pwd"
                    type='text'
                    name="rePwd"
                    onChange={this.setChangeObj.bind(this)}
                    onFocus={this.resetMessage.bind(this)}
                    onBlur={this.checkFormat.bind(this)}
                    value={formObj.rePwd}
                    autoComplete="off"
                    placeholder="确认密码" />
                <p className="user-msg">{this.state.message.rePwd}</p>
                <button className="user-right-sub"
                    onClick={this.change.bind(this)}
                    disabled={this.state.changing ? "disabled" : ""}>
                    {this.state.changing ? "修改中" : "立即修改"}
                </button>
            </div>
        )
    }
}

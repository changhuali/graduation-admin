import React, { Component } from 'react';
import { message } from 'antd';
import __has from 'lodash/has';
import { __FORMCHECK__ } from '../../../../../../config/class';

export default class ChangeName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeObj: {
                userName: "",
            },
            changeTag: {
                userName: false,
            },
            changing: false,
            message: {
                userName: false,
            }
        }
    }

    resetState(){
        this.setState({
            changeObj: {
                userName: "",
            },
            changeTag: {
                userName: false,
            },
            changing: false,
            message: {
                userName: false,
            }
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
            case "userName":
                message = __FORMCHECK__.checkUser(e.target.value);
                if(e.target.value == this.props.user.info.userName) {
                    message = '新用户名不能与原名称相同';
                }
                this.setMessage('userName', message);
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
            this.props.userBoundAc.changeName(this.state.changeObj);
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
        if(nextProps.user.changeName.id != undefined) {
            this.props.userBoundAc.resetChangeName();
            this.props.userBoundAc.checkInfo();
            this.setState({
                changing: false,
            })
            this.resetState();
        }else if(__has(nextProps.user.changeName, 'errorCode')){
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
                    name="userName"
                    onChange={this.setChangeObj.bind(this)}
                    onFocus={this.resetMessage.bind(this)}
                    onBlur={this.checkFormat.bind(this)}
                    value={formObj.userName}
                    autoComplete="off"
                    placeholder="用户名" />
                <p className="user-msg">{this.state.message.userName}</p>
                <button className="user-right-sub"
                    onClick={this.change.bind(this)}
                    disabled={this.state.changing ? "disabled" : ""}>
                    {this.state.changing ? "修改中" : "立即修改"}
                </button>
            </div>
        )
    }
}

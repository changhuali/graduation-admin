import React, { Component } from 'react';
import { Link } from 'react-router';
import Login from './User/Login';
import Regist from './User/Regist';
import img_left from '../../../images/login_left.jpg';

export default class User extends Component {
    constructor(props){
        super(props);
        this.state={
            tabActive: "login",
            bodyHeight: "auto",
        }
    }

    changeTab(e) {
        this.setState({
            tabActive: e.target.id,
        });
    }

    createItem() {
        var obj = {
            login: <Login {...this.props} />,
            regist: <Regist {...this.props} />
        };
        return obj[this.state.tabActive];
    }

    getBodyHeight() {
        var bodyHeight = window.innerHeight-342 < 500 ? 500 : window.innerHeight - 342;
        this.setState({
            bodyHeight: bodyHeight,
        })
    }

    componentDidMount() {
        this.props.hideNav(true);
        this.getBodyHeight();
        window.onresize = () => {
            this.getBodyHeight();
        }
    }

    componentWillUnmount() {
        this.props.hideNav(false);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location.pathname == '/regist' || nextProps.location.pathname == 'regist') {
            this.setState({
                tabActive: 'regist',
            });
        }else{
            this.setState({
                tabActive: 'login',
            });
        }
    }

    render() {
        var style= {minHeight: this.state.bodyHeight};
        var login = this.state.tabActive == "login" ? "color_999 active" : "color_999";
        var regist= this.state.tabActive == "regist"? "color_999 active" : "color_999";
        return(
            <div className="user-wrap">
                <div className="user-header">
                    <h2>{this.state.tabActive == "login" ? '欢迎登录' : '欢迎注册'}</h2>
                </div>
                <div style={style} className="user-content clearfix">
                    <div className="user-left">
                        <Link to={{pathname: '/'}}><img src={img_left} alt="" /></Link>
                    </div>
                    <div className="user-right">
                        <div className="user-right-tab">
                            <Link to={{pathname: "login"}}><span id="login" className={login} onClick={this.changeTab.bind(this)}>账号登录</span></Link>
                            <Link to={{pathname: "regist"}}><span id="regist" className={regist} onClick={this.changeTab.bind(this)}>账号注册</span></Link>
                        </div>
                        {this.createItem()}
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import { Link } from 'react-router';
import ChangePwd from './Setting/ChangePwd';
import ChangeName from './Setting/ChangeName';
import ChangePhone from './Setting/ChangePhone';
import FindPwd from './Setting/FindPwd';
import img_left from '../../../../images/login_left.jpg';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class Regist extends Component {
    constructor(props){
        super(props);
        this.state={
            bodyHeight: "auto",
        }
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

    render() {
        var style= {minHeight: this.state.bodyHeight};
        var formObj = this.state.registObj;
        return(
            <div className="user-wrap">
                <div className="user-header">
                    <h2>个人设置</h2>
                </div>
                <div style={style} className="user-content clearfix">
                    <div className="user-left">
                        <Link to={{pathname: '/'}}><img src={img_left} alt="" /></Link>
                    </div>
                    <div className="user-set-right">
                        {this.props.user.info.id ?
                            <Tabs tabPosition="left">
                                <TabPane tab="修改密码" key="1">
                                    <div className="user-pane">
                                        <ChangePwd {...this.props} />
                                    </div>
                                </TabPane>
                                <TabPane tab="修改用户名" key="2">
                                    <div className="user-pane">
                                        <ChangeName {...this.props} />
                                    </div>
                                </TabPane>
                                <TabPane tab="更换手机" key="3">
                                    <div className="user-pane">
                                        <ChangePhone {...this.props} />
                                    </div>
                                </TabPane>
                            </Tabs>
                            :
                            <Tabs tabPosition="left">
                                <TabPane tab="找回密码" key="1">
                                    <div className="user-pane">
                                        <FindPwd {...this.props} />
                                    </div>
                                </TabPane>
                            </Tabs>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

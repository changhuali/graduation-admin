import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';

import logo from '../../../images/logo.jpg';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    logOut() {
        this.props.userBoundAc.logout();
    }

    render() {
        const rightMenu = (
          <Menu>
            <Menu.Item >
              <a onClick={this.logOut.bind(this)} ><i className="fa fa-sign-out"></i>&nbsp;&nbsp;登出</a>
            </Menu.Item>
          </Menu>
        );
        return(
            <div className="header-wrap">
                <div className="header clearfix">
                    <div className="header-logo">
                        <Link to='/'><img className="img_full" src={logo} /></Link>
                    </div>
                    {this.props.user.info.id?
                    <div className="header-user">
                        <Dropdown overlay={rightMenu}>
                          <a className="ant-dropdown-link">
                            <span>{this.props.user.info.userName}</span> <Icon type="down" />
                          </a>
                        </Dropdown>
                    </div>:""}
                </div>
            </div>
        )
    }
}

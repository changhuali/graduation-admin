import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from '../../../images/logo.jpg';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <div className="header-wrap">
                <div className="header clearfix">
                    <div className="header-logo">
                        <img className="img_full" src={logo} />
                    </div>
                    <div className="header-user">{this.props.user.info.userName}</div>
                </div>
            </div>
        )
    }
}

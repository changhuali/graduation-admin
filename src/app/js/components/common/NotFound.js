import React, { Component } from 'react';
import {Alert} from 'antd';

export default class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Alert type={this.props.type} message={this.props.message} />
            </div>
        )
    }
}
NotFound.defaultProps = {
    type: 'info',
    message: '没有找到相关信息',
}

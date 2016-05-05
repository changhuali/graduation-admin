import React, { Component } from 'react';
import {Spin} from 'antd';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Spin />
            </div>
        )
    }
}

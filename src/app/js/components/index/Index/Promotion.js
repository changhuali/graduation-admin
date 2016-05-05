import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Promotion extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    componentWillUnmount() {
        window.scrollTo(0, 0);
    }

    render(){
        return(
            <div className="promotion-wrap">
                <div className="promotion">
                </div>
            </div>
        )
    }
}

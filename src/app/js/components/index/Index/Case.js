import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Case extends Component{
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
            <div className="case-wrap">
                <div className="case">
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class News extends Component{
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
            <div className="apply-wrap">
                <div className="apply">
                </div>
            </div>
        )
    }
}

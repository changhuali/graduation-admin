import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Contact extends Component{
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
            <div className="contact-wrap">
                <div className="contact">
                </div>
            </div>
        )
    }
}

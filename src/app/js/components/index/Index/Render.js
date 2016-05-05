import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Render extends Component{
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
            <div className="render-wrap">
                <div className="render">
                </div>
            </div>
        )
    }
}

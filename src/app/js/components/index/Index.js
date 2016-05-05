import React, { Component } from 'react';

export default class Index extends Component{
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
            <div className="index-wrap">
                <div className="index">

                </div>
            </div>
        )
    }
}

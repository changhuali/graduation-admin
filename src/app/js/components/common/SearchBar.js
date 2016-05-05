import React, { Component } from 'react';
import {Icon} from 'antd';

export default class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state={
            searchInput: "",
        }
    }

    onChange(e) {
        this.setState({
            searchInput: e.target.value,
        })
    }

    onFocus() {
        if(this.props.onFocus){
            this.props.onFocus(this.trim(this.state.searchInput));
        }
    }

    search() {
        if(this.props.search){
            this.props.search(this.trim(this.state.searchInput));
        }
    }

    trim(value) {
        return value.replace(/(^\s*)|(\s*$)/, "");
    }

    render() {
        return (
            <div className="searchInput-wrap">
                <div className="searchInput">
                    <input className="search-input"
                        onChange={this.onChange.bind(this)}
                        onFocus={this.onFocus.bind(this)}
                        value={this.state.searchInput}
                        {...this.props} />
                    <button onClick={this.search.bind(this)} className="search-btn"><Icon type="search"/></button>
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Index extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    componentWillUnmount() {
        window.scrollTo(0, 0);
    }

    createItem() {
        var list = [];
        DATA.map((obj, idx) => {
            list.push(
                <Link key={obj.link+idx} to={obj.link}>
                    <div className="index-list" style={{background: obj.color}}>
                        <span>{obj.key}</span>
                    </div>
                </Link>
            )
        });
        return list;
    }

    render(){
        return(
            <div className="index-wrap">
                <div className="index">
                    {this.createItem()}
                </div>
            </div>
        )
    }
}
var DATA = [
    {key: '申请列表管理', link: '/apply', color: 'rgb(86, 203, 143)'},
    {key: '装修案例管理', link: '/case', color: 'rgb(71, 172, 91)'},
    {key: '效果图管理', link: '/rendering', color: 'rgba(111, 101, 176, 0.69)'},
    {key: '资讯管理', link: '/news', color: 'rgb(89, 199, 203)'},
    {key: '优惠活动管理', link: '/promotion', color: 'rgb(34, 147, 113)'},
    {key: '联系信息管理', link: '/contact', color: 'rgb(128, 96, 196)'},
];

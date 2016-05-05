import React, { Component } from 'react';

export default class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    createItem() {
        var list = [];
        DATA.map((obj, idx) => {
            list.push(
                <li key={obj.text+idx} className="index-progress-item">
                    <i className={"index-progress-icon-"+(idx+1)}></i>
                    <span>{obj.text}</span>
                </li>
            )
        })
        return list;
    }

    render() {
        return (
            <ul className="index-progress clearfix">
                {this.createItem()}
            </ul>
        )
    }
}
const DATA = [
    {src: '', text: '接受申请'},
    {src: '', text: '实地考察'},
    {src: '', text: '前期准备'},
    {src: '', text: '设计阶段'},
    {src: '', text: '材料选购'},
    {src: '', text: '施工阶段'},
    {src: '', text: '竣工验收'},
    {src: '', text: '软装配饰'},
    {src: '', text: '装修保障'},
];

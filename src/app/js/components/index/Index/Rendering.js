import React, { Component } from 'react';
import {routerShape} from 'react-router';

import rendering_1 from '../../../../images/index/render/rendering_1.jpg';
import rendering_2 from '../../../../images/index/render/rendering_2.jpg';
import rendering_3 from '../../../../images/index/render/rendering_3.jpg';
import rendering_4 from '../../../../images/index/render/rendering_4.jpg';
import rendering_5 from '../../../../images/index/render/rendering_5.jpg';
import rendering_6 from '../../../../images/index/render/rendering_6.jpg';
import rendering_7 from '../../../../images/index/render/rendering_7.jpg';
import rendering_8 from '../../../../images/index/render/rendering_8.jpg';

export default class Rendering extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    viewDetail(text) {
        this.context.router.push({pathname: '/onlineDemo',query: {type: text}});
    }

    createItem() {
        var list = [];
        DATA.map((obj, idx) => {
            list.push(
                <div key={obj.text+idx} onClick={this.viewDetail.bind(this, obj.text)} className="index-rendering-item">
                    <img src={obj.img} />
                    <p>{obj.text}</p>
                </div>
            )
        })
        return list;
    }

    render() {
        return (
            <div className="index-rendering clearfix">
                {this.createItem()}
            </div>
        )
    }
}

Rendering.contextTypes = {
    router: routerShape.isRequired,
}

const DATA = [
    {img: rendering_1, text: '客厅'},
    {img: rendering_2, text: '卧室'},
    {img: rendering_3, text: '餐厅'},
    {img: rendering_4, text: '厨房'},
    {img: rendering_5, text: '卫生间'},
    {img: rendering_6, text: '阳台'},
    {img: rendering_7, text: '书房'},
    {img: rendering_8, text: '花园'},
];

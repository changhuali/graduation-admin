import React, { Component } from 'react';
import exhibition_1 from '../../../../images/index/exhibition/exhibition_1.jpg';
import exhibition_2 from '../../../../images/index/exhibition/exhibition_2.jpg';
import exhibition_3 from '../../../../images/index/exhibition/exhibition_3.jpg';
import exhibition_4 from '../../../../images/index/exhibition/exhibition_4.jpg';
import exhibition_5 from '../../../../images/index/exhibition/exhibition_5.jpg';
import exhibition_6 from '../../../../images/index/exhibition/exhibition_6.jpg';

export default class Exhibition extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    createItem() {
        var list = [];
        DATA.map((obj, idx) => {
            list.push(
                <a key={idx} className="index-exhibition-item" href={obj.src}>
                    <img src={obj.img} />
                </a>
            )
        })
        return list;
    }

    render() {
        return (
            <div className="index-exhibition">
                {this.createItem()}
            </div>
        )
    }
}

const DATA = [
    {img: exhibition_1, src: ''},
    {img: exhibition_2, src: ''},
    {img: exhibition_3, src: ''},
    {img: exhibition_4, src: ''},
    {img: exhibition_5, src: ''},
    {img: exhibition_6, src: ''},
];

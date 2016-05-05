import React, { Component } from 'react';
import {routerShape} from 'react-router';

import Loading from '../../common/Loading';
import NotFound from '../../common/NotFound';
import Carousel from '../../common/Carousel';

import news_ad from '../../../../images/index/news/news_ad.jpg';
import news_ad2 from '../../../../images/index/news/news_ad2.jpg';

import section_head_1 from '../../../../images/imformation/carousel/item_1.jpg';
import section_head_2 from '../../../../images/imformation/carousel/item_2.jpg';
import section_head_3 from '../../../../images/imformation/carousel/item_3.jpg';
import section_head_4 from '../../../../images/imformation/carousel/item_4.jpg';

export default class HotNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }

    viewDetail(data) {
        localStorage.setItem('imformation', JSON.stringify(data));
        this.props.imformationBoundAc.addViewNum(data._id);
        this.context.router.push({pathname: '/imformation/'+data._id});
    }

    createCenterItem() {
        var list = [];
        var data = this.state.data.otherHot.slice(0, 4);
        data.map((obj, idx) => {
            list.push(
                <li key={idx} className="index-hotNews-centerItem">
                    <a href="javascript:;" onClick={this.viewDetail.bind(this, obj)}>{obj.title}</a>
                    <p>{obj.desc.substr(0, 50)+'...'}</p>
                </li>
            )
        })
        return list;
    }

    componentDidMount() {
        this.props.imformationBoundAc.getImformationList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.imformation.list.data != undefined) {
            this.setState({
                data: nextProps.imformation.list.data,
            })
        }
    }

    render() {
        var imgArr  = [
            {img: section_head_1, desc: "CAN TV高色域电视上市 重点在画质和音质"},
            {img: section_head_2, desc: "首批家居五金团体标准“顺德造” 推动产业升级"},
            {img: section_head_3, desc: "智能家居难以落地 要降低硬件价格打破平台壁垒"},
            {img: section_head_4, desc: "第二届平板电视技术发展趋势论坛将举行"},
        ];
        return (
            <div className="index-hotNews clearfix">
                <div className="index-hotNews-left">
                    <Carousel style={{marginBottom: '40px'}} btnRight {...this.props} imgSource={imgArr} width="410" height="345" timeCycle="5000" />
                </div>
                {this.state.data.otherHot == undefined
                    ?
                    <Loading />
                    :
                this.state.data.otherHot.length == 0
                    ?
                    <NotFound />
                    :
                    <ul className="index-hotNews-center">
                        {this.createCenterItem()}
                    </ul>
                }
                <div className="index-hotNews-right">
                  <img className="img_full" src={news_ad} />
                </div>
            </div>
        )
    }
}
HotNews.contextTypes = {
    router: routerShape.isRequired,
}

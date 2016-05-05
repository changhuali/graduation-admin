import React, { Component } from 'react';
import {routerShape} from 'react-router';
import Loading from '../../common/Loading';
import NotFound from '../../common/NotFound';

export default class Case extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.familyCase.list.data,
        }
    }

    getCurrData() {
        return this.state.data.slice(0, 4);
    }

    viewDetail(obj) {
        localStorage.setItem('caseDetail', JSON.stringify(obj));
        if(obj) {
            this.context.router.push({pathname: '/familyCase/'+obj._id});
        }
    }

    createItem() {
        var list = [];
        var data = this.getCurrData();
        data.map((obj, idx) => {
            list.push(
                <div key={'case'+idx} onClick={this.viewDetail.bind(this, obj)} className="index-case-item">
                    <img src={obj.img_5} />
                    <p>{obj.title}</p>
                </div>
            )
        })
        return list;
    }

    componentDidMount() {
        this.props.familyCaseBoundAc.getFamilyCaseList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.familyCase.list.data != undefined) {
            this.setState({
                data: nextProps.familyCase.list.data,
            })
        }
    }

    render() {
        return (
            <div className="index-case clearfix">
                {this.state.data == undefined
                    ?
                    <Loading />
                    :
                    this.state.data.length == 0
                    ?
                    <NotFound message="暂时没有相关案列" />
                    :
                    this.createItem()
                }
            </div>
        )
    }
}
Case.contextTypes = {
    router: routerShape.isRequired,
}

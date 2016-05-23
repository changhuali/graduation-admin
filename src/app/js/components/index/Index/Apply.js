import React, { Component } from 'react';
import { Link } from 'react-router';

import SearchBar from  '../../common/SearchBar';
import CommonTable from '../../common/CommonTable';
import Loading from '../../common/Loading';
import NotFound from '../../common/NotFound';

export default class Apply extends Component{
    constructor(props) {
        super(props);
        this.state={
            data: this.props.user.applyList.data,
        }
    }

    componentDidMount() {
        this.props.userBoundAc.getApplyList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.applyList.data) {
            this.setState({
                data: nextProps.user.applyList.data,
            })
        }
    }

    componentWillUnmount() {
        window.scrollTo(0, 0);
    }

    handleApply(id) {
        this.props.userBoundAc.applyAction({id: id, status: '已处理'});
    }

    ignoreApply(id) {
        this.props.userBoundAc.applyAction({id: id, status: '未处理'});
    }

    getSearchList(value) {
        this.props.userBoundAc.getApplyList({keyword: value});
    }

    render(){
        var data = {
            config: [
                {key: 'applyItem', width: '1.6', dictKey: '申请项目'},
                {key: 'applyName', width: '1.6', dictKey: '申请人称呼'},
                {key: 'applyPhone', width: '1.6', dictKey: '申请人手机号码'},
                {key: 'time', width: '1.6', dictKey: '申请时间'},
                {key: 'status', width: '1.6', dictKey: '处理状态'},
                {key: 'operate', width: '1.6', dictKey: '操作', handle: this.operate},
            ],
            item: this.state.data,
        };
        const operateConfig = [
            {action: '改为已处理', handle: this.handleApply, disabledKey: 'status', disabledValue: '已处理'},
            {action: '改为未处理', handle: this.ignoreApply, disabledKey: 'status', disabledValue: '未处理'},
        ];
        return(
            <div className="apply-wrap">
                <div className="apply">
                    <SearchBar placeholder="请输入关键词" search={this.getSearchList.bind(this)} />
                    {this.state.data == undefined ?
                        <Loading />
                    :
                    this.state.data.length == 0 ?
                        <NotFound />
                    :
                        <CommonTable {...this.props} data={data} operate={operateConfig} />
                    }
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import { Link } from 'react-router';

import SearchBar from  '../../common/SearchBar';
import CommonTable from '../../common/CommonTable';
import Loading from '../../common/Loading';
import NotFound from '../../common/NotFound';

export default class Contact extends Component{
    constructor(props) {
        super(props);
        this.state={
            data: this.props.user.contactList.data,
        }
    }

    componentDidMount() {
        this.props.userBoundAc.getContactList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.contactList.data) {
            this.setState({
                data: nextProps.user.contactList.data,
            })
        }
    }

    componentWillUnmount() {
        window.scrollTo(0, 0);
    }

    handleApply(id) {
        this.props.userBoundAc.contactAction({id: id, status: '已处理'});
    }

    ignoreApply(id) {
        this.props.userBoundAc.contactAction({id: id, status: '未处理'});
    }

    getSearchList(value) {
        this.props.userBoundAc.getContactList({keyword: value});
    }

    render(){
        var data = {
            config: [
                {key: 'name', width: '1.6', dictKey: '联系人称呼'},
                {key: 'phone', width: '1.6', dictKey: '联系人电话'},
                {key: 'advice', width: '1.6', dictKey: '联系人提交信息'},
                {key: 'time', width: '1.6', dictKey: '联系时间'},
                {key: 'status', width: '1.6', dictKey: '处理状态'},
                {key: 'operate', width: '1.6', dictKey: '操作', handle: this.operate},
            ],
            item: this.state.data,
        };
        const operateConfig = [
            {action: '改为已处理', handle: this.handleApply, disabledKey: 'applyStatus', disabledValue: '已处理'},
            {action: '改为未处理', handle: this.ignoreApply, disabledKey: 'applyStatus', disabledValue: '未处理'},
        ];
        return(
            <div className="apply-wrap">
                <div className="apply">
                    <SearchBar placeholder="请输入" search={this.getSearchList.bind(this)} />
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

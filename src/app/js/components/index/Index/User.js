import React, { Component } from 'react';
import { Link } from 'react-router';

import SearchBar from  '../../common/SearchBar';
import CommonTable from '../../common/CommonTable';
import Loading from '../../common/Loading';
import NotFound from '../../common/NotFound';

export default class UserList extends Component{
    constructor(props) {
        super(props);
        this.state={
            data: this.props.user.userList.data,
        }
    }

    componentDidMount() {
        this.props.userBoundAc.getUserList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.userList.data) {
            this.setState({
                data: nextProps.user.userList.data,
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
        this.props.userBoundAc.getUserList({keyword: value});
    }

    render(){
        var data = {
            config: [
                {key: '_id', width: '2', dictKey: '用户Id'},
                {key: 'userName', width: '2', dictKey: '用户名'},
                {key: 'phone', width: '2', dictKey: '用户手机号码'},
            ],
            item: this.state.data,
        };
        return(
            <div className="apply-wrap">
                <div className="apply">
                    <SearchBar placeholder="请输入手机号码或用户名" search={this.getSearchList.bind(this)} />
                    {this.state.data == undefined ?
                        <Loading />
                    :
                    this.state.data.length == 0 ?
                        <NotFound />
                    :
                        <CommonTable {...this.props} data={data} />
                    }
                </div>
            </div>
        )
    }
}

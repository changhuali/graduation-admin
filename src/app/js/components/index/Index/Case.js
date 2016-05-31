import React, { Component } from 'react';
import { Link, routerShape } from 'react-router';

import SearchBar from  '../../common/SearchBar';
import CommonTable from '../../common/CommonTable';
import Loading from '../../common/Loading';
import NotFound from '../../common/NotFound';

import { Button } from "antd";

export default class Case extends Component{
    constructor(props) {
        super(props);
        this.state={
            data: this.props.user.caseList.data,
        }
    }

    getSearchList(value) {
        this.props.userBoundAc.getCaseList({keyword: value});
    }

    addCaseItem() {
        this.context.router.push({pathname: '/operateCase', query: {type: 'add'}});
    }

    view(id) {
        this.context.router.push({pathname: '/operateCase', query: {type: 'view', id: id}});
    }

    edit(id) {
        this.context.router.push({pathname: '/operateCase', query: {type: 'edit', id: id}});
    }

    delete(id) {
        this.props.userBoundAc.delCase({id: id});
    }

    componentDidMount() {
        this.props.userBoundAc.getCaseList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.caseList.data) {
            this.setState({
                data: nextProps.user.caseList.data,
            })
        }
    }

    componentWillUnmount() {
        window.scrollTo(0, 0);
    }


    render(){
        var data = {
            config: [
                {key: 'title', width: '2', dictKey: '案例标题'},
                {key: 'description', width: '4', dictKey: '案例描述'},
                {key: 'time', width: '2', dictKey: '添加时间'},
                {key: 'operate', width: '2', dictKey: '操作', handle: this.operate},
            ],
            item: this.state.data,
        };
        const operateConfig = [
            {action: '查看', handle: this.view},
            {action: '编辑', handle: this.edit},
            {action: '删除', handle: this.delete},
        ];
        return(
            <div className="apply-wrap">
                <div className="apply">
                    <SearchBar placeholder="请输入" search={this.getSearchList.bind(this)} />
                    <Button onClick={this.addCaseItem.bind(this)} style={{position: 'absolute', top: '45px', right: '0'}}>添加案例</Button>
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

Case.contextTypes = {
    router: routerShape.isRequired,
}

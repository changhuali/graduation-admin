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

    handleEdit(id) {
        console.log(111);
    }

    handleDelete(id) {
        this.props.userBoundAc.delCaseItem({id: id});
    }

    getSearchList(value) {
        this.props.userBoundAc.getCaseList({keyword: value});
    }

    addCaseItem() {
        this.context.router.push({pathname: '/case/addCaseItem'});
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
                {key: 'description', width: '7', dictKey: '案例描述'},
                {key: 'time', width: '7', dictKey: '添加时间'},
                {key: 'operate', width: '1', dictKey: '操作', handle: this.operate},
            ],
            item: this.state.data,
        };
        const operateConfig = [
            {action: '修改', handle: this.handleEdit, disabledKey: 'none', disabledValue: 'none'},
            {action: '删除', handle: this.handleDelete, disabledKey: 'none', disabledValue: 'none'},
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

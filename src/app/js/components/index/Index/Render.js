import React, { Component } from 'react';
import { Link } from 'react-router';

import SearchBar from  '../../common/SearchBar';
import CommonTable from '../../common/CommonTable';
import Loading from '../../common/Loading';
import NotFound from '../../common/NotFound';

export default class Render extends Component{
    constructor(props) {
        super(props);
        this.state={
            data: this.props.user.onlineDemoList.data,
        }
    }

    getSearchList(value) {
        this.props.userBoundAc.getOnlineDemoList({keyword: value});
    }

    view(id) {
        console.log(id);
    }

    edit(id) {
        console.log(id);
    }

    delete(id) {
        console.log(id);
    }

    componentDidMount() {
        this.props.userBoundAc.getOnlineDemoList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.onlineDemoList.data) {
            this.setState({
                data: nextProps.user.onlineDemoList.data,
            })
        }
    }

    componentWillUnmount() {
        window.scrollTo(0, 0);
    }

    render(){
        var data = {
            config: [
                {key: 'title', width: '2', dictKey: '标题'},
                {key: 'space', width: '2', dictKey: '空间'},
                {key: 'part', width: '2', dictKey: '局部'},
                {key: 'style', width: '2', dictKey: '风格'},
                {key: 'operate', width: '2', dictKey: '操作'},
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

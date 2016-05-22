import React, { Component } from 'react';
import { Link } from 'react-router';

import SearchBar from  '../../common/SearchBar';
import CommonTable from '../../common/CommonTable';
import Loading from '../../common/Loading';
import NotFound from '../../common/NotFound';

export default class News extends Component{
    constructor(props) {
        super(props);
        this.state={
            data: this.props.user.newsList.data,
        }
    }

    getSearchList(value) {
        this.props.userBoundAc.getNewsList({keyword: value});
    }

    handleApply(id) {
        this.props.userBoundAc.applyAction({id: id, status: '已处理'});
    }

    ignoreApply(id) {
        this.props.userBoundAc.applyAction({id: id, status: '未处理'});
    }

    componentDidMount() {
        this.props.userBoundAc.getNewsList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.newsList.data) {
            this.setState({
                data: nextProps.user.newsList.data,
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
                {key: 'type', width: '2', dictKey: '类别'},
                {key: 'time', width: '2', dictKey: '时间'},
                {key: 'viewNum', width: '2', dictKey: '查看次数'},
                {key: 'operate', width: '2', dictKey: '操作', handle: this.operate},
            ],
            item: this.state.data,
        };
        const operateConfig = [
            {action: '查看', handle: this.handleApply, disabledKey: 'applyStatus', disabledValue: '已处理'},
            {action: '编辑', handle: this.handleApply, disabledKey: 'applyStatus', disabledValue: '已处理'},
            {action: '删除', handle: this.ignoreApply, disabledKey: 'applyStatus', disabledValue: '未处理'},
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

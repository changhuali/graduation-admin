import React, { Component } from 'react';
import { routerShape } from 'react-router';
import SearchBar from  '../../common/SearchBar';
import CommonTable from '../../common/CommonTable';
import Loading from '../../common/Loading';
import NotFound from '../../common/NotFound';

import {Button} from 'antd';

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

    view(id) {
        this.context.router.push({pathname: '/operateNews', query: {type: 'view', id: id}});
    }

    addNews() {
        this.context.router.push({pathname: '/operateNews', query: {type: 'add'}});
    }

    edit(id) {
        this.context.router.push({pathname: '/operateNews', query: {type: 'edit', id: id}});
    }

    delete(id) {
        console.log(id);
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
                <Button onClick={this.addNews.bind(this)} style={{position: 'absolute', top: '45px', right: '0'}}>添加资讯</Button>
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
News.contextTypes = {
    router: routerShape.isRequired,
}

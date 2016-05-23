import React, {Component} from 'react';
import Loading from '../../../common/Loading';
import {Form, Input, Button, Select} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
export default class OperateNews extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: this.props.user.newsDetail.data,
            addData: {
                title: '',
                type: '公司新闻',
                time: '',
                desc: '',
                viewNum: '0',
                content: '',
                img: '',
            },
            img: '',
        }
    }

    selectChange(key, value) {
        var params = {[key]: value};
        this.setState({
            data: Object.assign({}, this.state.data, params),
        })
    }

    submit() {
        this.props.userBoundAc.updateNews(this.state.data);
    }

    onChange(key, evt) {
        var params = {[key]: evt.target.value};
        this.setState({
            data: Object.assign({}, this.state.data, params),
        })
    }

    addChange(key, evt) {
        var params = {[key]: evt.target.value};
        this.setState({
            data: Object.assign({}, this.state.addData, params),
        });
    }

    addImg(evt) {
        this.setState({
            img: evt.target.value,
        })
    }

    addSelect(key, value) {
        var params = {[key]: value};
        this.setState({
            data: Object.assign({}, this.state.addData, params),
        })
    }


    componentDidMount() {
        var id = this.props.location.query.id;
        this.props.userBoundAc.getNewsDetail({id: id});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.newsDetail.data) {
            this.setState({
                data: nextProps.user.newsDetail.data,
            })
        }
    }
    render() {
        var data = this.state.data;
        var addData = this.state.addData;
        return (
            <div className="apply-wrap">
                {data && this.props.location.query.type == 'view' ?
                <div className="imformation-detail">
                    <h2>{data.title}</h2>
                    <div>
                        <span>{'发布时间: '+data.time}</span>
                        <span>{'新闻分类: '+data.type}</span><span>{'浏览数：'+(data.viewNum+1)}</span>
                    </div>
                    <div id="imformationDetail">{data.content}</div>
                </div>
                : data && this.props.location.query.type == 'edit' ?
                <div className="apply">
                    <FormItem
                        label="标题">
                        <Input onChange={this.onChange.bind(this, 'title')} value={data.title} />
                    </FormItem>
                    <FormItem
                        label="类别">
                        <Select onChange={this.addSelect.bind(this, 'type')} style={{width: '150px'}} value={data.type}>
                            <Option value='公司新闻'>公司新闻</Option>
                            <Option value='行业新闻'>行业新闻</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="描述">
                        <Input onChange={this.onChange.bind(this, 'desc')} value={data.desc} />
                    </FormItem>
                    <FormItem
                        label="内容">
                        <Input type="textarea" onChange={this.onChange.bind(this, 'content')} value={data.content} />
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.submit.bind(this)}>提交</Button>
                    </FormItem>
                </div>
                :this.props.location.query.type == 'add' ?
                <div className="apply">
                    <FormItem
                        label="标题">
                        <Input onChange={this.addChange.bind(this, 'title')} value={addData.title} />
                    </FormItem>
                    <FormItem
                        label="类别">
                        <Select onChange={this.selectChange.bind(this, 'type')} style={{width: '150px'}} value={addData.type}>
                            <Option value='公司新闻'>公司新闻</Option>
                            <Option value='行业新闻'>行业新闻</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="图片">
                        <Input type="file" onChange={this.addImg.bind(this, 'content')} value={this.state.img} />
                    </FormItem>
                    <FormItem
                        label="描述">
                        <Input onChange={this.onChange.bind(this, 'desc')} value={addData.desc} />
                    </FormItem>
                    <FormItem
                        label="内容">
                        <Input type="textarea" onChange={this.addChange.bind(this, 'content')} value={addData.content} />
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.submit.bind(this)}>提交</Button>
                    </FormItem>
                </div>
                :
                <div className="apply">
                    <Loading />
                </div>
                }
            </div>
        )
    }
}

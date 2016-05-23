import React, {Component} from 'react';
import {Button, Input, Form, Select, Icon} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import __assign from 'lodash/assign';
import Loading from '../../../common/Loading';
export default class OperateRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.user.renderDetail.data,
            addData: {
                title: '',
                space: '客厅',
                part: '背景墙',
                style: '简约',
                img: '',
            },
        };
    }
    inputChange(obj, key, evt) {
        var params = {[key]: evt.target.value};
        this.setState({
            [obj]: __assign(this.state[obj], params),
        });
    }
    selectChange(obj, key, value) {
        var params = {[key]: value};
        this.setState({
            [obj]: __assign(this.state[obj], params),
        });
    }
    upload(evt) {
        if (this.state.addData.img != '') {
            this.props.userBoundAc.delImg({img: this.state.addData.img});
        }
        var data = new FormData();
        data.append('img', evt.target.files[0]);
        this.props.userBoundAc.postImgFile(data);
    }
    editUpload(evt) {
        if (this.state.data.img != '') {
            this.props.userBoundAc.delImg({img: this.state.data.img});
        }
        var data = new FormData();
        data.append('img', evt.target.files[0]);
        this.props.userBoundAc.postImgFile(data);
    }
    createOption(data) {
        var list = [];
        data.map((key, idx) => {
            list.push(<Option key={idx} value={key}>{key}</Option>);
        })
        return list;
    }
    addConfirm() {
        this.props.userBoundAc.addRender(this.state.addData);
    }
    editConfirm() {
        this.props.userBoundAc.editRender(this.state.data);
    }
    componentDidMount() {
        var id = this.props.location.query.id;
        var type = this.props.location.query.type;
        if (type != 'add') {
            this.props.userBoundAc.getRenderDetail({id: id});
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.user.renderDetail.data != undefined) {
            this.setState({
                data: nextProps.user.renderDetail.data,
            })
        }
        if(nextProps.user.uploadFile.data != undefined) {
            console.log(nextProps.user.uploadFile.data);
            this.setState({
                addData: __assign({}, this.state.addData, nextProps.user.uploadFile.data),
                data: __assign({}, this.state.addData, nextProps.user.uploadFile.data),
            })
        }
        if(nextProps.user.addRender.data != undefined) {
            this.setState({
                addData: {
                    title: '',
                    space: '客厅',
                    part: '背景墙',
                    style: '简约',
                    img: '',
                }
            })
        }
    }
    render() {
        var data = this.state.data;
        var addData = this.state.addData;
        var type = this.props.location.query.type;
        return (
            <div className="apply-wrap">
            {type == 'add' ?
                <div className="apply">
                    <FormItem
                        label="标题">
                        <Input size="small" type="text" style={{width: 200, height: '28'}} onChange={this.inputChange.bind(this, 'addData', 'title')} value={addData.title} />
                    </FormItem>
                    <FormItem
                        label="空间">
                        <Select onChange={this.selectChange.bind(this, 'addData', 'space')} value={addData.space} style={{width: 150}}>
                            {this.createOption(SPACE)}
                        </Select>
                    </FormItem>
                    <FormItem
                        label="局部">
                        <Select onChange={this.selectChange.bind(this, 'addData', 'part')} value={addData.part} style={{width: 150}}>
                            {this.createOption(PART)}
                        </Select>
                    </FormItem>
                    <FormItem
                        label="风格">
                        <Select onChange={this.selectChange.bind(this, 'addData', 'style')} value={addData.style} style={{width: 150}}>
                            {this.createOption(STYLE)}
                        </Select>
                    </FormItem>
                    <FormItem
                        className="clearfix"
                        label="效果图">
                        <a href="javascript:;" className="upload-a">
                            <input onChange={this.upload.bind(this)} className="upload-input" type="file" />
                            <span>{addData.img == "" ? "上传图片" : "修改图片"}</span>
                            <img style={{width: '100px', height: '100px'}} src={addData.img} />
                        </a>
                    </FormItem>
                    <div>
                        <Button onClick={this.addConfirm.bind(this)}>提交</Button>
                    </div>
                </div>
            : data && type == 'view' ?
                <div className="apply">
                    <div className="render-wrap">
                        <h2 className="render-title">{data.title}</h2>
                        <img src={data.img} />
                    </div>
                </div>
            : data && type == 'edit' ?
                <div className="apply">
                    <FormItem
                        label="标题">
                        <Input size="small" type="text" style={{width: 200, height: '28'}} onChange={this.inputChange.bind(this, 'data', 'title')} value={data.title} />
                    </FormItem>
                    <FormItem
                        label="空间">
                        <Select onChange={this.selectChange.bind(this, 'data', 'space')} value={data.space} style={{width: 150}}>
                            {this.createOption(SPACE)}
                        </Select>
                    </FormItem>
                    <FormItem
                        label="局部">
                        <Select onChange={this.selectChange.bind(this, 'data', 'part')} value={data.part} style={{width: 150}}>
                            {this.createOption(PART)}
                        </Select>
                    </FormItem>
                    <FormItem
                        label="风格">
                        <Select onChange={this.selectChange.bind(this, 'data', 'style')} value={data.style} style={{width: 150}}>
                            {this.createOption(STYLE)}
                        </Select>
                    </FormItem>
                    <FormItem
                        className="clearfix"
                        label="效果图">
                        <a href="javascript:;" className="upload-a">
                            <input onChange={this.editUpload.bind(this)} className="upload-input" type="file" />
                            <span>{data.img == "" ? "上传图片" : "修改图片"}</span>
                            <img style={{width: '100px', height: '100px'}} src={data.img} />
                        </a>
                    </FormItem>
                    <div>
                        <Button onClick={this.editConfirm.bind(this)}>提交</Button>
                    </div>
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
var SPACE = ['客厅', '卧室', '餐厅', '厨房', '卫生间', '阳台', '书房', '玄关', '儿童房', '衣帽间', '花园'];
var PART  = ['背景墙', '吊顶', '隔断', '窗帘', '飘窗', '榻榻米', '橱柜', '博古架', '阁楼', '隐形门', '吧台', '酒柜', '鞋柜', '衣柜', '窗户', '相片墙', '楼梯', '其它'];
var STYLE = ['简约', '现代', '中式', '欧式', '美式', '田园', '新古典', '混搭', '地中海', '东南亚', '日式', '宜家', '北欧', '简欧'];

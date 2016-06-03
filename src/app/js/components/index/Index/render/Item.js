import React, {Component} from 'react';
import Upload from '../../../common/Upload';
import Loading from '../../../common/Loading';
import NotFound from '../../../common/NotFound';
import { Form, Input, Select, Checkbox, Radio, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getInitState(),
        }
    }
    getInitState() {
        var state = {
            title: '',
            space: '客厅',
            part: '背景墙',
            style: '简约',
            img: '',
        }
        return this.props.type == 'edit' ? this.props.user.renderDetail.data : state;
    }
    inputChange(key, evt) {
        this.setState({
            data: Object.assign({}, this.state.data, {[key]: evt.target.value}),
        });
    }
    selectChange(key, value) {
        var params = {[key]: value};
        this.setState({
            data: Object.assign({}, this.state.data, params),
        })
    }
    createOption(data) {
        var list = [];
        data.map((key, idx) => {
            list.push(
                <Option key={idx} value={key}>{key}</Option>
            )
        })
        return list;
    }
    getFileData(fileData) {
        this.setState({
            data: Object.assign({}, this.state.data, {img: fileData}),
        })
    }
    componentDidMount() {
        if(this.props.type != 'add') {
            const query = this.props.location.query;
            this.props.userBoundAc.getRenderDetail({id: query.id});
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.user.renderDetail.data != undefined && this.props.type != 'add') {
            this.setState({
                data: nextProps.user.renderDetail.data,
            })
        }
    }
    editRender() {
        var data = this.state.data;
        var params = {
            title: data.title,
            space: data.space,
            part: data.part,
            style: data.style,
        };
        var formData = new FormData();
        formData.append('img', this.state.data.img);
        switch (this.props.type) {
            case 'add':
                this.props.userBoundAc.addRender(params, formData);
                break;
            case 'edit':
                this.props.userBoundAc.editRender(data._id, params, formData);
                break;
        }
    }
    render() {
        const config = {
            labelCol:{ span: 6 },
            wrapperCol:{ span: 14 }
        };
        const data = this.state.data;
        var output;
        if (data == undefined) {
            output = <Loading />;
        } else if (data == null) {
            output = <NotFound />;
        } else if(this.props.type != 'view') {
            output = (
                <Form horizontal>
                    <FormItem
                        label="标题："
                        {...config} >
                        <Input onChange={this.inputChange.bind(this, 'title')} value={data.title} size="small" />
                    </FormItem>

                    <FormItem
                        label="空间："
                        {...config} >
                        <Select onChange={this.selectChange.bind(this, 'space')} value={data.space}>
                            {this.createOption(SPACE)}
                        </Select>
                    </FormItem>

                    <FormItem
                        label="局部："
                        {...config} >
                        <Select onChange={this.selectChange.bind(this, 'part')} value={data.part}>
                            {this.createOption(PART)}
                        </Select>
                    </FormItem>

                    <FormItem
                        label="风格："
                        {...config} >
                        <Select onChange={this.selectChange.bind(this, 'style')} value={data.style}>
                            {this.createOption(STYLE)}
                        </Select>
                    </FormItem>

                    <FormItem
                        label="风格："
                        {...config} >
                        <Upload {...this.props} img={data.img} getFileData={this.getFileData.bind(this)} />
                    </FormItem>

                    <Button onClick={this.editRender.bind(this)}>{this.props.type == 'edit' ? '修改' : '添加'}</Button>
                </Form>
            );
        } else if(this.props.type == 'view') {
            output = (
                <div>
                    <p style={{fontSize: '16px', fontWeight: 'bold'}}>{data.title}</p>
                    <p>{data.space}</p>
                    <p>{data.part}</p>
                    <p>{data.style}</p>
                    <div>
                        <img style={{maxWidth: '600px'}} src={data.img} />
                    </div>
                </div>
            )
        }
        return output;
    }
}
var SPACE = ['客厅', '卧室', '餐厅', '厨房', '卫生间', '阳台', '书房', '玄关', '儿童房', '衣帽间', '花园'];
var PART  = ['背景墙', '吊顶', '隔断', '窗帘', '飘窗', '榻榻米', '橱柜', '博古架', '阁楼', '隐形门', '吧台', '酒柜', '鞋柜', '衣柜', '窗户', '相片墙', '楼梯', '其它'];
var STYLE = ['简约', '现代', '中式', '欧式', '美式', '田园', '新古典', '混搭', '地中海', '东南亚', '日式', '宜家', '北欧', '简欧'];

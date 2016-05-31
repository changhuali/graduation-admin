import React, {Component} from 'react';
import Upload from '../../../common/Upload';
import Loading from '../../../common/Loading';
import NotFound from '../../../common/NotFound';
import { Form, Input, Select, Checkbox, Radio, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.user.caseDetail.data,
        }
    }
    addDetail() {
        var arr = this.state.data.data;
        arr.push({title: '', img: ''});
        this.setState({
            data: Object.assign({}, this.state.data, {data: arr}),
        })
    }
    inputChange(key, evt) {
        this.setState({
            data: Object.assign({}, this.state.data, {[key]: evt.target.value}),
        });
    }
    detailInputChange(idx, evt) {
        var arr = this.state.data.data;
        var obj = {title: evt.target.value};
        arr[idx] = Object.assign({}, arr[idx], obj);
        this.setState({
            data: Object.assign({}, this.state.data, {data: arr}),
        })
    }
    getFileData(fileData, idx) {
        this.setState({
            data: Object.assign({}, this.state.data, {['img' + idx]: fileData}),
        })
    }
    createImgItem(num) {
        var list = [];
        for(var i=1; i<=num; i++) {
            list.push(
                <FormItem
                    key={i}
                    label={"图"+i+"："}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}>
                    <Upload {...this.props} img={this.state.data['img'+i]} idx={i} getFileData={this.getFileData.bind(this)} />
                </FormItem>
            )
        }
        return list;
    }
    getDetailFileData(fileData, idx) {
        var arr = this.state.data.data;
        var obj = {img: fileData};
        arr[idx] = Object.assign({}, arr[idx], obj);
        this.setState({
            data: Object.assign({}, this.state.data, {data: arr}),
        })
    }
    createDetailItem() {
        const detail = this.state.data.data;
        var list = [];
        for(var i=0; i<detail.length; i++) {
            list.push(
                <div key={i}>
                    <FormItem
                        label="描述："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}>
                        <Input onChange={this.detailInputChange.bind(this, i)} value={detail[i]['title']} />
                    </FormItem>
                    <FormItem
                        label="图片："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}>
                        <Upload {...this.props} idx={i} img={detail[i].img} getFileData={this.getDetailFileData.bind(this)} />
                    </FormItem>
                </div>
            )
        }
        return list;
    }
    changeCase() {
        this.props.userBoundAc.changeCase(this.state.data);
    }
    componentDidMount() {
        const query = this.props.location.query;
        this.props.userBoundAc.getCaseDetail({id: query.id});
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.user.caseDetail.data != undefined) {
            this.setState({
                data: nextProps.user.caseDetail.data,
            })
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
        } else {
            output = (
                <Form horizontal>
                    列表页面数据
                    <FormItem
                        label="案例标题："
                        {...config} >
                        <Input onChange={this.inputChange.bind(this, 'title')} value={data.title} />
                    </FormItem>

                    <FormItem
                        label="案例描述："
                        {...config} >
                        <Input type="textarea" rows="3" onChange={this.inputChange.bind(this, 'description')} value={data.description} />
                    </FormItem>
                    {this.createImgItem(5)}
                    详情页面数据
                    {this.createDetailItem()}
                    <Button onClick={this.addDetail.bind(this)}>增加详情</Button>
                    <Button onClick={this.changeCase.bind(this)}>修改案例</Button>
                </Form>
            );
        }
        return output;
    }
}

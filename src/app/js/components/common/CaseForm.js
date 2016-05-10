import React, {Component} from 'react';
import { Form, Input, Select, Checkbox, Radio, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class RenderForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    textChange(e) {
        var data = new FormData();
        var node = document.getElementById(e.target.id);
        data.append('photo', node.files[0]);
        console.log(node.files[0],data);
    }

    render() {
        return (
            <Form horizontal>
                列表页面数据
                <FormItem
                    id="control-textarea"
                    label="案例标题："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Input  />
                </FormItem>

                <FormItem
                    id="control-textarea"
                    label="案例描述："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Input type="textarea" rows="3" />
                </FormItem>

                <FormItem
                    id="control-textarea"
                    label="图1："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Upload {...this.props} />
                </FormItem>

                <FormItem
                    id="control-textarea"
                    label="图2："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Upload {...this.props} />
                </FormItem>

                <FormItem
                    id="control-textarea"
                    label="图3："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Upload {...this.props} />
                </FormItem>

                <FormItem
                    id="control-textarea"
                    label="图4："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Upload {...this.props} />
                </FormItem>

                <FormItem
                    id="control-textarea"
                    label="图5："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Upload {...this.props} />
                </FormItem>
                详情页面数据
                <FormItem

                    label="描述："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Input placeholder="Please enter..." />
                </FormItem>
                <FormItem
                    id="control-textarea"
                    label="图片："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Upload {...this.props} />
                </FormItem>
                <FormItem

                    label="描述："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Input placeholder="Please enter..." />
                </FormItem>
                <FormItem
                    id="control-textarea"
                    label="图片："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Upload {...this.props} />
                </FormItem>
                <FormItem

                    label="描述："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Input placeholder="Please enter..." />
                </FormItem>
                <FormItem
                    id="control-textarea"
                    label="图片："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Upload {...this.props} />
                </FormItem>
                <FormItem

                    label="描述："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Input placeholder="Please enter..." />
                </FormItem>
                <FormItem
                    id="control-textarea"
                    label="图片："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Upload {...this.props} />
                </FormItem>
                <FormItem

                    label="描述："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Input placeholder="Please enter..." />
                </FormItem>
                <FormItem
                    id="control-textarea"
                    label="图片："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Upload {...this.props} />
                </FormItem>
                <Button>添加</Button>
                <Button>重置</Button>
              </Form>
        )
    }
}
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state={
            filename: "",
        }
    }

    textChange(e) {
        var fileObj = e.target.files[0];
        console.log(fileObj);
        var form = new FormData();
        form.append("file", fileObj);
        this.setState({
            filename: e.target.files[0]['name'],
        });
        this.props.userBoundAc.postImgFile(form);
    }

    render() {
        return (
            <div className="clearfix">
                <a href="javascript:;" className="upload-a">
                    <input id={this.props.id} className="upload-input" type="file" onChange={this.textChange.bind(this)} />
                    <span>{this.state.filename == "" ? "上传图片" : this.state.filename}</span>
                </a>
            </div>
        )
    }
}

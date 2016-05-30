import React, {Component} from 'react';
import { Form, Input, Select, Checkbox, Radio, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class OperateCase extends Component{
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            title: '',
            desc: '',
            img1: '',
            img2: '',
            img3: '',
            img4: '',
            img5: '',
            detail: [{title: '', img: ''}],
        }
    }

    inputChange(key, evt) {
        this.setState({
            [key]: evt.target.value,
        });
    }

    detailInputChange(idx, evt) {
        var arr = this.state.detail;
        var obj = {title: evt.target.value};
        arr[idx] = Object.assign({}, arr[idx], obj);
        this.setState({
            detail: arr,
        })
    }

    getFileData(fileData, idx) {
        this.setState({
            ['img'+idx]: fileData,
        })
        console.log('img'+idx, fileData);
    }

    getDetailFileData(fileData, idx) {
        var arr = this.state.detail;
        var obj = {img: fileData};
        arr[idx] = Object.assign({}, arr[idx], obj);
        this.setState({
            detail: arr,
        })
        console.log(arr);
    }

    addDetail() {
        var arr = this.state.detail;
        arr.push({title: '', img: ''});
        this.setState({
            num: this.state.num+1,
            detail: arr,
        })
    }

    getListImg() {
        var file = {};
        for(var a=1; a<=5; a++) {
            file['img'+a] = this.state['img'+a];
        }
        return file;
    }

    getDetailImg() {
        var file = {};
        this.state.detail.map((obj, idx) => {
            file['img'+(idx+1)] = obj.img;
        });
        return file;
    }

    uploadListImg(data) {
        var formData = new FormData();
        Object.keys(data).map((key, idx) => {
            formData.append(key, data[key]);
        });
        return formData;
    }

    addCase() {
        var listImg = this.uploadListImg(this.getListImg());
        var detailImg = this.uploadListImg(this.getDetailImg());
        var params = {
            title: this.state.title,
            description: this.state.desc,
        };
        this.props.userBoundAc.addCase(params, listImg, detailImg);
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
                    <Upload {...this.props} idx={i} getFileData={this.getFileData.bind(this)} />
                </FormItem>
            )
        }
        return list;
    }

    createDetailItem() {
        const detail = this.state.detail;
        var list = [];
        for(var i=0; i<this.state.num; i++) {
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
                        <Upload {...this.props} idx={i} getFileData={this.getDetailFileData.bind(this)} />
                    </FormItem>
                </div>
            )
        }
        return list;
    }

    render() {
        const config = {
            labelCol:{ span: 6 },
            wrapperCol:{ span: 14 }
        };
        const data = this.state.addData;
        const base = this.state;
        return (
            <div className="apply">
                <Form horizontal>
                    列表页面数据
                    <FormItem
                        label="案例标题："
                        {...config} >
                        <Input onChange={this.inputChange.bind(this, 'title')} value={base.title} />
                    </FormItem>

                    <FormItem
                        label="案例描述："
                        {...config} >
                        <Input type="textarea" rows="3" onChange={this.inputChange.bind(this, 'desc')} value={base.desc} />
                    </FormItem>
                    {this.createImgItem(5)}
                    详情页面数据
                    {this.createDetailItem()}
                    <Button onClick={this.addDetail.bind(this)}>增加详情</Button>
                    <Button onClick={this.addCase.bind(this)}>添加</Button>
                    <Button>重置</Button>
                </Form>
            </div>
        )
    }
}
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state={
            filename: "",
            imgUrl: "",
        }
    }

    textChange(e) {
        var fileObj = e.target.files[0];
        this.setState({
            filename: e.target.files[0]['name'],
        });
        var reader = new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload = (e) => {
            this.setState({
                imgUrl: reader.result,
            })
        }
        this.props.getFileData(fileObj, this.props.idx);
    }

    render() {
        return (
            <div className="clearfix">
                <a href="javascript:;" className="upload-a">
                    <input id={this.props.id}
                        className="upload-input"
                        type="file"
                        onChange={this.textChange.bind(this)} />
                    <span>
                    {this.state.filename == ""
                        ?
                        "上传图片"
                        : this.state.filename
                    }
                    </span>
                </a>
                {this.state.imgUrl != "" ?
                    <img style={{width: '72px', height: '100%'}} src={this.state.imgUrl} />
                    :""
                }
            </div>
        )
    }
}

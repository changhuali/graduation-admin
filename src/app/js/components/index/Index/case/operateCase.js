import React, {Component} from 'react';
import Upload from '../../../common/Upload';
import Edit from './Edit';
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
            editData: '',
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
        console.log(file, 'listFile');
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
        var detail = this.state.data.data;
        detail.map(obj => {
            delete obj.img;
        })
        var date = new Date();
        var params = {
            title: this.state.title,
            description: this.state.desc,
            time: date.toLocaleString(),
            data: detail,
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
        const detail = this.state.data.data;
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
        const query = this.props.location.query;
        return (
            <div className="apply">
                {query.type == 'add' ?
                    <Edit {...this.props} type="add" />
                : query.type == 'edit' ?
                    <Edit {...this.props} type="edit" />
                :""}
            </div>
        )
    }
}

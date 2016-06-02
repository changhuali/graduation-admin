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
            data: this.getInitState(),
        }
    }
    getInitState() {
        var state = {
            title: '',
            description: '',
            img1: '',
            img2: '',
            img3: '',
            img4: '',
            img5: '',
            data: [{title: '', img: ''}],
        }
        return this.props.type == 'edit' ? this.props.user.caseDetail.data : state;
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
    createViewDetail() {
        var list = [];
        this.state.data.data.map((obj, idx) => {
            list.push(
                <div className="familyCase-detailItem" key={idx}>
                    <p>{obj.title}</p>
                    <img src={obj.img} />
                </div>
            )
        })
        return list;
    }
    getListImg() {
        var file = {};
        for(var a=1; a<=5; a++) {
            file['img'+a] = this.state.data['img'+a];
        }
        return file;
    }

    getDetailImg() {
        console.log(this.state.data);
        var file = {};
        this.state.data.data.map((obj, idx) => {
            file['img'+(idx+1)] = obj.img;
        });
        return file;
    }
    formatFormData(data) {
        var formData = new FormData();
        Object.keys(data).map((key, idx) => {
            formData.append(key, data[key]);
        });
        return formData;
    }
    changeCase() {
        var date = new Date();
        var detail = [];
        this.state.data.data.map(obj => {
            detail.push({title: obj.title});
        })
        var params = {
            title: this.state.data.title,
            description: this.state.data.description,
            time: date.toLocaleString(),
            data: detail,
        };
        var listFile = this.formatFormData(this.getListImg());
        var detailFile = this.formatFormData(this.getDetailImg());
        switch (this.props.type) {
            case 'edit':
                this.props.userBoundAc.changeCase(this.state.data._id, params, listFile, detailFile);
                break;
            case 'add':
                this.props.userBoundAc.addCase(params, listFile, detailFile);
                break;
        }
    }
    componentDidMount() {
        if(this.props.type != 'add') {
            const query = this.props.location.query;
            this.props.userBoundAc.getCaseDetail({id: query.id});
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.user.caseDetail.data != undefined && this.props.type != 'add') {
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
        } else if(this.props.type != 'view') {
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
                    <Button onClick={this.changeCase.bind(this)}>{this.props.type == 'edit' ? '修改案例' : '添加案例'}</Button>
                </Form>
            );
        } else if(this.props.type == 'view') {
            output = (
                <div>
                    <div>列表信息</div>
                    <div className="familyCase-item">
                    <div className="familyCase-info">
                        <h2 className="familyCase-tit">{data.title}</h2>
                        <p className="familyCase-text">{data.description.substr(0, 20)}</p>
                    </div>
                    <div className="familyCase-img1">
                        <img src={data.img1} />
                    </div>
                    <div className="familyCase-img2">
                        <img src={data.img2} />
                    </div>
                    <div className="familyCase-img3">
                        <img src={data.img3} />
                    </div>
                    <div className="familyCase-img4">
                        <img src={data.img4} />
                    </div>
                    <div className="familyCase-img5">
                        <img src={data.img5} />
                    </div>
                    </div>
                    <div>详细信息</div>
                    {this.createViewDetail()}
                </div>
            )
        }
        return output;
    }
}

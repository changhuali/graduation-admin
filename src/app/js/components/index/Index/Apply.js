import React, { Component } from 'react';
import { __FORMCHECK__ } from '../../../../../config/class';
import {message} from 'antd';

export default class Apply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applyItem: "免费设计",
            applyMsg: "10秒登记，免费获取专业设计方案",
            applyName: "",
            applyPhone: "",
        }
    }

    apply(e) {
        e.preventDefault();
        if(this.state.applyName != "" && this.state.applyPhone != "") {
            if(__FORMCHECK__.isPhoneNum(this.state.applyPhone)) {
                this.props.contactBoundAc.apply({applyItem: this.state.applyItem, applyName: this.state.applyName, applyPhone: this.state.applyPhone});
                this.setState({
                    applyItem: "免费设计",
                    applyName: "",
                    applyPhone: "",
                })
            }else{
                message.warn('手机号码格式错误');
            }
        }else{
            message.warn('请输入您的信息,方便我们联系您')
        }
    }

    createHeadApplyItem(arrData) {
        var list = [];
        arrData.map(obj => {
            var itemClass = obj.key == this.state.applyItem ? "index-head-applyItem active" : "index-head-applyItem";
            list.push(<div onClick={this.changeApplyItem.bind(this, obj)} key={obj.key} className={itemClass}>{obj.key}</div>)
        });
        return list;
    }

    changeApplyItem(obj) {
        this.setState({
            applyItem: obj.key,
            applyMsg: obj.msg,
        })
    }

    setApplyInput(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        var itemArr = [
            {key: "免费设计", msg: "10秒登记，免费获取专业设计方案"} ,
            {key: "免费报价", msg: "获取更靠谱方案，拒绝超预算"} ,
            {key: "免费质检", msg: "专业质检免费上门，按照行业标准严格验收"} ,
            {key: "公益验房", msg: "同一小区同批验房须达到10户，可安排免费验房"}
        ];
        return (
            <div className="index-head-apply">
                <div className="index-head-applyBox clearfix">
                    {this.createHeadApplyItem(itemArr)}
                </div>
                <div className="index-head-applyBody">
                    <p className="index-head-applyMsg">{this.state.applyMsg}</p>
                    <div className="index-head-applyForm">
                        <input type="text" name="applyName" onChange={this.setApplyInput.bind(this)} value={this.state.applyName} placeholder="您的称呼" />
                        <input type="text" name="applyPhone" onChange={this.setApplyInput.bind(this)} value={this.state.applyPhone} placeholder="您的电话" />
                        <input onClick={this.apply.bind(this)} type="submit" value="立即申请" />
                    </div>
                    <div className="index-head-applyBottom">
                        <ul>
                            <li>风投C轮投资2亿美金，装修就上国风</li>
                            <li>更专业的装修服务平台，900万业主的共同选择</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

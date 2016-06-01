import React, {Component} from 'react';
export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state={
            filename: "",
            imgUrl: this.props.img,
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
                    {(this.state.imgUrl == undefined || this.state.imgUrl == "")
                        ?
                        "上传图片"
                        : "修改图片"
                    }
                    </span>
                </a>
                {this.state.imgUrl != "" ?
                    <img style={{height: '74px', width: '88px'}} src={this.state.imgUrl} />
                    :""
                }
            </div>
        )
    }
}

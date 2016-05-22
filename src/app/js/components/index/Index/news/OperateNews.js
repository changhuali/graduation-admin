import React, {Component} from 'react';
export default class OperateNews extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    componentDidMount() {
        var id = this.props.location.query.id;
        this.props.userBoundAc.getNewsDetail();
    }
    render() {
        return (
            <div className="apply-wrap">
                <div className="apply">
                    <div>title</div>
                    <div>type</div>
                    <div>desc</div>
                    <div>viewNum</div>
                    <div>img</div>
                    <div>content</div>
                </div>
            </div>
        )
    }
}

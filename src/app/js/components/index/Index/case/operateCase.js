import React, {Component} from 'react';
import Edit from './Edit';

export default class OperateCase extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const query = this.props.location.query;
        return (
            <div className="apply">
                {query.type == 'add' ?
                    <Edit {...this.props} type="add" />
                : query.type == 'edit' ?
                    <Edit {...this.props} type="edit" />
                : query.type == 'view' ?
                    <Edit {...this.props} type="view" />
                :""}
            </div>
        )
    }
}

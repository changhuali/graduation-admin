import React, {Component} from 'react';
import Item from './Item';

export default class OperateRender extends Component{
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
                    <Item {...this.props} type="add" />
                : query.type == 'edit' ?
                    <Item {...this.props} type="edit" />
                : query.type == 'view' ?
                    <Item {...this.props} type="view" />
                :""}
            </div>
        )
    }
}

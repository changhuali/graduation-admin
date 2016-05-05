import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CommonTable extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    createItem() {
        var thead = [];
        var tbody = [];
        this.props.data.config.map((obj, idx) => {
            thead.push(
                <th key={'row'+idx} style={{width: obj.width*10+'%'}}>{obj.dictKey}</th>
            );
        });
        this.props.data.item.map((valueObj, i) => {
            var tr = [];
            this.props.data.config.map((keyObj, j) => {
                tr.push(
                    <td key={'td'+j}>{keyObj.handle ? keyObj.handle(keyObj.key == 'operate' ? valueObj : valueObj[keyObj.key]) : valueObj[keyObj.key]}</td>
                )
            })
            tbody.push(<tr key={'tr'+i}>{tr}</tr>);
        })
        return (
            <div className="ant-table">
            <table>
                <thead>
                    <tr>
                        {thead}
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
            </div>
        )
    }

    render(){
        return(
            <div className="common-table">
                {this.createItem()}
            </div>
        )
    }
}

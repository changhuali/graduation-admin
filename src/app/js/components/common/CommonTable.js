import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';

export default class CommonTable extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    createMenuList(valueObj) {
        const list = [];
        this.props.operate.map((obj, idx) => {
            var disabled = valueObj[obj.disabledKey] == obj.disabledValue ? true : false;
            console.log(disabled,obj.disabledValue, idx);
            list.push(
                <Menu.Item key={idx} disabled={disabled}>
                    <a onClick={obj.handle.bind(this, valueObj._id)}>
                      <i className="fa"></i>
                      &nbsp;&nbsp;
                      {obj.action}
                    </a>
                </Menu.Item>
            )
        })
        return list;
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
            const actionsMenu = (
              <Menu>
                {this.createMenuList(valueObj)}
              </Menu>
            );
            var tr = [];
            this.props.data.config.map((keyObj, j) => {
                if(keyObj.key == 'operate') {
                    tr.push(
                        <td key={'td'+j}>
                            <Dropdown overlay={actionsMenu}>
                              <a className="ant-dropdown-link" href="#">
                                操作 <Icon type="down" />
                              </a>
                            </Dropdown>
                        </td>
                    )
                }else{
                    tr.push(
                        <td key={'td'+j}>{keyObj.handle ? keyObj.handle(valueObj[keyObj.key]) : valueObj[keyObj.key]}</td>
                    )
                }
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

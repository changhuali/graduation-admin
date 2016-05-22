import React, { Component } from 'react';
import { routerShape } from 'react-router';
import { Menu, Dropdown, Icon, Pagination } from 'antd';

export default class CommonTable extends Component{
    constructor(props) {
        super(props);
        this.state={
            current: 1,
            pageSize: 10,
        }
    }

    getCurrData() {
        return this.props.data.item.slice((this.state.current-1)*this.state.pageSize, this.state.current*this.state.pageSize);
    }

    createMenuList(valueObj) {
        const list = [];
        if (this.props.operate) {
            this.props.operate.map((obj, idx) => {
                var disabled = (valueObj[obj.disabledKey] == obj.disabledValue && obj.disabledValue) ? true : false;
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
        }
        return list;
    }

    changePage(value) {
        this.setState({
            current: value,
        })
    }

    createItem() {
        var thead = [];
        var tbody = [];
        var itemData = this.getCurrData();
        this.props.data.config.map((obj, idx) => {
            thead.push(
                <th key={'row'+idx} style={{width: obj.width*10+'%'}}>{obj.dictKey}</th>
            );
        });
        itemData.map((valueObj, i) => {
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
        var data = this.getCurrData();
        return(
            <div>
                <div className="common-table">
                    {this.createItem()}
                </div>
                <div style={{marginTop: '20px'}}>
                    <Pagination
                        onChange={this.changePage.bind(this)}
                        defaultCurrent={1}
                        current={this.state.current}
                        pageSize={this.state.pageSize}
                        total={this.props.data.item['length']} />
                </div>
            </div>
        )
    }
}
CommonTable.contextTypes = {
    router: routerShape.isRequired,
}

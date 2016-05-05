import React, { Component } from 'react';
import { routerShape } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as userAc from '../action/userAc';

import Header from './common/Header';
import Footer from './common/Footer';

import 'antd/lib/index.css';

import '../../css/reset.css';
import '../../css/header.css';
import '../../css/main.css';
import '../../css/footer.css';
import '../../css/user.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            hideNav: false,
            routeChangeToLR: false,
        }
    }

    hideNav(tag) {
        this.setState({
            hideNav: tag,
        })
    }

    componentWillMount() {
        if(this.props.location.pathname != '/login') {
            this.props.userBoundAc.checkInfo();
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    render(){
        return(
            <div>
                {this.props.location.pathname == '/login' ?
                "":
                <div>
                    <Header {...this.props} />
                </div>}
                <div>
                    {React.cloneElement(this.props.children, Object.assign({}, this.props, {hideNav: this.hideNav.bind(this)}))}
                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userBoundAc: bindActionCreators(userAc, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

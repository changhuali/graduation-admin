import React from 'react';
import { Route, IndexRoute, Redirect, NotFoundRoute } from 'react-router';
import App   from '../components/App';
import Login from '../components/user/Login';
import Index from '../components/index/Index';
import Apply from '../components/index/Index/Apply';
import Case from '../components/index/Index/Case';
import Render from '../components/index/Index/Render';
import News from '../components/index/Index/News';
import User from '../components/index/Index/User';
import Contact from '../components/index/Index/Contact';

var routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Index} />
        <Route path='login' component={Login} />
        <Route path='apply' component={Apply} />
        <Route path='case' component={Case} />
        <Route path='render' component={Render} />
        <Route path='news' component={News} />
        <Route path='user' component={User} />
        <Route path='contact' component={Contact} />
        <Redirect from='/*' to='/' />
    </Route>
)

export default routes;

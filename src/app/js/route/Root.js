import React from 'react';
import { Route, IndexRoute, Redirect, NotFoundRoute } from 'react-router';
import App         from '../components/App';
import Setting     from '../components/user/User/Setting';
import User        from '../components/user/User';
import Index       from '../components/index/Index';

var routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Index} />
        <Route path='user' component={Setting} />
        <Route path='login' component={User} />
        <Redirect from='/*' to='/' />
    </Route>
)

export default routes;

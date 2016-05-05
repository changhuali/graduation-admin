import React from 'react';
import { Route, IndexRoute, Redirect, NotFoundRoute } from 'react-router';
import App         from '../components/App';
import Login        from '../components/user/Login';
import Index       from '../components/index/Index';

var routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Index} />
        <Route path='login' component={Login} />
        <Route path='apply' component={Index} />
        <Route path='case' component={Index} />
        <Route path='rendering' component={Index} />
        <Route path='news' component={Index} />
        <Route path='promotion' component={Index} />
        <Route path='contact' component={Index} />
        <Redirect from='/*' to='/' />
    </Route>
)

export default routes;

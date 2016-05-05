import React from 'react';
import { render } from 'react-dom';
import { Router , browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './route/Root';
import configStore from './store/configStore';
const store = configStore();

render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('main')
)

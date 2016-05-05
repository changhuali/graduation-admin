import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const finalCreateStore = compose(
    applyMiddleware(thunk)
)(createStore)

export default function configStore(initialState){
    return finalCreateStore(rootReducer, initialState);
}

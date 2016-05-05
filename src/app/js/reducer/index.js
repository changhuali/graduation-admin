import { combineReducers } from 'redux';
import userRe from './userRe';

const rootReducer = combineReducers({
    user: userRe,
})

export default rootReducer;

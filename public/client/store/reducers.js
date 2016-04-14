import { combineReducers } from 'redux';
import user from './users/reducers';
import repos from './repos/reducers';

const reducers = {
    user,
    repos
}

export default combineReducers(reducers);
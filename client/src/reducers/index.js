import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

const initialState = {};

export default combineReducers({
    item: itemReducer
});
import { combineReducers } from 'redux';
import { v4 as uuid } from'uuid';

const initialState = {
  items: [
    { id: uuid(), name: "Eggs" },
    { id: uuid(), name: "bread" },
    { id: uuid(), name: "milk" },
    { id: uuid(), name: "carrot" },
  ],
};

export default combineReducers({
    
});
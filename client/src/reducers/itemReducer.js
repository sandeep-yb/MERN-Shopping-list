import { GET_ITEMS,DELETE_ITEM } from '../actions/types';
import { v4 as uuid } from "uuid";

const initialState = {
  items: [
    { id: uuid(), name: "Eggs" },
    { id: uuid(), name: "bread" },
    { id: uuid(), name: "milk" },
    { id: uuid(), name: "carrot" },
  ],
};

const itemReducer = (state = initialState, action) =>  {
    switch (action.type) {
        case  GET_ITEMS :
            return {
                ...state
            };

        case DELETE_ITEM : 
            return {
                ...state,
                items : state.items.filter(item => item.id !== action.payload)
            }
        
        default :
            return {
                ...state
            }
    } 
};

export default itemReducer;

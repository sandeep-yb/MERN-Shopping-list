import { ADD_ITEM, DELETE_ITEM, GET_ITEMS } from "./types";

export const getItems = () => {
  return {
    type: GET_ITEMS,
  };
};

export const deleteItem = (id) => (dispatch) => {
  dispatch({
    type: DELETE_ITEM,
    payload: id,
  });
};

export const addItem = (newItem) => dispatch => {
    dispatch({
        type: ADD_ITEM,
        payload: newItem
    })
};

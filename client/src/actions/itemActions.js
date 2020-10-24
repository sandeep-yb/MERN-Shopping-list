import { ADD_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from './authActions';

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());

  axios.get("http://localhost:5000/api/items").then((res) => {
    // console.log("getItems", res);
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  });
};

export const deleteItem = (_id) => (dispatch,getState) => {

  axios.delete(`http://localhost:5000/api/items/${_id}`, tokenConfig(getState)).then((res) => {
    dispatch({
      type: DELETE_ITEM,
      payload: _id,
    });
  });
};

export const addItem = (newItem) => (dispatch) => {
  axios.post("http://localhost:5000/api/items", newItem).then((res) =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    })
  );
};

export const setItemsLoading = () => (dispatch) => {
  dispatch({
    type: ITEMS_LOADING,
  });
};

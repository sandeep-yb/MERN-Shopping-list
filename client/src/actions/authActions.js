import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_ERRORS,
} from "./types";
import { getErrors } from "./errorActions";

export const loadUser = (token) => (dispatch) => {
  console.log("load user", token);
  dispatch(setUserLoading());

  // const token = getState().auth().token;

  axios
    .get("http://localhost:5000/api/auth/user", tokenConfig(token))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      //console.log('err', err.response);
      dispatch({
        type: AUTH_ERROR,
      });
      dispatch(getErrors(err.response.data.msg, err.response.status));
    });
};

export const tokenConfig = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) config.headers["x-auth-token"] = token;

  return config;
};

export const setUserLoading = () => {
  //   console.log("setUserloading");
  return {
    type: USER_LOADING,
  };
};

export const register = (user) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);

  axios
    .post("http://localhost:5000/api/users", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: REGISTER_FAILURE,
      });

      dispatch(
        getErrors(
          err.response.data.msg,
          err.response.status,
          "REGISTER_FAILURE"
        )
      );
    });
};

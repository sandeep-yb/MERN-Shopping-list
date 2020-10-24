import {
  AUTH_ERROR,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      console.log(
        "after login -> token from localstorage" + localStorage.getItem("token")
      );
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };

    case AUTH_ERROR:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
    case REGISTER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;

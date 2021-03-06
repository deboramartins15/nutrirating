import { LOGIN } from "../actions/actionTypes";

const initialState = {
    profissional: {}
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        profissional: action.payload
      };
    default:
      return state;
  }
};

export default LoginReducer;
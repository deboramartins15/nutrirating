import { LOGIN } from "../actions/actionTypes";

const initialState = {
    profissional: {}
};

const LoginReducer = (state = initialState, action) => {
  console.log('entrou no reducer')
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
import { SIGNIN } from "../actions/actionTypes";

const initialState = {
    profissional: {}
};

const SignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        profissional: action.payload
      };
    default:
      return state;
  }
};

export default SignInReducer;
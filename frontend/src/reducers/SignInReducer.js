import { SIGNIN } from "../actions/actionTypes";

const initialState = {
    profissional: {}
};

const SignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        profissional: action.profissional
      };
    default:
      return state;
  }
};

export default SignInReducer;
import { LOGIN, SIGNIN } from './actionTypes';

//ACTION CREATOR
export const Login = value => ({    
    type: LOGIN,
    payload: value
});

export const SignIn = value => ({    
    type: SIGNIN,
    payload: value
});
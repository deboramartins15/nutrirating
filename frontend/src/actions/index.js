import {LOGIN} from './actionTypes';

//ACTION CREATOR
export const Login = value => ({    
    type: LOGIN,
    payload: value
});
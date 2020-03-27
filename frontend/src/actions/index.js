import { LOGIN } from './actionTypes';

//ACTION CREATOR
export const login = value => ({       
    type: LOGIN,
    payload: value
});

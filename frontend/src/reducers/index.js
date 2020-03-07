import { combineReducers } from 'redux';

import LoginReducer from './loginReducer';
import SignInReducer from './SignInReducer';

export const Reducers = combineReducers({
    Login: LoginReducer,
    SignIn: SignInReducer,
});
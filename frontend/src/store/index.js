import { createStore } from 'redux'

import { LOGIN } from '../actions/actionTypes';

const initialState = {
    profissional: {}
};

const LoginReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return{
                ...state,profissional: action.profissional
            }
        default:
            return state
    }
}

const store = createStore(LoginReducer)

export default store;


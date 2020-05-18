import { USER_LOGGEDIN, ERROR,NOT_AUTHENTICATED } from "../actions/types";

const initialState = {
    isLoggedIn: false,
    loading: true,
    errors: [],
    user: null
}

export const LoginReducer = (state=initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case ERROR:
            return { ...state, errors: [...state.errors, payload], loading: false }
        case NOT_AUTHENTICATED:
            return { ...state, errors: [...state.errors, payload], loading: false }
        case USER_LOGGEDIN:
            if(payload.token) localStorage.setItem('token', payload.token)
            console.log('payload', payload)
            return { ...state, loading: false, user: payload.user, isLoggedIn: true }
        default:
            return state
    }
}
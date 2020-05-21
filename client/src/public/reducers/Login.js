import { USER_LOGGEDIN, ERROR,NOT_AUTHENTICATED, USER_LOGOUT, CLEAR_ERROR } from "../actions/types";

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
            return { ...state, loading: false }
        case USER_LOGGEDIN:
            if(payload.token) localStorage.setItem('token', payload.token)
            return { ...state, loading: false, user: payload.user, isLoggedIn: true }
        case CLEAR_ERROR: {
            return { ...state, loading: false, errors: state.errors.slice(1)}
        }
        case USER_LOGOUT: 
            localStorage.removeItem('token')
            return { ...state, loading: false, user: null, isLoggedIn: payload }
        default:
            return state
    }
}
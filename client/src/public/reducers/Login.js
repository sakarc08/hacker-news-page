import { USER_LOGGEDIN,NOT_AUTHENTICATED, USER_LOGOUT } from "../actions/types";

const initialState = {
    isLoggedIn: false,
    loading: true,
    user: null
}

export const LoginReducer = (state=initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case NOT_AUTHENTICATED:
            return { ...state, loading: false }
        case USER_LOGGEDIN:
            if(payload.token) localStorage.setItem('token', payload.token)
            return { ...state, loading: false, user: payload.user, isLoggedIn: true }
        case USER_LOGOUT: 
            localStorage.removeItem('token')
            return { ...state, loading: false, user: null, isLoggedIn: payload }
        default:
            return state
    }
}
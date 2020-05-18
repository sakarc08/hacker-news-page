import { USER_ADDED, ERROR } from "../actions/types";

const initialState = {
    user: null,
    errors: [],
    loading: true
}

export const SignUpReducer = (state=initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case ERROR:
            return { ...state, errors: [...state.errors, payload], loading: false }
        case USER_ADDED:
            return { ...state, loading: false, user: payload }
        default:
            return state
    }
}
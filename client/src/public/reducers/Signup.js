import { USER_ADDED } from "../actions/types";

const initialState = {
    user: null,
    loading: true
}

export const SignUpReducer = (state=initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case USER_ADDED:
            console.log('received ', payload)
            return { ...state, loading: false, user: payload.user }
        default:
            return state
    }
}
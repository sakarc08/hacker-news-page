import { ERROR,NOT_AUTHENTICATED, FETCHED_POSTS, UPVOTE_POST, HIDE_POST, CLEAR_ERROR } from "../actions/types";

const initialState = {
    isLoggedIn: false,
    loading: true,
    errors: [],
    posts: []
}

export const PostsReducer = (state=initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case ERROR:
            return { ...state, errors: [...state.errors, payload], loading: false }
        case NOT_AUTHENTICATED:
            return { ...state, loading: false }
        case CLEAR_ERROR: {
            return { ...state, loading: false, errors: state.errors.slice(1)}
        }
        case FETCHED_POSTS:
            return { ...state, loading: false, posts: payload.posts, isLoggedIn: true }
        case UPVOTE_POST: 
            return { ...state, loading: false, posts: state.posts.map(post => post._id === payload.id ? { ...post, points: payload.points} : post),
                    isLoggedIn: true }
        case HIDE_POST: 
            return { ...state, loading: false, posts: state.posts.filter(post => post._id !== payload.id),
                    isLoggedIn: true }
        default:
            return state
    }
}
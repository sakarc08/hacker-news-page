import { NOT_AUTHENTICATED, FETCHED_POSTS, UPVOTE_POST, HIDE_POST } from "../actions/types";

const initialState = {
    isLoggedIn: false,
    loading: true,
    posts: []
}

export const PostsReducer = (state=initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case NOT_AUTHENTICATED:
            return { ...state, loading: false }
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
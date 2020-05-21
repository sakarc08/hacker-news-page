import axios from 'axios';
import { FETCHED_POSTS, UPVOTE_POST, HIDE_POST } from './types';

const fetchPosts = (currentPage) => async dispatch => {
    try {
        const result = await axios.get(`/api/posts/${currentPage}`);
        console.log('posts ', result.data)
        dispatch({
            type: FETCHED_POSTS,
            payload: result.data
        })
    } catch (error) {
        console.log(error.message)   
    }
}

const upvotePost = (id) => async dispatch => {
    try {
        const result = await axios.put(`/api/posts/upvote/${id}`);
        dispatch({
            type: UPVOTE_POST,
            payload: { id: result.data.post._id, points: result.data.post.points }
        })
    } catch (error) {
        
    }
}

const hidePost = (id) => async dispatch => {
    try {
        const result = await axios.put(`/api/posts/hide/${id}`);
        dispatch({
            type: HIDE_POST,
            payload: { id: result.data.post._id }
        })
    } catch (error) {
        console.log(error.message)
    }
}


export { fetchPosts, upvotePost, hidePost }
import { combineReducers } from 'redux';
import { SignUpReducer } from './Signup'
import { LoginReducer } from './Login'
import { PostsReducer } from './Posts'

export default combineReducers({
    postsDetails: PostsReducer,
    userDetails: LoginReducer,
    signUpDetails: SignUpReducer
});
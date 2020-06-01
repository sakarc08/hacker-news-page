import { combineReducers } from 'redux';
import { SignUpReducer } from './Signup'
import { LoginReducer } from './Login'
import { PostsReducer } from './Posts'
import { AlertReducer } from './Alert'

export default combineReducers({
    postsDetails: PostsReducer,
    userDetails: LoginReducer,
    signUpDetails: SignUpReducer,
    alertDetails: AlertReducer
});
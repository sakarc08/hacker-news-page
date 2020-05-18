import { combineReducers } from 'redux';
import { SignUpReducer } from './Signup'
import { LoginReducer } from './Login'

export default combineReducers({
    // user: SignUpReducer,
    userDetails: LoginReducer
});
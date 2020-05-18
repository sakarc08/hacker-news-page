import { combineReducers } from 'redux';
import { SignUpReducer } from './Signup'

export default combineReducers({
    user: SignUpReducer
});
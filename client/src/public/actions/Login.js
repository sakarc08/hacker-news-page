import { ERROR, USER_LOGGEDIN, NOT_AUTHENTICATED } from './types'
import axios from 'axios';

export const loginUser = ({ email, password }) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': "application/json"
            }
        }

        const body = JSON.stringify({ email, password });

        const result = await axios.post('/api/user/login', body, config);
        dispatch({
            type: USER_LOGGEDIN,
            payload: result.data
        });

    } catch (error) {
        console.log(error.mesage);
        dispatch({
            type: ERROR,
            payload: { message: "Error occured while addding User"}
        })
    }
}

export const loadUser = () => async dispatch => {
    try {
        const result = await axios.get('/api/user');
        dispatch({ type: USER_LOGGEDIN, payload: result.data });
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: { message: "Some Error occured"}
        })
    }
}

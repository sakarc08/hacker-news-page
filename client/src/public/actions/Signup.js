import { ERROR, USER_ADDED } from './types'
import axios from 'axios';

export const signupUser = ({ username, email, password }) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': "application/json"
            }
        }

        const body = JSON.stringify({ username, email, password });

        const data = await axios.post('/api/user/signup', body, config);
        dispatch({
            type: USER_ADDED,
            payload: data
        });

    } catch (error) {
        console.log(error.mesage);
        dispatch({
            type: ERROR,
            payload: { message: "Error occured while addding User"}
        })
    }
}

export default { signupUser }
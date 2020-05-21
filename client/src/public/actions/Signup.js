import { ERROR, USER_ADDED, CLEAR_ERROR } from './types'
import axios from 'axios';

export const signupUser = ({ username, email, password }) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': "application/json"
            }
        }

        const body = JSON.stringify({ username, email, password });

        const response = await axios.post('/api/user/signup', body, config);
        dispatch({
            type: USER_ADDED,
            payload: response.data
        });

    } catch (error) {
        console.log(error.mesage);
        error.response.data.errors.forEach(item => {
            dispatch({
                type: ERROR,
                payload: { message: item.msg }
            })

            setTimeout(() => {
                dispatch({
                    type: CLEAR_ERROR
                })
            }, 5000)
        })
    }
}

export default { signupUser }
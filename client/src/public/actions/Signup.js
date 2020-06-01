import { USER_ADDED,SET_ALERT, CLEAR_ALERT } from './types'
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

        dispatch({
            type: SET_ALERT,
            payload: { message: 'Account created successfully. Please Login to continue', type: 'success'}
        })

        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT
            })
        }, 5000)

    } catch (error) {
        console.log(error.mesage);
        error.response.data.errors.forEach(item => {
            dispatch({
                type: SET_ALERT,
                payload: { message: item.msg, type: 'danger'}
            })

            setTimeout(() => {
                dispatch({
                    type: CLEAR_ALERT
                })
            }, 5000)
        })
    }
}

export default { signupUser }
import { USER_LOGGEDIN, NOT_AUTHENTICATED, USER_LOGOUT, SET_ALERT, CLEAR_ALERT } from './types'
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

export const loadUser = () => async dispatch => {
    try {
        const result = await axios.get('/api/user');
        dispatch({ type: USER_LOGGEDIN, payload: result.data });
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: NOT_AUTHENTICATED
        })
    }
}

export const logoutUser = () => async dispatch => {
    try {
        dispatch({
            type: USER_LOGOUT,
            payload: false
        });

        dispatch({
            type: SET_ALERT,
            payload: { message: 'You logged out successfully ', type: 'success'}
        })

        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT
            })
        }, 5000)

    } catch (error) {
        console.log(error.mesage);
        dispatch({
            type: SET_ALERT,
            payload: { message: error.response.data.message, type: 'danger'}
        })
        
    }
}
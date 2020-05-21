import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import store from '../store'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { signupUser } from '../actions/Signup'
import Alert from './Alert'
import {Redirect } from 'react-router-dom'
import { SET_ALERT } from '../actions/types'

const Form = styled.form`
        width: 50%;
        margin: 10% auto;
    `

const FormField = styled(TextField)`
    margin-top: 30px;
`

const Signup = ({ signupUser, errors, user, alerts }) => {
    const [formData, setformData] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    });

    const { username, password, email, confirmPassword } = formData;
    const onChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value});
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(password === confirmPassword) signupUser({ username, password, email })
        else store.dispatch({ type: SET_ALERT, payload: { message: 'Password and Confirm Password do not match', type: 'danger'} })
    }

    if(user) return <Redirect to='/storyboard'></Redirect>
    return (
        <Fragment>
            { alerts.length > 0 ? <Alert alerts={alerts} /> : null }
            <Form onSubmit={onSubmit}>
                <FormField
                    name="username"
                    variant="outlined"
                    required
                    value={username}
                    fullWidth
                    onChange={onChange}
                    id="username"
                    label="Username"
                />
                <FormField
                    value={email}
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={onChange}
                    id="email"
                    label="Email"
                    
                />
              <FormField
                    value={password}
                    name="password"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={onChange}
                    id="password"
                    label="Password"
                    type="password"
              />

              <FormField
                    value={confirmPassword}
                    name="confirmPassword"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={onChange}
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    
              />

                 <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </Button>
            </Form>
        </Fragment>
    )
}

Signup.propTypes = {
    signupUser: PropTypes.func.isRequired,
    
}

const mapStateToProps = (state) => {
    const { errors, user } = state.signUpDetails
    return {
        errors,
        user,
        alerts: state.alertDetails.alerts
    }
}

export default connect(mapStateToProps, { signupUser })(Signup)

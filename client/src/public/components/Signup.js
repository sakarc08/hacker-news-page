import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import store from '../store'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { signupUser } from '../actions/Signup'
import Alert from './Alert'
import {Redirect } from 'react-router-dom'
import { SET_ALERT } from '../actions/types'
import { Form, FormField, Title, LoginUser } from './Form'

const SignUp = styled(LoginUser)`
    &&& {
        width: 100%;
        float: unset;
        margin-top: 20px;
    }
`

const Signup = ({ signupUser, isLoggedIn, user, alerts }) => {
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

    if(isLoggedIn) return <Redirect to='/storyboard'></Redirect>
    if(user) return <Redirect to='/login'></Redirect>
    return (
        <Fragment>
            <Title>Create an account</Title>
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

                 <SignUp
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </SignUp>
            </Form>
        </Fragment>
    )
}

Signup.propTypes = {
    signupUser: PropTypes.func.isRequired,
    
}

const mapStateToProps = (state) => {
    const { user, isLoggedIn } = state.userDetails
    return {
        user,
        isLoggedIn,
        alerts: state.alertDetails.alerts,
        user: state.signUpDetails.user
    }
}

export default connect(mapStateToProps, { signupUser })(Signup)

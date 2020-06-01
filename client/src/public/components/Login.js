import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { loginUser } from '../actions/Login'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {CreateAccount, ActionsContainer, Form, FormField, LoginUser, Title } from './Form'
import Alert from './Alert'

export const Login = ({ isLoggedIn, loginUser, alerts }) => {

    const [formData, setformData] = useState({
        password: '',
        email: '',
    });

    const { password, email } = formData;
    const onChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        loginUser({ password, email })
    }

    { return isLoggedIn ? <Redirect to='/storyboard'></Redirect> : (<Fragment>
            <Title>Welcome to HackerNews</Title>
            { alerts.length > 0 ? <Alert alerts={alerts} /> : null }
            <Form onSubmit={onSubmit}>
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
            <ActionsContainer>
                <LoginUser
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Login
                </LoginUser>

                <CreateAccount to="/signup" > Create Account </CreateAccount>
            </ActionsContainer>
            </Form>
        </Fragment>)
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    const { user, isLoggedIn } = state.userDetails
    return {
        user,
        isLoggedIn,
        alerts: state.alertDetails.alerts
    }
}

export default connect(mapStateToProps, { loginUser })(Login)

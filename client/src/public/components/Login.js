import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { loginUser } from '../actions/Login'
import { connect } from 'react-redux';
import StoryBoardRoute from './StoryBoardRoute'
import { Link, Redirect, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Label from '@material-ui/core/InputLabel'
import styled from 'styled-components'
import Alert from './Alert'

const Form = styled.form`
        width: 50%;
        margin: 10% auto;
    `

const FormField = styled(TextField)`
    margin-top: 30px;
`

const Login = ({ user, isLoggedIn, loginUser, errors }) => {

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

            { errors.length > 0 ? <Alert errors={errors} /> : null }
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

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>

                Dont have account yet ?? <Link to="/signup" > Create </Link> one now
            </Form>
        </Fragment>)
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    const { user, isLoggedIn, errors } = state.userDetails
    return {
        user,
        isLoggedIn,
        errors
    }
}

export default connect(mapStateToProps, { loginUser })(withRouter(Login))

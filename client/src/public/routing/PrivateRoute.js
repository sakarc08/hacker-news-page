import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Login from '../components/Login'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ isLoggedIn, Component, ...rest }) => (
    // { return isLoggedIn ? <Component {} /> : <Login />}
    <Route 
        {...rest } 
        render={props => !isLoggedIn ? (
            <Redirect to="/login" />
        ) : (
            <Component { ...props } />
        ) 
    }></Route>
)

PrivateRoute.propTypes = {

}

const mapStateToProps = (state) => {
    const { isLoggedIn } = state.userDetails
    return {
        isLoggedIn
    }
}

export default connect(mapStateToProps)(PrivateRoute)

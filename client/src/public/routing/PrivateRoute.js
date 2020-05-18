import React from 'react'
import PropTypes from 'prop-types'
import Login from '../components/Login'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

const PrivateRoute = ({ isLoggedIn, to, component }) => {
    { return isLoggedIn ? <Route to={to} component={component} /> : <Login />}
}

PrivateRoute.propTypes = {

}
const mapStateToProps = (state) => {
    const { isLoggedIn } = state.userDetails
    return {
        isLoggedIn
    }
}

export default connect(mapStateToProps)(PrivateRoute)

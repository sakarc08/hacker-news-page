import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import StoryBoard from './StoryBoardRoute'

const Landing = ({ isLoggedIn}) => {

    { return isLoggedIn ? <Redirect to="/storyboard" /> :  <Redirect to="/login" /> }

}

Landing.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
    const { isLoggedIn } = state.userDetails
    return {
        isLoggedIn
    }
}

export default connect(mapStateToProps)(Landing)

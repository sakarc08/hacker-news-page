import React, { useEffect, Fragment } from "react";
import Story from './Story';
import PropTypes from 'prop-types'
import {fetchPosts} from '../actions/Posts'
import { logoutUser } from '../actions/Login'
import { connect } from 'react-redux'
import setToken from '../utils/setToken';
import Chart from './Chart'
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";


const StoryBoardRoute = ({ fetchPosts, posts, user, logoutUser }) => {

  useEffect(() => {
    if(typeof window !== 'undefined' && window.localStorage.token) setToken(window.localStorage.token);
    fetchPosts();
  }, [fetchPosts])

  posts = posts.filter(post => {
    const index = post.hide.findIndex(item => item.user == user._id)
    if(index < 0 ) return post;
  })

  const logout = () => {
    logoutUser()
  }

  {return !posts.length ? <div>Loading posts</div> :  (
    <Fragment>
      <div className='story-board-container'>
        <div className='story-board-header'>
          <Button onClick={(e) => logout()}>Logout</Button>
        </div>
          <div className='stories-container'>
            { posts.map((post, index) => <Story key={index} post={post} />) }
          </div>
          { posts.length > 0 ? (
            <div className='more-stories'>
              MORE
            </div>
          ) : null }   
      </div>
      
      <Chart posts={ posts } />
    </Fragment>
    
  )}
  
}

StoryBoardRoute.propTypes = {
  posts: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  console.log(' state ', state)
  return {
    posts: state.postsDetails.posts,
    user: state.userDetails.user
  }
}

export default connect(mapStateToProps, { fetchPosts, logoutUser })(withRouter(StoryBoardRoute))
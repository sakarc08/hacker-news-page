import React, { useEffect} from "react";
import Story from './Story';
import PropTypes from 'prop-types'
import {fetchPosts} from '../actions/Posts'
import { connect } from 'react-redux'
import setToken from '../utils/setToken';

const StoryBoardRoute = ({ fetchPosts, posts, user }) => {

  useEffect(() => {
    if(typeof window !== 'undefined' && window.localStorage.token) setToken(window.localStorage.token);
    fetchPosts();
  }, [fetchPosts])

  posts = posts.filter(post => {
    const index = post.hide.findIndex(item => item.user == user._id)
    if(index < 0 ) return post;
  })

  {return !posts.length ? <div>Loading posts</div> :  (
    <div className='story-board-container'>
      <div className='story-board-header'></div>
        <div className='stories-container'>
           { posts.map((post, index) => <Story key={index} post={post} />) }
         </div>
         { posts.length > 0 ? (
          <div className='more-stories'>
            MORE
          </div>
        ) : null }
        
      </div>
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

export default connect(mapStateToProps, { fetchPosts })(StoryBoardRoute)
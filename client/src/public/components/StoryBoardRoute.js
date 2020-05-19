import React, { useEffect} from "react";
import Story from './Story';
import PropTypes from 'prop-types'
import {fetchPosts} from '../actions/Posts'
import { connect } from 'react-redux'

const StoryBoardRoute = ({ fetchPosts, posts }) => {

  useEffect(() => {
      fetchPosts();
  }, [fetchPosts])

  console.log(posts.length)
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
    posts: state.postsDetails.posts
  }
}

export default connect(mapStateToProps, { fetchPosts })(StoryBoardRoute)
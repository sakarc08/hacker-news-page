import React, { useEffect, Fragment, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if(typeof window !== 'undefined' && window.localStorage.token) setToken(window.localStorage.token);
    fetchPosts(currentPage);
  }, [currentPage])

  posts = posts.filter(post => {
    const index = post.hide.findIndex(item => item.user == user._id)
    if(index < 0 ) return post;
  })

  const logout = () => {
    logoutUser()
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    // fetchPosts(currentPage);
  }

  const nextPage = () => {
    setCurrentPage(currentPage => currentPage + 1);
    // setMovies(prevMovies => ([...prevMovies, ...result]));
    // fetchPosts(currentPage);
  }

  {return !posts.length ? <div>Loading posts</div> :  (
    <Fragment>
      <div className='story-board-container'>
        <div className='story-board-header'>
          <div className='story-row'>
            <div className='sm'> 
                <div className='like-comment-container-header'>
                    <span className="comments">Comments</span>
                    <span className='likes-container'> Likes</span>
                    <span className="upvote-button" >Upvote</span>    
                </div>  
            </div>
            <div className='news-details'>News Details</div>
            <Button className="logout-btn" onClick={(e) => logout()}>Logout</Button>
          </div>
        </div>
          <div className='stories-container'>
            { posts.map((post, index) => <Story key={index} post={post} />) }
          </div>
          { posts.length > 0 ? (
            <div className='more-stories'>
                <Button disabled={currentPage <= 1} onClick={(e) => previousPage()}>PREVIOUS</Button> | 
                <Button onClick={(e) => nextPage()}>NEXT</Button>
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
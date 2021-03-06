import React, { useState } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { upvotePost, hidePost } from '../actions/Posts'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ModeComment from '@material-ui/icons/ModeComment'
import Favorite from '@material-ui/icons/Favorite'
import Button from '@material-ui/core/Button'

const Story = ({ upvotePost, post, hidePost }) => {
    const { _id: id, author, title, url, createdAt, points: likes, noOfComments: totalComments } = post;
    const domainName = url && new URL(url).hostname;
    const date = new Date(createdAt).toDateString();

    const upvote = (id) => {
        upvotePost(id);
    }

    const hide = (id) => {
        hidePost(id);
    }

    return (
        <div className='story-row'>
            {/* <div className='sm'>  */}
                <div className='like-comment-container'>
                    <span className="comments">
                        <ModeComment />
                        {totalComments}</span>
                    <span className='likes-container'>
                        <Favorite />
                        {likes}</span>
                        {/* <span className='likes'></span> */}
                    <Button className='upvote' onClick={(e) => upvote(id)}>
                      <span className='upvote-label'>Upvote</span><ThumbUpIcon />
                    </Button>     
                    {/* </span> */}
                {/* </div>   */}
            {/* </div> */}
            {/* <div className='sm-2'> */}
                <span className='story-title'>{title}</span>
                <span className='domain-name'>({domainName})</span>
                <span className='author-name'> by {author}</span>
                <span className='date'>{date}</span>

                <div className='hide-container'>
                    <span className='hide-story' onClick={(e) => hide(id)}>[ Hide ]</span>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { upvotePost, hidePost })(Story);
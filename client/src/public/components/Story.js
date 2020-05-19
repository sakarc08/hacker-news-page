import React, { useState } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { upvotePost } from '../actions/Posts'


const Story = ({ upvotePost, post }) => {
    const { _id: id, author, title, url, createdAt, points: likes, noOfComments: totalComments } = post;
    const domainName = url && new URL(url).hostname;
    const date = new Date(createdAt).toDateString();

    const upvote = (id) => {
        upvotePost(id);
    }

    return (
        <div className='story-row'>
            <div className='sm'> 
                <div className='like-comment-container'>
                    <span className="comments">{totalComments}</span>
                    <span className='likes-container'>
                        <span className='likes'>{likes}</span>
                        <span className="upvote-button" onClick={(e) => upvote(id)}>Upvote</span>    
                    </span>
                </div>  
            </div>
            <div className='sm-2'>
                <span className='story-title'>{title}</span>
                <span className='domain-name'>({domainName})</span>
                <span className='author-name'> by {author}</span>
                <span className='date'>{date}</span>

                <div className='hide-container'>
                    <span className='hide-story'>[ Hide ]</span>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { upvotePost })(Story);
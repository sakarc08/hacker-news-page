import mongoose from 'mongoose';
    
const PostSchema = new mongoose.Schema({
    objectID: {
        type: Number
    },
    author: {
        type: String
    },
    title: {
        type: String
    },
    url:{
        type: String
    },
    createdAt: {
        type: Date
    },
    points: {
        type: Number
    },
    noOfComments: {
        type: Number
    },
    hide: [
        { 
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
});

export default mongoose.model('Post', PostSchema)
import express from 'express';
import Post from '../models/Post'
import auth from '../middlewares/auth'

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({}).limit(20);
        if(!posts) return res.status(501).json({ message: "Failed to fetch documents"})
        res.json({ posts });
    } catch (error) {
        console.log(error.message)
    }
})

router.put('/upvote/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const originalPost = await Post.findById(id);
        const post = await Post.findOneAndUpdate({_id: id }, {$set: { points: originalPost.points+1}} , { new : true});
        res.json({ post });
    } catch (error) {
        console.log(error.message);
    }
})


export default router
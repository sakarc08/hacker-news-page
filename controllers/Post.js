import express from 'express';
import Post from '../models/Post'
import auth from '../middlewares/auth'

const router = express.Router();

router.get('/:currentPage', auth, async (req, res) => {
    try {
        const totalDocs = await Post.countDocuments();
        const currentPage = req.params.currentPage;

        if((currentPage*20 === totalDocs)) res.status(401).json({ message: 'No more documents to fetch'})
        
        const posts = await Post.find({}).skip(20*(currentPage-1)).limit(20);
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

router.put('/hide/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user;
        const originalPost = await Post.findById(id);
        originalPost.hide.push({ user: user.id })
        originalPost.save();
        res.json({post: originalPost});
    } catch (error) {
        console.log(error.message);
    }
})


export default router
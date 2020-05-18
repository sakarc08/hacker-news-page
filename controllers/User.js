import express from 'express';
import { check, validationResult} from 'express-validator'
import User from '../models/User'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from 'config'
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user })
})

router.post('/login', [
    check('password', 'Password not valid').notEmpty(),
    check('email', 'Not a valid Email').isEmail()
],  async (req, res) => {
    try {
        const errors  = validationResult(req);
        if(!errors.isEmpty()) return res.send({ errors: errors.array()})

        const { password, email } = req.body;
        const user = await User.findOne({ email }).select("-password");
        if(!user) return res.status(401).json({ message: 'No user with such credentials exists' })
        const payload = {
            user : {
                id: user._id
            }
        }

        const token = await jwt.sign(payload, config.get("secretKey"));
        res.json({ user, token });
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/signup', [
    check('username', 'Username not valid').notEmpty(),
    check('password', 'Password not valid').notEmpty().isAlphanumeric(),
    check('email', 'Not a valid Email').isEmail()
],  async (req, res) => {
    try {
        const errors  = validationResult(req);
        if(!errors.isEmpty()) return res.send({ errors: errors.array()})

        const { username, password, email } = req.body;
        const user = User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const savedUser = await user.save();
        const payload = {
            user : {
                id: savedUser._id
            }
        }

        const token = await jwt.sign(payload, config.get("secretKey"));
        res.json({ token })
    } catch (error) {
        console.log(error)
    }
    
})

export default router;
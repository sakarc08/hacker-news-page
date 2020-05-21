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
        if(!errors.isEmpty()) return res.status(401).send({ errors: errors.array()})

        const { password, email } = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({ errors: [{ msg: 'No user with such credentials exists'}] })
        
        const isSameUser = await bcrypt.compare(password, user.password);
        if(!isSameUser) return res.status(401).json({ errors: [ { msg: 'Password is incorrect'}] })
        const payload = {
            user : {
                id: user._id
            }
        }

        const token = await jwt.sign(payload, config.get("secretKey"));
        delete user.password;
        res.json({ user, token });
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/signup', [
    check('username', 'Username not valid').notEmpty().isLength({min: 6}),
    check('password', 'Password not valid').notEmpty().isAlphanumeric(),
    check('email', 'Not a valid Email').isEmail()
],  async (req, res) => {
    try {
        const errors  = validationResult(req);
        if(!errors.isEmpty()) return res.status(401).json({ errors: errors.array()})

        const { username, password, email } = req.body;
        const userExists = await User.find({ email });
        console.log('userExists', userExists)
        if(userExists.length) return res.status(401).json({ errors: [{ message: 'Email already registered'}]})

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
        res.json({ user:savedUser, token })
    } catch (error) {
        console.log(error)
    }
    
})

export default router;
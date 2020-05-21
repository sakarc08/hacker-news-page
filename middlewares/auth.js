import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User';

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if(!token) return res.status(500).json({ message : 'User not authenticated' });
        const decoded = jwt.verify(token, config.get("secretKey"));
        req.user = decoded.user;
        next()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Server error'})
    }
}

export default auth
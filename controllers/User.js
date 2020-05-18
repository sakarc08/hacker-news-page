import express from 'express';
import React from 'react'
import { renderToString } from 'react-dom/server';
import App from '../client/src/public/App'
import fs from 'fs'
import { check, validationResult} from 'express-validator'
import User from '../models/User'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from 'config'

const router = express.Router();

router.get('/', (req, res) => {
    try {
        const app = renderToString(<App />);
        fs.readFile('./client/src/public/index.html', { encoding: "utf8"}, (err, data) => {
            res.send(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`));
        });
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
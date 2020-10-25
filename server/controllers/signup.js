const bcrypt = require('bcryptjs');

const { Router } = require('express');
const User = require('../models/User');

const signupRouter = Router();

// REGISTER new user in DB.
signupRouter.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const verificationCode = Math.floor((Math.random() * 10000));

        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
            verificationCode,
        });

        if (user) {
            console.log(user);
            res.status(201).json('Registration completed successfully!');
        }
    } catch (err) {
        console.log(err);
        res.status(409).json('User with this email already exists.');
    }
});

module.exports = signupRouter;
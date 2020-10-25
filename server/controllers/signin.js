const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Router } = require('express');
const User = require('../models/User');

const signinRouter = Router();

signinRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            res.status(401).json({ message: 'User doesn\'t exist! Please signup yourself!' });
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            res.status(401).json({ message: 'Invalid credentials!' });
        } else if (!user.active) {
            return res.status(400).json({ message: 'Please verificate yourself from your registration mailbox!' });
        } else {
            const token = jwt.sign(user._id.toString(), process.env.ACCESS_SECRET_KEY);
            res.json({ token });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = signinRouter;
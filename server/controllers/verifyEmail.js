const jwt = require('jsonwebtoken');

const { Router } = require('express');
const User = require('../models/User');

const verifyEmailRouter = Router();

verifyEmailRouter.post('/verification', async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const user = await User.findOne({ email });

        if (verificationCode !== user.verificationCode) {
            return res.status(400).json({ message: "Incorrect code." });
        } else {
            await user.updateOne({ active: true });
            const token = jwt.sign(user._id.toString(), process.env.ACCESS_SECRET_KEY);
            res.json({ message: 'Verification successfully done!', token });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = verifyEmailRouter;
const { Router } = require('express');
const User = require('../models/User');

const authMdw = require('../middleware/auth');

const userRouter = Router();

// GET profile of specific user (by user ID).
userRouter.get('/users/', authMdw, async (req, res) => {
    try {
        const { userID } = req.user;
        const user = await User.findOne({ _id: userID });
        if (!user) {
            throw new Error('Old token discovered in local storage. Please logout at first!');
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
});

// UPDATE existed user's profile (by user ID).
userRouter.put('/users/update/', authMdw, async (req, res) => {
    try {
        const { userID } = req.user;
        const user = await User.findOneAndUpdate({ _id: userID }, req.body, { new: true })
        res.json(user);
    } catch {
        console.log(err);
        res.json({ message: err.message });
    }
});

// DELETE existed user's profile (by user ID).
userRouter.delete('/users/delete/', authMdw, async (req, res) => {
    try {
        const { userID } = req.user;
        const user = await User.deleteOne({ _id: userID })
        res.json(user);
    } catch {
        console.log(err);
        res.json({ message: err.message });
    }
});

// // GET list of all existed users (TEST ONLY).
// userRouter.get('/users/', async (req, res) => {
//     try {
//         const user = await User.find({});
//         res.json(user);
//     } catch (err) {
//         console.log(err);
//         res.json({ message: err.message });
//     }
// });

// // CREATE new user profiles (TEST ONLY).
// userRouter.post('/users/create', async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         res.json(user);
//     } catch (err) {
//         console.log(err);
//         res.json({ message: err.message });
//     }
// });

module.exports = userRouter;
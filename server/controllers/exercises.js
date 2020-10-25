const { Router } = require('express');
const Exercise = require('../models/Exercise');

const authMdw = require('../middleware/auth');

const exercisesRouter = Router();

// GET exercises list of specific user (by user ID).
exercisesRouter.get('/exercise/', authMdw, async (req, res) => {
    try {
        const { userID } = req.user;
        const exercises = await Exercise.find({ userID });
        res.json(exercises);
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

// GET specific exercise (by exercise ID), which belongs to specific user.
exercisesRouter.get('/exercise/:exerciseID', authMdw, async (req, res) => {
    try {
        const { exerciseID } = req.params;
        const exercise = await Exercise.find({ _id: exerciseID });
        res.json(exercise);
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

// CREATE new exercises in a list of specific user.
exercisesRouter.post('/exercise/create/', authMdw, async (req, res) => {
    try {
        const { userID } = req.user;
        const { name, measureType } = req.body;
        const exercise = await Exercise.create({ name, measureType, userID });
        res.status(201).json({ message: 'Exercise created successfully!', exercise });
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

// UPDATE already existed exercise (by exercise ID) in a list of specific user.
exercisesRouter.put('/exercise/update/:exerciseID', authMdw, async (req, res) => {
    try {
        const { exerciseID } = req.params;
        const exercise = await Exercise.findOneAndUpdate({ _id: exerciseID }, req.body, { new: true });
        res.json(exercise);
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

// DELETE specific exercise from list of specific user.
exercisesRouter.delete('/exercise/delete/:exerciseID', authMdw, async (req, res) => {
    try {
        const { exerciseID } = req.params;
        const exercise = await Exercise.deleteOne({ _id: exerciseID })
        res.json(exercise);
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

// // GET full list of exercises from all users (TEST ONLY).
// exercisesRouter.get('/exercise/', async (req, res) => {
//     try {
//         const exercises = await Exercise.find({});
//         res.json(exercises);
//     } catch (err) {
//         console.log(err);
//         res.json({ message: err.message });
//     }
// });

// // DELETE all exercises from list of specific user (TEST ONLY).
// exercisesRouter.delete('/exercise/delete/', async (req, res) => {
//     try {
//         const exercise = await Exercise.remove()
//         res.json(exercise);
//     } catch (err) {
//         console.log(err);
//         res.json({ message: err.message });
//     }
// });

module.exports = exercisesRouter;
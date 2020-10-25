const { Router } = require('express');
const Workout = require('../models/Workout');

const authMdw = require('../middleware/auth');

const workoutRouter = Router();

// GET workout list (by user ID).
workoutRouter.get('/workout/', authMdw, async (req, res) => {
    try {
        const { userID } = req.user;
        const workouts = await Workout.find({ userID });
        res.json(workouts);
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

// CREATE new workouts in user's list (by user ID).
workoutRouter.post('/workout/create/', authMdw, async (req, res) => {
    try {
        const { userID } = req.user;
        const { date, exercises } = req.body;
        const workout = await Workout.create({ date, exercises, userID });
        res.status(201).json({ message: 'Workout created successfully!', workout });
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

// UPDATE already existed workout in a list of specific user.
workoutRouter.put('/workout/update/:workoutID', async (req, res) => {
    try {
        const { workoutID } = req.params;
        const workout = await Workout.findOneAndUpdate({ _id: workoutID }, req.body, { new: true });
        res.json(workout);
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

// DELETE specific workout (by workout ID) from list of specific user.
workoutRouter.delete('/workout/delete/:workoutID', authMdw, async (req, res) => {
    try {
        const { workoutID } = req.params;
        const workout = await Workout.deleteOne({ _id: workoutID })
        res.json(workout);
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

// // GET all workouts lists. (TEST ONLY).
// workoutRouter.get('/workout/', async (req, res) => {
//     try {
//         const workouts = await Workout.find({});
//         res.json(workouts);
//     } catch (err) {
//         console.log(err);
//         res.json({ message: err.message });
//     }
// });

module.exports = workoutRouter;
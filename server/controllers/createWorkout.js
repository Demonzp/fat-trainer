const mongoose = require('mongoose');

const Workout = mongoose.model('Workout');

module.exports = (app) => {
    // ПОЛУЧЕНИЕ полного списка воркаутов (TEST ONLY).
    app.get('/workout/', async (req, res) => {
        try {
            const workouts = await Workout.find({});
            res.json(workouts);
        }
        catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });

    // ПОЛУЧЕНИЕ списка воркаутов конкретного пользователя.
    app.get('/workout/:userID', async (req, res) => {
        try {
            const { userID } = req.params;
            const workouts = await Workout.find({ userID });
            res.json(workouts);
        }
        catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });

    // ДОБАВЛЕНИЕ новых воркаутов в список конкретного пользователя.
    app.post('/workout/create/:userID', async (req, res) => {
        try {
            const { date, exercises } = req.body;
            const { userID } = req.params;
            const workout = await Workout.create({ date, exercises, userID });
            res.status(201).json({ message: 'Workout created successfully!', workout });
        }
        catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });
};

// THEN - CATCH
// module.exports = (app) => {
//     // ПОЛУЧЕНИЕ полного списка воркаутов (TEST ONLY).
//     app.get('/workout/', async (req, res) => {
//         await Workout.find({})
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });

//     // ПОЛУЧЕНИЕ списка воркаутов конкретного пользователя.
//     app.get('/workout/:userID', async (req, res) => {
//         const { userID } = req.params;
//         await Workout.find({ userID })
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });

//     // ДОБАВЛЕНИЕ новых воркаутов в список конкретного пользователя.
//     app.post('/workout/create/:userID', async (req, res) => {
//         const { date, exercises } = req.body;
//         const { userID } = req.params;
//         await Workout.create({ date, exercises, userID })
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });
// };
const mongoose = require('mongoose');

const Exercise = mongoose.model('Exercise');

module.exports = (app) => {
    // ПОЛУЧЕНИЕ полного списка упражнений всех пользователей (TEST ONLY).
    app.get('/exercise/', async (req, res) => {
        try {
            const exercises = await Exercise.find({});
            res.json(exercises);
        }
        catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });

    // ПОЛУЧЕНИЕ списка упражнений конкретного пользователя.
    app.get('/exercise/:userID', async (req, res) => {
        try {
            const { userID } = req.params;
            const exercises = await Exercise.find({ userID });
            res.json(exercises);
        }
        catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });

    // ПОЛУЧЕНИЕ конкретного упражнения конкретного пользователя.
    app.get('/exercise/:userID/:exerciseID', async (req, res) => {
        try {
            const { exerciseID } = req.params;
            const exercise = await Exercise.find({ _id: exerciseID });
            console.log(exerciseID);
            res.json(exercise);
        }
        catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });

    // ДОБАВЛЕНИЕ новых упражнений в список конкретного пользователя.
    app.post('/exercise/create/:userID', async (req, res) => {
        try {
            const { name, measureType } = req.body;
            const { userID } = req.params;
            const exercise = await Exercise.create({ name, measureType, userID });
            res.status(201).json({ message: 'Exercise created successfully!', exercise });
        }
        catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });
};

// // THEN - CATCH
// module.exports = (app) => {
//     // ПОЛУЧЕНИЕ полного списка упражнений всех пользователей (TEST ONLY).
//     app.get('/exercise/', async (req, res) => {
//         await Exercise.find({})
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });

//     // ПОЛУЧЕНИЕ списка упражнений конкретного пользователя.
//     app.get('/exercise/:userID', async (req, res) => {
//         const { userID } = req.params;
//         await Exercise.find({ userID })
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });

//     // ПОЛУЧЕНИЕ конкретного упражнения конкретного пользователя.
//     app.get('/exercise/:userID/:exerciseID', async (req, res) => {
//         const { exerciseID } = req.params;
//         await Exercise.find({ _id: exerciseID })
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });

//     // ДОБАВЛЕНИЕ новых упражнений в список конкретного пользователя.
//     app.post('/exercise/create/:userID', async (req, res) => {
//         const { name, measureType } = req.body
//         const { userID } = req.params
//         await Exercise.create({ name, measureType, userID })
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });    
// };
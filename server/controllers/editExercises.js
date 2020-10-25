const mongoose = require('mongoose');

const Exercise = mongoose.model('Exercise');

module.exports = (app) => {
    // ДОБАВЛЕНИЕ новых упражнений в список конкретного пользователя.
    app.put('/exercise/update/:exerciseID', async (req, res) => {
        try {
            const { exerciseID } = req.params;
            const exercise = await Exercise.findOneAndUpdate({ _id: exerciseID }, req.body, { new: true });
            await exercise.save();
            res.json(exercise);
        } catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });

    // УДАЛЕНИЕ конкретного упражнения из списка конкретного пользователя.
    app.delete('/exercise/delete/:exerciseID', async (req, res) => {
        try {
            const { exerciseID } = req.params;
            const exercise = await Exercise.deleteOne({ _id: exerciseID })
            res.json(exercise);
        } catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });

    // УДАЛЕНИЕ всех упражнений из списка конкретного пользователя (TEST ONLY).
    app.delete('/exercise/delete/', async (req, res) => {
        try {
            const exercise = await Exercise.remove()
            res.json(exercise);
        } catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });
};

// // THEN - CATCH
// module.exports = (app) => {
//     // ДОБАВЛЕНИЕ новых упражнений в список конкретного пользователя.
//     app.put('/exercise/update/:exerciseID', async (req, res) => {
//         const { exerciseID } = req.params;
//         await Exercise.findOneAndUpdate({ _id: exerciseID }, req.body, { new: true })
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });

//     // УДАЛЕНИЕ конкретного упражнения из списка конкретного пользователя.
//     app.delete('/exercise/delete/:exerciseID', async (req, res) => {
//         const { exerciseID } = req.params;
//         await Exercise.deleteOne({ _id: exerciseID })
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });

//     // УДАЛЕНИЕ всех упражнений из списка конкретного пользователя (TEST ONLY).
//     app.delete('/exercise/delete/', async (req, res) => {
//         // await Exercise.remove()
//         await Exercise.deleteMany()
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });
// };
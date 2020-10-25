const mongoose = require('mongoose');

const Workout = mongoose.model('Workout');

module.exports = (app) => {
    // ДОБАВЛЕНИЕ новых воркаутов в список конкретного пользователя.
    app.put('/workout/update/:workoutID', async (req, res) => {
        try {
            const { workoutID } = req.params;
            const workout = await Workout.findOneAndUpdate({ _id: workoutID }, req.body, { new: true });
            await workout.save();
            res.json(workout);
        } catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });

    // УДАЛЕНИЕ конкретного воркаута из списка конкретного пользователя.
    app.delete('/workout/delete/:workoutID', async (req, res) => {
        try {
            const { workoutID } = req.params;
            const workout = await Workout.deleteOne({ _id: workoutID })
            res.json(workout);
        } catch (err) {
            console.log(err);
            res.json({ message: err.message });
        }
    });
};

// // THEN - CATCH
// module.exports = (app) => {
//     // ДОБАВЛЕНИЕ новых воркаутов в список конкретного пользователя.
//     app.put('/workout/update/:workoutID', async (req, res) => {
//         await Workout.findOneAndUpdate({ _id: workoutID }, req.body, { new: true })
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });

//     // УДАЛЕНИЕ конкретного воркаута из списка конкретного пользователя.
//     app.delete('/workout/delete/:workoutID', async (req, res) => {
//         const { workoutID } = req.params;
//         await Workout.deleteOne({ _id: workoutID })
//             .then((result) => res.json(result))
//             .catch((err) => console.log(err));
//     });
// };
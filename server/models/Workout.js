const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },

        exercises: [{
            exerciseID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            measurment: {
                type: Number,
                required: true,
            },
            repeats: {
                type: Number,
                required: true,
            },
        }],
        
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },

    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

const WorkoutModel = mongoose.model('Workout', WorkoutSchema);

module.exports = WorkoutModel;
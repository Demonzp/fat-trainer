const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        measureType: {
            type: String,
            required: true,
        },

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

const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);

module.exports = ExerciseModel;
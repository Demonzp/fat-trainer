const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        verificationCode: {
            type: Number,
        },

        active: {
            type: Boolean,
            required: true,
            default: false,
        }
    },

    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
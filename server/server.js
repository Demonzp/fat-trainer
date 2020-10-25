require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Сross-origin resource sharing permission.
app.use(cors());

// Routes + controllers.
const exercisesController = require('./controllers/exercises');
const signinController = require('./controllers/signin');
const signupController = require('./controllers/signup');
const userController = require('./controllers/users');
const verifyEmailController = require('./controllers/verifyEmail');
const workoutController = require('./controllers/workout');

app.use(exercisesController);
app.use(signinController);
app.use(signupController);
app.use(userController);
app.use(verifyEmailController);
app.use(workoutController);

// Server starting and connecting to DB.
mongoose.connect(process.env.DB_CONNECT, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => app.listen(process.env.APP_PORT, () => {
        console.log(`Server listening on port ${process.env.APP_PORT}.`);
    }))
    .catch(() => console.error(`Connection failed: ${process.env.DB_CONNECT}`));
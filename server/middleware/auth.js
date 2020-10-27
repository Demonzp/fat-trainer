const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        res.status(401).json({ message: 'Token not provided!' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        await jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
            if (err) {
                throw err;
            }
            req.user = { userID: user };
        });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid Token!' });
            return;
        }
    }

    next();
};
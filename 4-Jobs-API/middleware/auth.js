const { UnauthenticatedError } = require('../errors')
const userData = require('../models/auth')
const jwt = require('jsonwebtoken');
const authorizationMiddleware = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = authHeaders.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = payload;
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }
}

module.exports = authorizationMiddleware;
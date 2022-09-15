const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken');
const authorizationMiddleware = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        throw new UnauthenticatedError('No JWT Token Provided')
    }

    const token = authHeaders.split(' ')[1];
    

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }
}

module.exports = authorizationMiddleware;
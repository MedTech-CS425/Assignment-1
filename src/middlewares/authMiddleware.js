const jwt = require('jsonwebtoken');
const secret = require('../consts/secret');
const Error = require('../models/responses/error');

class AuthMiddleware {
    authorize(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.status(401).json(new Error('Invalid token'));

        jwt.verify(token, secret, (err, user) => {
            if (err) return res.status(401).json(new Error('Invalid token'));

            req.userId = user.id;
            next();
        })
    }
}

module.exports = new AuthMiddleware()
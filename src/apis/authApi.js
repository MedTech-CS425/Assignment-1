const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/entities/userModel');
const Error = require('../models/responses/error');
const validateModel = require('../utils/validateModel');
const secret = require('../consts/secret');
const LoginResponse = require('../models/responses/loginResponse');
const LoginRequest = require('../models/requests/loginRequest');

class AuthApi {

    async login(req, res, next) {
        try {
            const loginRequest = new LoginRequest(req.body.email, req.body.password);
            const error = loginRequest.validate();
            if (error !== null) {
                return res.status(422).json(error);
            }
            let user = await UserModel.findOne({ email: req.body.email });
            if(!user) {
                return res.status(401).json(new Error('Invalid credentials'));
            }
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return res.status(401).json(new Error('Invalid credentials'));
            }
            user = user.toObject();
            const token = jwt.sign({ id: user._id }, secret);
            res.status(201).json(new LoginResponse(user, token));
        } catch (error) {
            next(error);
        }
    }

    async signUp(req, res, next) {
        try {
            const user = new UserModel(req.body);
            const validationError = validateModel(user);
            if (validationError)
                return res.status(422).json(validationError);
            user.password = await bcrypt.hash(req.body.password, 12);
            await user.save();
            res.status(201).json({});
        } catch (error) {
            next(error);
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await UserModel.findById(req.userId);
            if (!user) {
                return res.status(404).json(new Error('User not found'));
            }
            res.json({ email: user.email, password: user.password, userName: user.userName });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthApi();
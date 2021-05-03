const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/entities/userModel');
const Error = require('../models/responses/error');
const ValidationError = require('../models/responses/validationError');
const secret = require('../consts/secret');

class AuthApi {

    async login(req, res, next) {
        try {
            if (!req.body.email) {
                return res.status(422).json(new ValidationError("email", "Missing email is required"));
            }
            if (!req.body.password) {
                return res.status(422).json(new ValidationError("password", "Missing password is required"));
            }
            const user = (await UserModel.findOne({ email: req.body.email })).toObject();
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                res.status(401).json(new Error("Invalid credentials"));
            }
            const token = jwt.sign({ id: user._id }, secret);
            res.status(201).json({ user, token });
        } catch(error) {
            next(error)
        }  
    }

    async signUp(req, res, next) {
        try {
            const user = new UserModel(req.body);
            let error = user.validateSync();
            if(error) {
                const errorField = Object.keys(error.errors)[0];
                return res.status(422).json(new ValidationError(error.errors[errorField].path, error.errors[errorField].message));    
            }
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
                return res.status(404).json(new Error("User not found"));
            }
            res.json({ email: user.email, password: user.password, userName: user.userName });
        } catch(error) {
            next(error);
        } 
    }
}

module.exports = new AuthApi();
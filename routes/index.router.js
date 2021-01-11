const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');
const ctrlUser = require('../controller/user.controller');
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
module.exports = router;
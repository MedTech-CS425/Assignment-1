const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const ctrlUser = require('../controller/user.controller');
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
module.exports = router;
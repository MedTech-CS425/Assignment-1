const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/Auth');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/getUser', authCtrl.getUser);


module.exports = router;
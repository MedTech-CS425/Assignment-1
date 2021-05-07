const express = require('express');
const router = express.Router();

const itemCtrl = require('../controllers/Items');
const auth = require('../middleware/auth');

router.get('/items',auth, itemCtrl.getItems);
router.post('/items',auth, itemCtrl.addItems);
router.get('/items/{item_id}',auth, itemCtrl.updateItemsById);
router.delete('/items/{item_id}',auth, itemCtrl.deleteItemsById);


module.exports = router;
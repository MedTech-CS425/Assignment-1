const express = require('express');
const router = express.Router();

const listCtrl = require('../controllers/Lists');
const auth = require('../middleware/auth');

router.get('/lists', auth, listCtrl.getLists);
router.post('/lists', auth, listCtrl.addList);
router.put('/lists/{list_id}',auth, listCtrl.updateListById);
router.delete('/lists​/{list_id}',auth,listCtrl.deleteListById);
router.get('/lists/{list_id}/items',auth,listCtrl.getItemsInList);
router.post('/lists/{list_id}/items',auth,listCtrl.addItemInList);
router.put('/lists/{list_id}/items',auth,listCtrl.updateItemInList);
router.delete('/lists/{list_id}/items',auth,listCtrl.deleteItemInList);



module.exports = router;
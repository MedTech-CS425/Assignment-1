const express = require('express')
const router = express.Router();

const categoryCtrl = require('../controllers/Categories');
const auth = require('../middleware/auth');

router.get('/categories',auth, categoryCtrl.getCategories);
router.post('/categories',auth, categoryCtrl.addCategories);
router.get('/categories/{category_id}',auth, categoryCtrl.updateCategoriesById);
router.delete('/categories/{category_id}',auth,categoryCtrl.deleteCategoriesById);

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

const itemsController = require('../controllers/items');

router.get('/', checkAuth, itemsController.getAllitems);

router.post('/', checkAuth, upload.single('itemImage'), itemsController.createOneitem);

router.get('/:itemId', checkAuth, itemsController.getOneitem);

router.patch('/:itemId', checkAuth,  itemsController.updateOneitem);

router.delete('/:itemId', checkAuth, itemsController.deleteOneitem);

module.exports = router;
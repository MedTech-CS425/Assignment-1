const express = require("express");
const router = express.Router();
const jwtHelper = require("../config/jwtHelper");
const ctrlUser = require("../controller/user.controller");
const ctrlList = require("../controller/list.controller");
const ctrlItem = require("../controller/item.controller");
const ctrlCategory = require("../controller/category.controller");
const { handleError, ErrorHandler } = require('../helpers/error');

router.post("/signup", ctrlUser.signup)
router.post("/authenticate", ctrlUser.login);
router.get("/getUser", jwtHelper.verifyJwtToken, ctrlUser.getUser);
router.get("/error",(req, res) => {
    throw new ErrorHandler(500, 'Internal server error');
  }) 

router.post("/createList/:id", jwtHelper.verifyJwtToken, ctrlList.createList);
router.get("/getLists", jwtHelper.verifyJwtToken, ctrlList.getLists);
router.put("/updateList/:id", jwtHelper.verifyJwtToken, ctrlList.updateList);
router.delete("/deleteList/:id", jwtHelper.verifyJwtToken, ctrlList.deleteList);

router.post("/createItemList/:id/:list_id", jwtHelper.verifyJwtToken, ctrlList.createItemByList);
router.get("/getItemByList/:list_id", jwtHelper.verifyJwtToken, ctrlList.getItemsByList);
router.put("/updateItemByList/:id", jwtHelper.verifyJwtToken, ctrlList.updateItemByList);
router.delete("/deleteItemByList/:id/:list_id", jwtHelper.verifyJwtToken, ctrlList.deleteItemByList);

router.post("/createItem/:user_id/:category_id/:list_id", jwtHelper.verifyJwtToken, ctrlItem.createItem);
router.get("/getItem", jwtHelper.verifyJwtToken, ctrlItem.getItems);
router.put("/updateItem/:id", jwtHelper.verifyJwtToken, ctrlItem.updateItem);
router.delete("/deleteItem/:id", jwtHelper.verifyJwtToken, ctrlItem.deleteItem);


router.post("/createCategory/:id", jwtHelper.verifyJwtToken, ctrlCategory.createCategory);
router.get("/getCategory", jwtHelper.verifyJwtToken, ctrlCategory.getCategory);
router.put("/updateCategory/:id", jwtHelper.verifyJwtToken, ctrlCategory.updateCategory);
router.delete("/deleteCategory/:id", jwtHelper.verifyJwtToken, ctrlCategory.deleteCategory);
module.exports = router;

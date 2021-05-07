const Item = require('../models/Item');

exports.getItems= (req, res, next) => {
        Item.find().then(
            (items) => {
              res.status(200).json(items);
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
};
exports.addItems= (req, res, next) => {
    const item = new Item({
        name: req.body.name,
        category_id: req.body.category_id,
        user_id: req.body.user_id,
        note: req.body.note,
        image: req.body.image,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
      });
      item.save().then(
        () => {
          res.status(201).json({
            message: 'Item added successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
};
exports.updateItemsById= (req, res, next) => {
    const item = new Item({
        _id: req.body._id,
        name: req.body.name,
        category_id: req.body.category_id,
        user_id: req.body.user_id,
        note: req.body.note,
        image: req.body.image,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
      });
      Item.updateOne({_id: req.params.id}, item).then(
        () => {
          res.status(201).json({
            message: 'Item updated successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
};
exports.deleteItemsById= (req, res, next) => {
    Item.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted Item!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
};

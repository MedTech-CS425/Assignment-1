const List = require('../models/List');




exports.getLists = (req, res, next) => {
    List.find().then(
        (lists) => {
          res.status(200).json(lists);
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
};
exports.addList= (req, res, next) => {
    const list = new List({
        name: req.body.name,
        user_id: req.body.user_id,
        item_id: req.body.item_id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
      });
      list.save().then(
        () => {
          res.status(201).json({
            message: 'List added successfully!'
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
exports.updateListById= (req, res, next) => {
    const list = new List({
        _id: req.body._id,
        name: req.body.name,
        user_id: req.body.user_id,
        item_id: req.body.item_id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
      });
      List.updateOne({_id: req.params.id}, list).then(
        () => {
          res.status(201).json({
            message: 'List updated successfully!'
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
exports.deleteListById= (req, res, next) => {
    List.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted List!'
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
exports.getListById= (req, res, next) => {
    List.findOne({
        _id: req.params.id
      }).then(
        (list) => {
          res.status(200).json(list);
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
};
exports.getItemsInList= (req, res, next) => {
      List.findOne(
          {_id: req.params.id}, 
          {projection: {item_id: 1}}
          ).then(
          (list) => {
            res.status(200).json(list);
          }
        ).catch(
          (error) => {
            res.status(404).json({
              error: error
            });
          }
        );
};
exports.addItemInList= (req, res, next) => {
  List.findOneAndUpdate(
    {_id: req.params.id}, 
    list.item_id.push(req.params.item_id)
    ).then(
    (list) => {
      res.status(200).json(list);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
exports.updateItemInList= (req, res, next) => {
  List.findOneAndUpdate(
    {_id: req.params.id}, 
    {item_id:req.params.id}
    ).then(
    (list) => {
      res.status(200).json(list);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
exports.deleteItemInList= (req, res, next) => {
  List.findOneAndUpdate(
    {_id: req.params.id}, 
    list.item_id.pop(req.params.item_id)
    ).then(
    (list) => {
      res.status(200).json(list);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
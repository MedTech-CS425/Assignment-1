const Category= require('../models/Category');
exports.getCategories= (req, res, next) => {
    Category.find().then(
        (categories) => {
          res.status(200).json(categories);
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
};
exports.addCategories= (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        user_id: req.body.user_id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
      });
      category.save().then(
        () => {
          res.status(201).json({
            message: 'Category added successfully!'
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
exports.updateCategoriesById= (req, res, next) => {
    const category = new Category({
        _id: req.body._id,
        name: req.body.name,
        user_id: req.body.user_id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
      });
      Category.updateOne({_id: req.params.id}, category).then(
        () => {
          res.status(201).json({
            message: 'Category updated successfully!'
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


exports.deleteCategoriesById= (req, res, next) => {
        Category.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted Category!'
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

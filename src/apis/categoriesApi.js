const CategoryModel = require('../models/entities/categoryModel');
const validateModel = require('../utils/validateModel');
const mongoose = require('mongoose');

class CategoriesApi {
    async getCategories(req, res, next) {
        try {
            const categories = await CategoryModel.find({ user_id: req.userId });
            res.status(201).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async createCategory(req, res, next) {
        try {
            const category = new CategoryModel(req.body);
            category.user_id = mongoose.Types.ObjectId(req.userId);
            const validationError = validateModel(category);
            if (validationError)
                return res.status(422).json(validationError);
            await category.save();
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const category = await CategoryModel.findById(req.params.category_id);
            if (!category) {
                return res.status(404).json(new Error('Category not found'));
            }
            category.name = req.body.name;
            const validationError = validateModel(category);
            if (validationError)
                return res.status(422).json(validationError);
            await category.save();
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            await CategoryModel.findByIdAndDelete(req.params.category_id);
            res.json({});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoriesApi();
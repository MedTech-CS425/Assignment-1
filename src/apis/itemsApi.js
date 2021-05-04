const ItemModel = require('../models/entities/itemModel');
const validateModel = require('../utils/validateModel');
const mongoose = require('mongoose');

class ItemsApi {
    async getItems(req, res, next) {
        try {
            const items = await ItemModel.find({ user: req.userId });
            res.status(201).json(items);
        } catch (error) {
            next(error);
        }
    }

    async createItem(req, res, next) {
        try {
            const item = new ItemModel(req.body);
            item.user = mongoose.Types.ObjectId(req.userId);
            const error = item.validateSync();
            if (error) {
                const errorField = Object.keys(error.errors)[0];
                return res.status(422).json(new ValidationError(error.errors[errorField].path, error.errors[errorField].message));
            }
            await item.save();
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    }

    async updateItem(req, res, next) {
        try {
            const item = await ItemModel.findById(req.params.item_id);
            if (!item) {
                return res.status(404).json(new Error("item not found"));
            }
            item.name = req.body.name;
            
            await item.save();
            res.status(201).json(item);
        } catch (error) {
            next(error);
        }
    }

    async deleteItem(req, res, next) {
        try {
            await ItemModel.findByIdAndDelete(req.params.item_id);
            res.json({});
        } catch(error) {
            next(error);
        }
    }
}

module.exports = new ItemsApi();
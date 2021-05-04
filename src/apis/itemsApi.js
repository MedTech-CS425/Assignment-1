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
            item.category = mongoose.Types.ObjectId(req.body.category);
            const validationError = validateModel(item);
            if (validationError)
                return res.status(422).json(validationError);
            await item.save();
            res.status(201).json(item);
        } catch (error) {
            next(error);
        }
    }

    async updateItem(req, res, next) {
        try {
            const item = await ItemModel.findById(req.params.item_id);
            if (!item) {
                return res.status(404).json(new Error("Item not found"));
            }
            item.name = req.body.name;
            item.image = req.body.image;
            item.category = mongoose.Types.ObjectId(req.body.category);
            item.note = req.body.note;
            const validationError = validateModel(item);
            if (validationError)
                return res.status(422).json(validationError);
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
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ItemsApi();
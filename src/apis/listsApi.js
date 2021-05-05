const ListModel = require('../models/entities/listModel');
const Error = require('../models/responses/error');
const ValidationError = require('../models/responses/validationError');
const validateModel = require('../utils/validateModel');
const ItemModel = require('../models/entities/itemModel');
const mongoose = require('mongoose');

class ListsApi {
    async getLists(req, res, next) {
        try {
            const lists = await ListModel.find({ user_id: req.userId }).select('-items');
            res.status(201).json(lists);
        } catch (error) {
            next(error);
        }
    }

    async createList(req, res, next) {
        try {
            const list = new ListModel(req.body);
            list.user_id = mongoose.Types.ObjectId(req.userId);
            const validationError = validateModel(list);
            if (validationError)
                return res.status(422).json(validationError);
            await list.save();
            res.status(201).json(list);
        } catch (error) {
            next(error);
        }
    }

    async updateList(req, res, next) {
        try {
            const list = await ListModel.findById(req.params.list_id);
            if (!list) {
                return res.status(404).json(new Error('List not found'));
            }
            list.name = req.body.name;
            const validationError = validateModel(list);
            if (validationError)
                return res.status(422).json(validationError);
            await list.save();
            res.status(201).json(list);
        } catch (error) {
            next(error);
        }
    }

    async deleteList(req, res, next) {
        try {
            await ListModel.findByIdAndDelete(req.params.list_id);
            res.json({});
        } catch (error) {
            next(error);
        }
    }

    async getListItems(req, res, next) {
        try {
            const list = (await ListModel.findOne({ user_id: req.userId, _id: req.params.list_id }).populate('items'));
            if (!list) {
                return res.status(404).json(new Error('Invalid list id'));
            }
            res.status(201).json(list.items);
        } catch (error) {
            next(error);
        }
    }

    async addListItem(req, res, next) {
        try {
            const list = (await ListModel.findOne({ user_id: req.userId, _id: req.params.list_id }));
            if (!list) {
                return res.status(404).json(new Error('Invalid list id'));
            }
            if(!req.body.item_id) {
                return res.status(422).json(new ValidationError('item-id', 'Invalid item id'));
            }
            if (list.items.indexOf(req.body.item_id) !== -1) {
                return res.status(422).json(new ValidationError('item_id', 'Item already exists in list'));
            }
            list.items.push(mongoose.Types.ObjectId(req.body.item_id));
            const validationError = validateModel(list);
            if (validationError)
                return res.status(422).json(validationError);
            await list.save();
            res.status(201).json(list);
        } catch (error) {
            next(error);
        }
    }

    async updateListItem(req, res, next) {
        try {
            const list = (await ListModel.findOne({ user_id: req.userId, _id: req.params.list_id }));
            if (!list) {
                return res.status(404).json(new Error('Invalid list id'));
            }
            const index = list.items.indexOf(req.body.item_id);
            if (index === -1) {
                return res.status(422).json(new ValidationError('item_id', 'Item does not exist in list'));
            }
            const item = await ItemModel.findById(list.items[index]);
            item.name = req.body.name;
            item.image = req.body.image;
            item.category_id = req.body.category_id ? mongoose.Types.ObjectId(req.body.category_id) : null;
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

    async deleteListItem(req, res, next) {
        try {
            const list = (await ListModel.findOne({ user_id: req.userId, _id: req.params.list_id }));
            if (!list) {
                return res.status(404).json(new Error('Invalid list id'));
            }
            const index = list.items.indexOf(req.body.item_id);
            if (index === -1) {
                return res.status(422).json(new ValidationError('item_id', 'Item does not exist in list'));
            }
            list.items.splice(index, 1);
            await list.save();
            res.json({});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ListsApi();
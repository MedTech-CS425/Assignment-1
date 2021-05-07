const mongoose = require('mongoose');
const item = require('../models/item');

exports.getAllitems = (req, res, next) => {
	item
		.find()
		.exec()
		.then(items => {
			const response = {
				count: items.length,
				items: items.map(item => {
					return {
						_id: item._id,
						name: item.name,
						image: item.image,
						category_id: item.category_id
					}
				})
			};
			res.status(200).json(response);
		})
		.catch(error => {
			next(error);
		})
};

exports.createOneitem = (req, res, next) => {
	const item = createitem(req);

	item
		.save()
		.then(item => {
			res.status(200).json({
				message: 'item Created Successfully!',
				item: {
					_id: item._id,
					name: item.name,
					image: item.image,
					category_id: item.category_id
				}
			});
		})
		.catch(error => {
			next(error);
		});
};

exports.getOneitem = (req, res, next) => {
	const id = req.params.itemId;
	item
		.findById(id)
		.select('_id name image image')
		.exec()
		.then(item => {
			if (item) {
				res.status(200).json(item);
			}
			else {
				res.status(404).json({
					message: 'item Not Found!'
				});
			}
		})
		.catch(error => {
			next(error);
		});
};

exports.updateOneitem = (req, res, next) => {
	const itemId = req.params.itemId;


	item
		.update({ _id: itemId }, { $set: req.body })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Updated item Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		})
};

exports.deleteOneitem = (req, res, next) => {
	const itemId = req.params.itemId;
	item
		.remove({ _id: itemId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Deleted item Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		});
};

function createitem(req) {
	return new item({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		image: req.body.image,
		image: req.file.path
	});
}
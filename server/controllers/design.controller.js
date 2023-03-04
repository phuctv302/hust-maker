const Design = require('../models/design.model');
const Product = require('../models/product.model');
const AppError = require('../utils/app.error');
const catchAsync = require('../utils/catch.async');
const factory = require('./handler.factory');

exports.createDesign = catchAsync(async (req, res, next) => {
	const {productId} = req.body;

	const product = await Product.findById(productId);
	if (!product){
		return next(new AppError('No product found with that id', 404));
	}

	req.body.product = {
		name: product.name,
		price: product.price,
		image: product.image
	}

	const newDesign = await Design.create(req.body);

	res.status(201).json({
		status: 'success',
		data: newDesign
	});
});
exports.getDesign = factory.getOne(Design);
exports.getAllDesigns = factory.getAll(Design);
exports.updateDesign = factory.updateOne(Design);
exports.deleteDesign = factory.deleteOne(Design);
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide your name!'],
			trim: true,
		},
		price: {
			type: Number,
			required: true
		},

		createdAt: {
			type: Date,
			default: Date.now()
		},
		updatedAt: {
			type: Date,
			default: Date.now()
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

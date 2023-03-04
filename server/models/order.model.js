const mongoose = require('mongoose');
const validator = require('validator');

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'An order must have an User'],
		},
		design: {
			type: mongoose.Schema.ObjectId,
			ref: 'Design',
			required: true,
		},
		receiverName: String,
		receiverAddress: String,
		receiverPhone: {
			type: String,
			required: false,
			validate: {
				validator: function (val) {
					return validator.isMobilePhone(val, 'vi-VN');
				},
				message: '{VALUE} is not a valid Vietnam phone number',
			},
		},
		quantity: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
		},

		createdAt: {
			type: Date,
			default: Date.now(),
		},
		updatedAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

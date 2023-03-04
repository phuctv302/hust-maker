const mongoose = require('mongoose');

const designSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide your name!'],
			trim: true,
		},
		product: Object,
		elements: Array,
		imageExport: String,

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

const Design = mongoose.model('Design', designSchema);
module.exports = Design;

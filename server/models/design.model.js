const mongoose = require('mongoose');

const defaultPreviews = require('../data/default.previews');

const designSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide your name!'],
			trim: true,
		},
		product: Object,
		elements: {
			type: Array,
			default: []
		},
		previews: {
			type: Array,
			default: []
		},
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

designSchema.pre('save', function(next){
	if (!this.isNew){
		return next();
	}

	this.previews = defaultPreviews;
	next();
});

const Design = mongoose.model('Design', designSchema);
module.exports = Design;

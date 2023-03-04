const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide your name!'],
			trim: true,
		},
		phone: {
			type: String,
			required: false,
			validate: {
				validator: function (val) {
					return validator.isMobilePhone(val, 'vi-VN');
				},
				message: '{VALUE} is not a valid Vietnam phone number',
			},
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Please provide your email!'],
			validate: [validator.isEmail, 'Please provide a valid email!'],
			unique: true,
			lowercase: true,
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

/**
 * DOCUMENT MIDDLEWARE
 */
// ENCRYPT PASSWORD BEFORE SAVING TO DB
userSchema.pre('save', async function (next) {
	// Only run if password is modified
	if (!this.isModified('password')) return next();

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	// Delete passwordConfirm
	this.passwordConfirm = undefined;

	next();
});

// INSTANCE METHOD: Check password to login
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

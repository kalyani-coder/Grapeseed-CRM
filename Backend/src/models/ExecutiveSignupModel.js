const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const executiveSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Hash the password before saving it to the database
executiveSchema.pre('save', async function (next) {
    const executive = this;

    if (executive.isModified('password') || executive.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(executive.password, salt);
            executive.password = hashedPassword;
        } catch (error) {
            return next(error);
        }
    }

    next();
});

// Method to compare password for login
executiveSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const ExecutiveModel = mongoose.model('Executive-login', executiveSchema);

module.exports = ExecutiveModel;

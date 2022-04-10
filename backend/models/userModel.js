const mongoose = require('mongoose');

// create a new schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isOwner: {
        type: Boolean,
        default: false
    },
    companies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: false
    }],
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
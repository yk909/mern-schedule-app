const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
}, { timestamps: true });


module.exports = mongoose.model('Business', businessSchema);
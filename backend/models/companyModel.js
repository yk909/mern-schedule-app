const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    email: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    businesses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    }],
}, { timestamps: true });


module.exports = mongoose.model('Company', companySchema);
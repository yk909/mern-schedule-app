const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isManager: {
        type: Boolean,
        default: false
    },
    isEmployee: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });


module.exports = mongoose.model('Employee', employeeSchema);
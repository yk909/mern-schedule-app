const mognoose = require('mongoose');

const locationSchema = new mognoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    business: {
        type: mognoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    employees: [{
        type: mognoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    schedules: [{
        type: mognoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    }],
    shifts: [{
        type: mognoose.Schema.Types.ObjectId,
        ref: 'Shift'
    }],
}, { timestamps: true });


module.exports = mognoose.model('Location', locationSchema);
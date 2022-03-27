const mognoose = require('mongoose');

const businessSchema = new mognoose.Schema({
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
    company: {
        type: mognoose.Schema.Types.ObjectId,
        ref: 'Company',
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


module.exports = mognoose.model('Business', businessSchema);
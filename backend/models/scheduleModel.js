const mongoose = require('mongoose');

// create a new schema
const scheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
        required: true
    }],
}, { timestamps: true });


module.exports = mongoose.model('Schedule', scheduleSchema);
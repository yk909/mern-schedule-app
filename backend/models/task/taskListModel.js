const mongoose = require('mongoose');

const frequency = ['Daily', 'Weekly', 'Monthly', 'One-Time'];

const taskListSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    positions: [{
        type: String,
        required: false
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        enum: frequency,
        required: true
    },
    color: {
        type: String,
        required: false,
        default: '#2a74d3'
    },
    taskItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskItem',
        required: false
    }],
}, { timestamps: true });


module.exports = mongoose.model('TaskList', taskListSchema);
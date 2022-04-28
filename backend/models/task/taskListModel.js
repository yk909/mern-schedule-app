const mongoose = require('mongoose');

const frequency = ['daily', 'weekly', 'monthly', 'once'];

const taskListSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    business: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: false
    }],
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
        // generate a random id for each task item
        _id: mongoose.Schema.Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
    }],
}, { timestamps: true });


module.exports = mongoose.model('TaskList', taskListSchema);
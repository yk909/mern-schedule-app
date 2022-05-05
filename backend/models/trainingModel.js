const mongoose = require('mongoose');


const trainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    positions: [{
        type: String,
        required: false
    }],
    sections: [{
        title: {
            type: String,
            required: true
        },
        items: [{
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            images: [{
                type: String,
                required: false
            }],
            videos: [{
                type: String,
                required: false
            }],
            links: [{
                type: String,
                required: false
            }],
        }]
    }],
}, { timestamps: true });


module.exports = mongoose.model('Training', trainingSchema);
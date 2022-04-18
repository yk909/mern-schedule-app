const mongoose = require('mongoose');

const status = ['pending', 'accepted', 'rejected'];

const inviteSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: status,
    }
}, { timestamps: true });


module.exports = mongoose.model('Invite', inviteSchema);
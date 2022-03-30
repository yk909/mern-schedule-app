const mongoose = require('mongoose');
const Schedule = require('./scheduleModel');

const shiftSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scheduledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
}, { timestamps: true });


// remove shift from schedule when shift is deleted
shiftSchema.pre('remove', async function(next) {
    try {
        const schedule = await Schedule.findById(this.schedule);

        if (!schedule) {
            return next(new Error('No schedule found'));
        }
        
        schedule.shifts.pull(this._id);
        await schedule.save();
        next();
    } catch (err) {
        next(err);
    }
});


// add shift to schedule when shift is created
shiftSchema.post('save', async function(doc, next) {
    try {
        const schedule = await Schedule.findById(this.schedule);

        if (!schedule) {
            return next(new Error('No schedule found'));
        }

        schedule.shifts.push(this._id);
        await schedule.save();
        next();
    } catch (err) {
        next(err);
    }
});



module.exports = mongoose.model('Shift', shiftSchema);